import { useCallback } from 'react';
import { ContractTransaction } from 'ethers';

import {
  useWeb3,
  useCloseModals,
  useToggleTxLoadingModal,
  useToggleTxSuccessModal,
  useToggleTxCancelledModal,
  useToggleTxFailedModal,
  useToggleTxFailedNotification,
  useToggleTxStartNotification,
  useToggleTxSuccessNotification,
  useCloseNotifications,
} from 'state/application/hooks';
import {
  useCurrentTx,
  useTxHistory,
  useTxStateMsg,
  useTxOption,
} from 'state/transactions/hooks';

export interface TransactProps {
  closeOnSuccess?: boolean;
  option?: any | null;
  description?: string;
}

export function useTransact() {
  const { notify, chainId } = useWeb3();
  const { setCurrentTx } = useCurrentTx();
  const { setTxHistory } = useTxHistory();
  const { setTxStateMsg } = useTxStateMsg();
  const { setTxOption } = useTxOption();
  const closeModals = useCloseModals();
  const closeNotifications = useCloseNotifications();
  const toggleTxLoadingModal = useToggleTxLoadingModal();
  const toggleTxSuccessModal = useToggleTxSuccessModal();
  const toggleTxCancelledModal = useToggleTxCancelledModal();
  const toggleTxFailedModal = useToggleTxFailedModal();
  const toggleTxFailedNotification = useToggleTxFailedNotification();
  const toggleTxStartNotification = useToggleTxStartNotification();
  const toggleTxSuccessNotification = useToggleTxSuccessNotification();

  const transact = useCallback(
    async (
      contractFnPromise: Promise<ContractTransaction | undefined> | undefined,
      {
        closeOnSuccess = false,
        option = null,
        description = '',
      }: TransactProps = {
        closeOnSuccess: false,
        option: null,
        description: '',
      },
    ) => {
      setCurrentTx(null);
      toggleTxLoadingModal(true);
      setTxStateMsg(description);
      setTxOption(option);

      try {
        const tx = await contractFnPromise;

        if (tx) {
          setCurrentTx({ hash: tx.hash });

          console.log(chainId);

          // For BSC, as it doesnt support notify
          if (chainId === 56) {
            try {
              toggleTxSuccessNotification(false);
              toggleTxStartNotification(true);

              await tx.wait();

              toggleTxSuccessNotification(true);
              toggleTxSuccessModal(true);
              setTimeout(closeNotifications, 2000);

              if (closeOnSuccess) {
                setTimeout(closeModals, 2000);
              }
            } catch (e) {
              toggleTxFailedNotification(true);
              toggleTxFailedModal(true);
              setTimeout(closeNotifications, 2000);
            }
          } else {
            const { emitter } = notify.hash(tx.hash);

            emitter.on('txPool', (transaction) => {
              toggleTxSuccessNotification(false);
              toggleTxStartNotification(true);
              setTxHistory({
                hash: tx.hash,
                timestamp: tx.timestamp,
                complete: true,
              });
            });

            emitter.on('txConfirmed', (transaction) => {
              toggleTxStartNotification(false);
              toggleTxSuccessNotification(true);
              toggleTxSuccessModal(true);
              setTxHistory({
                hash: tx.hash,
                timestamp: tx.timestamp,
                complete: true,
              });

              setTimeout(closeNotifications, 2000);

              if (closeOnSuccess) {
                setTimeout(closeModals, 2000);
              }
            });

            emitter.on('txFailed', () => {
              toggleTxFailedNotification(true);
              toggleTxFailedModal(true);
              setTxHistory({
                hash: tx.hash,
                timestamp: tx.timestamp,
                complete: false,
              });

              setTimeout(closeNotifications, 2000);
            });
            emitter.on('txCancel', (err) => {
              setTxHistory({
                hash: tx.hash,
                timestamp: tx.timestamp,
                complete: false,
              });
              console.log('Error in transaction: ', err);
              toggleTxCancelledModal(true);
            });
          }
        } else {
          closeModals();
        }

        return tx;
      } catch (err) {
        console.log('Error in transaction: ', err);
        toggleTxCancelledModal(true);
      }
    },
    [
      closeModals,
      closeNotifications,
      toggleTxLoadingModal,
      toggleTxSuccessModal,
      toggleTxCancelledModal,
      toggleTxFailedModal,
      toggleTxFailedNotification,
      toggleTxStartNotification,
      toggleTxSuccessNotification,
      setCurrentTx,
      setTxHistory,
      setTxStateMsg,
      setTxOption,
      notify,
      chainId,
    ],
  );

  return transact;
}

export default useTransact;
