import { createAction } from '@reduxjs/toolkit';
import { ChainId } from '@uniswap/sdk';
import { API, Wallet } from 'bnc-onboard/dist/src/interfaces';
import { ethers } from 'ethers';

import { PremiaContracts } from 'web3/contracts';

export enum ApplicationModal {
  TransactionLoading = 'TransactionLoading',
  TransactionSuccess = 'TransactionSuccess',
  TransactionFailed = 'TransactionFailed',
  TransactionCancelled = 'TransactionCancelled',
}

export enum ApplicationNotification {
  TransactionStarted = 'TransactionStarted',
  TransactionSent = 'TransactionSent',
  TransactionFailed = 'TransactionFailed',
  TransactionSuccess = 'TransactionSuccess',
}

export type TokenPrice = { key: string; value: number };

export interface SetWeb3Settings {
  onboard?: API;
  ethereum?: any;
  account?: string;
  balance?: string;
  signer?: ethers.Signer;
  contracts?: PremiaContracts;
  chainId?: ChainId;
  web3?: ethers.providers.Web3Provider | null;
  wallet?: Wallet | null;
}

export const updateBlockNumber = createAction<number>(
  'application/updateBlockNumber',
);

export const updateTokenPrices = createAction<TokenPrice[]>(
  'application/updateTokenPrice',
);

export const setWeb3Settings = createAction<SetWeb3Settings>(
  'application/setWeb3Settings',
);

export const setActiveModal = createAction<ApplicationModal | null>(
  'application/setActiveModal',
);

export const setActiveNotification =
  createAction<ApplicationNotification | null>(
    'application/setActiveNotification',
  );

export const setApprovalType = createAction<string | null>(
  'application/setApprovalType',
);

export const setWrapEthModalOpen = createAction<boolean>(
  'application/setWrapEthModalOpen',
);

export const setWrapEth = createAction<boolean>('application/setWrapEth');

export const setSelectedNetwork = createAction<number>('application/setSelectedNetwork');
