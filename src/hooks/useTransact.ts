import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { Transaction } from 'state/transactions/reducer';
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
  const { notify } = useWeb3();
  const dispatch = useDispatch<AppDispatch>();
  const { setCurrentTx } = useCurrentTx();
  const { setTxHistory } = useTxHistory();
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

          const { emitter } = notify.hash(tx.hash);

          emitter.on('txConfirmed', (transaction) => {
            toggleTxSuccessModal(true);
            dispatch(
              setTxHistory([
                {
                  hash: tx.hash,
                  timestamp: tx.timestamp,
                  complete: true,
                } as Transaction,
              ]),
            );

            if (closeOnSuccess) {
              setTimeout(closeModals, 2000);
            }
          });

          emitter.on('txFailed', () => {
            setTxHistory([
              {
                hash: tx.hash,
                timestamp: tx.timestamp,
                complete: false,
              } as Transaction,
            ]);
            toggleTxFailedModal(true);
          });

          emitter.on('txCancel', (err) => {
            console.log('Error in transaction: ', err);
            setTxHistory([
              {
                hash: tx.hash,
                timestamp: tx.timestamp,
                complete: false,
              } as Transaction,
            ]);
            toggleTxCancelledModal(true);
          });
        } else {
          closeModals();
        }

        (async () => {
          await tx?.wait(1);

          toggleTxSuccessModal(false);
        })();

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
      setTxHistory,
      setTxStateMsg,
      setTxOption,
      notify,
    ],
  );

  return transact;
}

export default useTransact;
