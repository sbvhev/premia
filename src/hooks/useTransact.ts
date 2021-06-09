import { useCallback } from 'react';
import { ContractTransaction } from 'ethers';

import {
  useWeb3,
  useCloseModals,
  useToggleTxLoadingModal,
  useToggleTxSuccessModal,
  useToggleTxCancelledModal,
  useToggleTxFailedModal,
} from 'state/application/hooks';
import {
  useCurrentTx,
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
  const { setTxStateMsg } = useTxStateMsg();
  const { setTxOption } = useTxOption();
  const closeModals = useCloseModals();
  const toggleTxLoadingModal = useToggleTxLoadingModal();
  const toggleTxSuccessModal = useToggleTxSuccessModal();
  const toggleTxCancelledModal = useToggleTxCancelledModal();
  const toggleTxFailedModal = useToggleTxFailedModal();

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

          // For BSC, as it doesnt support notify
          if (chainId === 56) {
            try {
              await tx.wait();

              toggleTxSuccessModal(true);

              if (closeOnSuccess) {
                setTimeout(closeModals, 2000);
              }
            } catch (e) {
              toggleTxFailedModal(true);
            }
          } else {
            const { emitter } = notify.hash(tx.hash);

            emitter.on('txConfirmed', (transaction) => {
              toggleTxSuccessModal(true);

              if (closeOnSuccess) {
                setTimeout(closeModals, 2000);
              }
            });

            emitter.on('txFailed', () => {
              toggleTxFailedModal(true);
            });

            emitter.on('txCancel', (err) => {
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
      toggleTxLoadingModal,
      toggleTxSuccessModal,
      toggleTxCancelledModal,
      toggleTxFailedModal,
      setCurrentTx,
      setTxStateMsg,
      setTxOption,
      notify,
      chainId,
    ],
  );

  return transact;
}

export default useTransact;
