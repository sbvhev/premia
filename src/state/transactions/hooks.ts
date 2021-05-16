import { useSelector, useDispatch } from 'react-redux';
import { ChainId } from '@uniswap/sdk';

import { useWeb3 } from 'state/application/hooks';
import { AppState, AppDispatch } from 'state';
import {
  setCurrentTx as _setCurrentTx,
  setTxStateMsg as _setTxStateMsg,
  setTxOption as _setTxOption,
} from './actions';
import { SetCurrentTransaction } from './reducer';

export const useCurrentTx = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTx = useSelector<
    AppState,
    AppState['transactions']['currentTx']
  >((state) => state.transactions.currentTx);
  const txLink = useTxLink(currentTx?.hash);

  const setCurrentTx = (currentTx: SetCurrentTransaction | undefined | null) =>
    dispatch(_setCurrentTx(currentTx));

  return { ...currentTx, txLink, setCurrentTx };
};

export const useTxStateMsg = () => {
  const dispatch = useDispatch<AppDispatch>();
  const txStateMsg = useSelector<
    AppState,
    AppState['transactions']['txStateMsg']
  >((state) => state.transactions.txStateMsg);

  const setTxStateMsg = (msg: string | undefined | null) =>
    dispatch(_setTxStateMsg(msg));

  return { txStateMsg, setTxStateMsg };
};

export const useTxOption = () => {
  const dispatch = useDispatch<AppDispatch>();
  const txOption = useSelector<AppState, AppState['transactions']['txOption']>(
    (state) => state.transactions.txOption,
  );

  const setTxOption = (option: any | undefined | null) =>
    dispatch(_setTxOption(option));

  return { txOption, setTxOption };
};

export const useTxLink = (txHash: string | undefined | null) => {
  const { chainId } = useWeb3();

  if (!txHash) {
    return null;
  }

  switch (chainId) {
    case 56:
      return `https://bscscan.com/tx/${txHash}`;

    case ChainId.RINKEBY:
      return `https://rinkeby.etherscan.io/tx/${txHash}`;

    case ChainId.MAINNET:
    default:
      return `https://etherscan.io/tx/${txHash}`;
  }
};
