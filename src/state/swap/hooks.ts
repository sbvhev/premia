import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from 'state';
import { Token, isToken } from 'web3/tokens';
import { CurrencyWithLogoUri } from 'hooks/useGasToken';
import { ethers } from 'ethers';
import qs from 'qs';

import {
  SetSwapSettings,
  setSwapSettings as _setSwapSettings,
  setToggleExchange as _setToggleExchange,
  SetToggleExchange,
} from './actions';

export const useSwapSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector<AppState, AppState['swap']>((state) => state.swap);

  const setSwapSettings = (swapSettings: SetSwapSettings) =>
    dispatch(_setSwapSettings(swapSettings));

  return { ...state.swapSettings, setSwapSettings };
};

export const useToggleExchange = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector<AppState, AppState['swap']>((state) => state.swap);

  const setToggleExchange = (toggle: SetToggleExchange) => {
    dispatch(_setToggleExchange(toggle));
  };

  return { ...state, setToggleExchange };
};

export async function getSwapQuote(
  sellToken: Token | CurrencyWithLogoUri | undefined,
  buyToken: Token | CurrencyWithLogoUri | undefined,
  sellAmount: string,
  buyAmount: string,
  gasPrice: number | undefined,
  inputType: boolean | undefined,
  chainId: number,
  slippagePercentage: number,
  excludedSources?: string[] | null,
) {
  let params: any = {
    buyToken: isToken(buyToken) ? buyToken.address : buyToken?.symbol,
    sellToken: isToken(sellToken) ? sellToken.address : sellToken?.symbol,
    gasPrice,
    slippagePercentage,
  };

  if (inputType) {
    params = {
      ...params,
      buyAmount: ethers.utils
        .parseUnits(buyAmount, buyToken?.decimals)
        .toString(),
    };
  } else {
    params = {
      ...params,
      sellAmount: ethers.utils
        .parseUnits(sellAmount, sellToken?.decimals)
        .toString(),
    };
  }

  if (excludedSources) {
    params.excludedSources = excludedSources;
  }

  const response = await fetch(
    `https://${
      chainId === 56 ? 'bsc.' : ''
    }api.0x.org/swap/v1/quote?${qs.stringify(params, {
      arrayFormat: 'comma',
      encode: false,
    })}`,
  );
  const json = await response.json();
  console.log('resp', json);

  return json;
}
