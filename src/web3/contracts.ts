import { ethers } from 'ethers';

import {
  Erc20,
  Erc20__factory,
  Weth__factory,
  Weth,
  UniswapV2Router02,
  UniswapV2Router02__factory,
} from '../contracts';
import { TokenDenominator } from './tokens';

export enum ContractType {
  Weth = 'WETH',
  Dai = 'DAI',
  Wbnb = 'WBNB',
  Busd = 'BUSD',
  SushiswapRouter = 'sushiswapRouter',
}

export type ContractAddresses = {
  [key in ContractType]: { [chainId: number]: string };
};

export interface PremiaContracts {
  weth?: Weth;
  dai?: Erc20;
  wbnb?: Weth;
  busd?: Erc20;
  sushiswapRouter?: UniswapV2Router02;
}

export const contracts: ContractAddresses = {
  WETH: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    4: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    42: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
  },
  DAI: {
    1: '0x6b175474e89094c44da98b954eedeac495271d0f',
    4: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
    42: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
  },
  WBNB: {
    56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  },
  BUSD: {
    56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  },
  sushiswapRouter: {
    1: '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
    4: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    42: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    56: '0x05ff2b0db69458a0750badebc4f9e13add608c7f',
  },
};

export function getContractAddress(
  chainId: number,
  contractType: ContractType,
) {
  return contracts[contractType][chainId] ?? '';
}

export function getDenominatorContract(
  contracts: PremiaContracts,
  denominator: TokenDenominator,
) {
  switch (denominator) {
    case TokenDenominator.DAI:
      return contracts.dai;
    case TokenDenominator.BUSD:
      return contracts.busd;
    default:
      throw new Error('Case not handled : ' + denominator);
  }
}

export async function getSignerAndContracts(
  web3Provider: ethers.providers.Web3Provider,
) {
  const signer = web3Provider.getSigner();
  const network = await web3Provider.getNetwork();
  const chainId = network.chainId;

  const contracts: PremiaContracts = {};

  // WETH
  const wethAddress = getContractAddress(chainId, ContractType.Weth);
  contracts.weth = wethAddress
    ? Weth__factory.connect(wethAddress, signer.connectUnchecked())
    : undefined;

  // DAI
  const daiAddress = getContractAddress(chainId, ContractType.Dai);
  contracts.dai = daiAddress
    ? Erc20__factory.connect(daiAddress, signer.connectUnchecked())
    : undefined;

  // BUSD
  const busdAddress = getContractAddress(chainId, ContractType.Busd);
  contracts.busd = busdAddress
    ? Erc20__factory.connect(busdAddress, signer.connectUnchecked())
    : undefined;

  // WBNB
  const wbnbAddress = getContractAddress(chainId, ContractType.Wbnb);
  contracts.wbnb = wbnbAddress
    ? Weth__factory.connect(wbnbAddress, signer.connectUnchecked())
    : undefined;

  // SushiswapRouter
  const sushiswapRouterAddress = getContractAddress(
    chainId,
    ContractType.SushiswapRouter,
  );
  contracts.sushiswapRouter = sushiswapRouterAddress
    ? UniswapV2Router02__factory.connect(
        sushiswapRouterAddress,
        signer.connectUnchecked(),
      )
    : undefined;

  return { contracts, signer, chainId };
}
