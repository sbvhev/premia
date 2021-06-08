import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API as NotifyAPI } from 'bnc-notify';
import { get } from 'lodash';
import { ethers } from 'ethers';
import { Token } from 'web3/tokens';
import qs from 'qs';

import { AppState, AppDispatch } from 'state';
import {
  ApplicationNotification,
  setActiveNotification,
  ApplicationModal,
  setActiveModal,
  setWeb3Settings,
  setApprovalType as _setApprovalType,
  setWrapEthModalOpen as _setWrapEthModalOpen,
  setWrapEth as _setWrapEth,
} from './actions';

export function useBlockNumber(): number | undefined {
  return useSelector((state: AppState) => state.application.blockNumber);
}

export function useNotify(): NotifyAPI {
  return useSelector((state: AppState) => state.application.notify);
}

export function useDisconnect() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector<AppState, AppState['application']>(
    (state) => state.application,
  );

  const disconnect = useCallback(() => {
    dispatch(
      setWeb3Settings({
        wallet: undefined,
        web3: undefined,
        account: '',
        balance: '',
      }),
    );

    state.onboard?.walletReset();
    localStorage.removeItem('selectedWallet');
  }, [dispatch, state]);

  return disconnect;
}

export function useWeb3() {
  const state = useSelector<AppState, AppState['application']>(
    (state) => state.application,
  );

  return state;
}

export function usePrices() {
  const { prices } = useSelector<AppState, AppState['application']>(
    (state) => state.application,
  );

  return prices;
}

export async function getPrice(coinName: string) {
  const geckoUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinName}`;
  try {
    const result = await fetch(geckoUrl);
    const priceJson = await result.json();

    return Number(get(priceJson, '0.current_price'));
  } catch (err) {
    console.log(`Error fetching price for ${coinName}:`, err);

    return 0;
  }
}

export async function getSwapQuote(
  sellToken: Token | null | undefined,
  buyToken: Token | null | undefined,
  sellAmount: string,
  buyAmount: string,
  inputType: boolean | undefined,
  chainId: number,
  slippagePercentage: number,
) {
  let params: any = {
    buyToken: buyToken?.address ?? buyToken?.symbol,
    sellToken: sellToken?.address ?? sellToken?.symbol,
    slippagePercentage: slippagePercentage,
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
  const response = await fetch(
    `https://${
      chainId === 56 ? 'bsc.' : ''
    }api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
  );

  const final = await response.json();
  // console.log('final', final);
  return final;
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const activeModal = useSelector(
    (state: AppState) => state.application.activeModal,
  );
  return activeModal === modal;
}

export function useToggleModal(modal: ApplicationModal) {
  const open = useModalOpen(modal);
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (toState = !open) => dispatch(setActiveModal(toState ? modal : null)),
    [dispatch, modal, open],
  );
}

export function useOpenModal(modal: ApplicationModal) {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setActiveModal(modal)), [dispatch, modal]);
}

export function useCloseModals() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setActiveModal(null)), [dispatch]);
}

export function useNotificationOpen(
  notification: ApplicationNotification,
): boolean {
  const activeNotification = useSelector(
    (state: AppState) => state.application.activeNotification,
  );
  return activeNotification === notification;
}

export function useToggleNotification(notification: ApplicationNotification) {
  const open = useNotificationOpen(notification);
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (toState = !open) =>
      dispatch(setActiveNotification(toState ? notification : null)),
    [dispatch, notification, open],
  );
}

export function useCloseNotifications() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setActiveNotification(null)), [dispatch]);
}

export function useToggleTxLoadingModal() {
  return useToggleModal(ApplicationModal.TransactionLoading);
}

export function useToggleTxSuccessModal() {
  return useToggleModal(ApplicationModal.TransactionSuccess);
}

export function useToggleTxCancelledModal() {
  return useToggleModal(ApplicationModal.TransactionCancelled);
}

export function useToggleTxFailedModal() {
  return useToggleModal(ApplicationModal.TransactionFailed);
}

export function useToggleTxSentNotification() {
  return useToggleNotification(ApplicationNotification.TransactionSent);
}

export function useToggleTxSuccessNotification() {
  return useToggleNotification(ApplicationNotification.TransactionSuccess);
}

export function useToggleTxFailedNotification() {
  return useToggleNotification(ApplicationNotification.TransactionFailed);
}

export function useToggleTxStartNotification() {
  return useToggleNotification(ApplicationNotification.TransactionStarted);
}

export const useToggleWrapEthModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wrapEthModalOpen = useSelector<
    AppState,
    AppState['application']['wrapEthModalOpen']
  >((state) => state.application.wrapEthModalOpen);

  const setWrapEthModalOpen = (open: boolean) =>
    dispatch(_setWrapEthModalOpen(open));

  return { wrapEthModalOpen, setWrapEthModalOpen };
};

export const useWrapEth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wrapEth = useSelector<AppState, AppState['application']['wrapEth']>(
    (state) => state.application.wrapEth,
  );

  const setWrapEth = (wrap: boolean) => dispatch(_setWrapEth(wrap));

  return { wrapEth, setWrapEth };
};

export const useApprovalType = () => {
  const dispatch = useDispatch<AppDispatch>();
  const approvalType = useSelector<
    AppState,
    AppState['application']['approvalType']
  >((state) => state.application.approvalType);

  const setApprovalType = (approval: string | null) =>
    dispatch(_setApprovalType(approval));

  return { approvalType, setApprovalType };
};
