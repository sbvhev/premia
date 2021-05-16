const FORTMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
const PORTIS_KEY = process.env.REACT_APP_PORTIS_KEY;
const RPC_URL = process.env.REACT_APP_NETWORK_URL;
const BSC_RPC_URL = 'https://bsc-dataseed.binance.org/';
const APP_URL = 'https://premia.finance';
const CONTACT_EMAIL = 'dev@premia.finance';
const APP_NAME = 'Premia Finance';

const wallets = (chainId: number) => {
  if (chainId === 56) {
    return [
      { walletName: 'metamask', preferred: true },
      {
        walletName: 'walletConnect',
        preferred: true,
        rpc: {
          1: RPC_URL,
          4: RPC_URL,
          56: BSC_RPC_URL,
        },
      },
    ];
  }

  return [
    { walletName: 'coinbase', preferred: true },
    {
      walletName: 'trust',
      preferred: true,
      rpcUrl: RPC_URL,
    },
    { walletName: 'metamask', preferred: true },
    { walletName: 'authereum' },
    {
      walletName: 'trezor',
      appUrl: APP_URL,
      email: CONTACT_EMAIL,
      rpcUrl: RPC_URL,
    },
    {
      walletName: 'ledger',
      rpcUrl: RPC_URL,
    },
    {
      walletName: 'lattice',
      rpcUrl: RPC_URL,
      appName: APP_NAME,
    },
    {
      walletName: 'fortmatic',
      preferred: true,
      apiKey: FORTMATIC_KEY,
    },
    {
      walletName: 'walletConnect',
      preferred: true,
      rpc: {
        1: RPC_URL,
        4: RPC_URL,
        56: BSC_RPC_URL,
      },
    },
    {
      walletName: 'portis',
      apiKey: PORTIS_KEY,
      preferred: true,
      label: 'Portis',
    },
    { walletName: 'opera' },
    { walletName: 'operaTouch' },
    { walletName: 'torus' },
    { walletName: 'status' },
    {
      walletName: 'walletLink',
      rpcUrl: RPC_URL,
      appName: APP_NAME,
    },
    { walletName: 'imToken', rpcUrl: RPC_URL },
    { walletName: 'meetone' },
    { walletName: 'mykey', rpcUrl: RPC_URL },
    {
      walletName: 'huobiwallet',
      rpcUrl: RPC_URL,
    },
    { walletName: 'hyperpay' },
    { walletName: 'wallet.io', rpcUrl: RPC_URL },
    { walletName: 'atoken' },
  ];
};

export default wallets;
