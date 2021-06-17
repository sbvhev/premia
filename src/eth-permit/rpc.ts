const randomId = () => Math.floor(Math.random() * 10000000000);

export const send = (provider: any, method: string, params?: any[]) =>
  new Promise<any>((resolve, reject) => {
    const payload = {
      id: randomId(),
      method,
      params,
    };
    const callback = (err: any, result: any) => {
      if (err) {
        reject(err);
      } else if (result.error) {
        console.error(result.error);
        reject(result.error);
      } else {
        resolve(result.result);
      }
    };

    let _provider = provider.provider || provider;

    if (_provider.sendAsync) {
      _provider.sendAsync(payload, callback);
    } else {
      _provider.send(payload, callback);
    }
  });

export interface RSV {
  r: string;
  s: string;
  v: number;
}

export const signData = async (
  provider: any,
  fromAddress: string,
  typeData: any,
): Promise<RSV> => {
  const typeDataString =
    typeof typeData === 'string' ? typeData : JSON.stringify(typeData);
  const result = await send(provider, 'eth_signTypedData_v4', [
    fromAddress,
    typeDataString,
  ]).catch((error: any) => {
    if (error.message === 'Method eth_signTypedData_v4 not supported.') {
      return send(provider, 'eth_signTypedData', [fromAddress, typeData]);
    } else {
      throw error;
    }
  });

  return {
    r: result.slice(0, 66),
    s: '0x' + result.slice(66, 130),
    v: parseInt(result.slice(130, 132), 16),
  };
};

let chainIdOverride: null | number = null;
export const setChainIdOverride = (id: number) => {
  chainIdOverride = id;
};
export const getChainId = async (provider: any): Promise<any> => {
  // Parsing this hex string to avoid error:
  // "Provided chainId \"0x4\" must match the active chainId \"4\""
  // actual: "0x4"
  // expected: 4
  const chainId = chainIdOverride || (await send(provider, 'eth_chainId'));
  if (typeof chainId === 'string' && chainId.length > 1) return Number(chainId);
  return chainId;
};

export const call = (provider: any, to: string, data: string) =>
  send(provider, 'eth_call', [
    {
      to,
      data,
    },
    'latest',
  ]);
