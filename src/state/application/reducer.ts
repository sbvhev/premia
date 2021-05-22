import Notify, { API as NotifyAPI } from 'bnc-notify';
import { API as OnboardAPI, Wallet } from 'bnc-onboard/dist/src/interfaces';
import { createReducer } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { Provider } from 'ethers-multicall';
import { ChainId } from '@uniswap/sdk';

import {
  ApplicationModal,
  ApplicationNotification,
  setWeb3Settings,
  setActiveModal,
  setActiveNotification,
  updateBlockNumber,
  updateTokenPrices,
  setApprovalType,
  setWrapEthModalOpen,
  setWrapEth
} from './actions';

export interface ApplicationState {
  onboard?: OnboardAPI;
  notify: NotifyAPI;
  chainId?: ChainId;
  blockNumber: number;
  ethereum: any;
  account: string;
  balance: string;
  signer?: ethers.Signer;
  web3?: ethers.providers.Web3Provider | null;
  multicallProvider?: Provider | null;
  wallet?: Wallet | null;
  activeModal?: ApplicationModal | null;
  activeNotification?: ApplicationNotification | null;
  contracts: any;
  prices: { [symbol: string]: number };
  approvalType: string | null;
  wrapEthModalOpen: boolean;
  wrapEth: boolean;
}

export const initialState: ApplicationState = {
  onboard: undefined,
  notify: Notify({
    dappId: process.env.REACT_APP_BLOCKNATIVE_KEY,
    networkId: ChainId.MAINNET,
  }),
  chainId: undefined,
  blockNumber: -1,
  ethereum: (window as any).ethereum,
  account: '',
  balance: '',
  signer: undefined,
  web3: undefined,
  wallet: undefined,
  activeModal: undefined,
  activeNotification: undefined,
  contracts: {},
  prices: {},
  approvalType: 'write',
  wrapEthModalOpen: false,
  wrapEth: true,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, { payload: blockNumber }) => {
      state.blockNumber = blockNumber;
    })
    .addCase(setWeb3Settings, (state, { payload }) => {
      const {
        onboard,
        ethereum,
        account,
        balance,
        signer,
        web3,
        wallet,
        contracts,
        chainId,
      } = payload;

      state.onboard = onboard || state.onboard;
      state.ethereum = ethereum || state.ethereum;
      state.account = account ? account.toLowerCase() : state.account;
      state.balance = balance ? balance : state.balance;
      state.signer = signer || state.signer;
      state.web3 = web3 !== undefined ? web3 : state.web3;
      state.wallet = wallet !== undefined ? wallet : state.wallet;
      state.contracts = contracts || state.contracts;
      state.chainId = chainId ?? state.chainId;

      if (state.web3) {
        state.multicallProvider = new Provider(state.web3, state.chainId);
      }

      state.notify.config({ networkId: Number(chainId) });

      if (state.onboard) {
        state.onboard.config({ networkId: Number(chainId) });
      }
    })
    .addCase(updateTokenPrices, (state, { payload }) => {
      for (const el of payload) {
        state.prices[el.key] = el.value;
      }
    })
    .addCase(setActiveModal, (state, { payload }) => {
      state.activeModal = payload;
    })
    .addCase(setActiveNotification, (state, { payload }) => {
      state.activeNotification = payload;
    })
    .addCase(setApprovalType, (state, { payload }) => {
      state.approvalType = payload;
    })
    .addCase(setWrapEthModalOpen, (state, { payload }) => {
      state.wrapEthModalOpen = payload;
    })
    .addCase(setWrapEth, (state, { payload }) => {
      state.wrapEth = payload;
    })
);
