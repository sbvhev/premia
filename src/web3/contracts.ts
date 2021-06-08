import { ethers } from 'ethers';

import {
  Erc20,
  Erc20__factory,
  FeeCalculator,
  FeeCalculator__factory,
  Premia,
  Premia__factory,
  PremiaErc20,
  PremiaErc20__factory,
  PremiaFeeDiscount,
  PremiaFeeDiscount__factory,
  PremiaStaking,
  PremiaStaking__factory,
  ProxyManager,
  ProxyManager__factory,
  UniswapV2Router02,
  UniswapV2Router02__factory,
  Weth__factory,
  Weth,
} from '../contracts';

export enum ContractType {
  Weth = 'WETH',
  Dai = 'DAI',
  Wbnb = 'WBNB',
  Busd = 'BUSD',
  SushiswapRouter = 'SushiswapRouter',
  FeeCalculator = 'FeeCalculator',
  PremiaInstance = 'PremiaInstance',
  PremiaErc20 = 'PremiaErc20',
  PremiaFeeDiscount = 'PremiaFeeDiscount',
  PremiaStaking = 'PremiaStaking',
  ProxyManager = 'ProxyManager',
}

export type ContractAddresses = {
  [key in ContractType]: { [chainId: number]: string };
};

export interface PremiaContracts {
  Weth: Weth;
  Dai: Erc20;
  Wbnb: Weth;
  Busd: Erc20;
  SushiswapRouter: UniswapV2Router02;
  FeeCalculator: FeeCalculator;
  PremiaInstance: Premia;
  PremiaErc20: PremiaErc20;
  PremiaFeeDiscount: PremiaFeeDiscount;
  PremiaStaking: PremiaStaking;
  ProxyManager: ProxyManager;
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
  SushiswapRouter: {
    1: '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
    4: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    42: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    56: '0x05ff2b0db69458a0750badebc4f9e13add608c7f',
  },
  FeeCalculator: {
    1: '0x602B50091B0B351CA179E87aD6e006AeCEB2a6Ad',
    4: '0xf3a726eDd344513f81000379819669AC78205BCB',
    42: '0x4E831efC11511c6d259b5fd9f4cA6FE732728FAB',
    56: '0x581d114C4058230504F862119D5Bf01393E9e17e',
  },
  PremiaInstance: {
    4: '0xeda8F7435148C0e70e35485D75d71A00815Af1e7',
  },
  PremiaErc20: {
    1: '0x6399C842dD2bE3dE30BF99Bc7D1bBF6Fa3650E70',
    4: '0x7a8864eA3A4B855D0d359F16D38d966ce018aDb9',
    42: '0xa880c61D2774b34b9C710e9c41C0Cc6D8C791C3c',
  },
  PremiaFeeDiscount: {
    1: '0xF5aae75D1AD6fDD62Cce66137F2674c96FEda854',
    4: '0xbaBd6824CC148b509E0C5B9657D3A4C733aFdFFE',
    42: '0xc0cddb80011321e2405b7C517aceda32C6867343',
  },
  PremiaStaking: {
    1: '0x16f9D564Df80376C61AC914205D3fDfF7057d610',
    4: '0x65191E877AE65ff9c4959b8389Dd7E7881cDAe38',
    42: '0x1f87Beb89e43824C075d82B3a7061b1e50D1615d',
  },
  ProxyManager: {
    4: '0xeda8F7435148C0e70e35485D75d71A00815Af1e7',
  },
};

export function getContractAddress(
  chainId: number,
  contractType: ContractType,
) {
  return contracts[contractType][chainId] ?? '';
}

export async function getSignerAndContracts(
  web3Provider: ethers.providers.Web3Provider,
) {
  const signer = web3Provider.getSigner();
  const network = await web3Provider.getNetwork();
  const chainId = network.chainId;

  const preContracts: any = {};

  const wethAddress = getContractAddress(chainId, ContractType.Weth);
  preContracts.Weth = Weth__factory.connect(
    wethAddress,
    signer.connectUnchecked(),
  );

  const daiAddress = getContractAddress(chainId, ContractType.Dai);
  preContracts.Dai = daiAddress
    ? Erc20__factory.connect(daiAddress, signer.connectUnchecked())
    : undefined;

  const busdAddress = getContractAddress(chainId, ContractType.Busd);
  preContracts.Busd = busdAddress
    ? Erc20__factory.connect(busdAddress, signer.connectUnchecked())
    : undefined;

  const wbnbAddress = getContractAddress(chainId, ContractType.Wbnb);
  preContracts.Wbnb = wbnbAddress
    ? Weth__factory.connect(wbnbAddress, signer.connectUnchecked())
    : undefined;

  const sushiswapRouterAddress = getContractAddress(
    chainId,
    ContractType.SushiswapRouter,
  );
  preContracts.SushiswapRouter = sushiswapRouterAddress
    ? UniswapV2Router02__factory.connect(
        sushiswapRouterAddress,
        signer.connectUnchecked(),
      )
    : undefined;

  const feeCalculatorAddress = getContractAddress(
    chainId,
    ContractType.FeeCalculator,
  );
  preContracts.FeeCalculator = FeeCalculator__factory.connect(
    feeCalculatorAddress,
    signer.connectUnchecked(),
  );

  const premiaInterfaceAddress = getContractAddress(
    chainId,
    ContractType.PremiaInstance,
  );
  preContracts.PremiaInstance = Premia__factory.connect(
    premiaInterfaceAddress,
    signer.connectUnchecked(),
  );

  const premiaErc20Address = getContractAddress(
    chainId,
    ContractType.PremiaErc20,
  );
  preContracts.PremiaErc20 = PremiaErc20__factory.connect(
    premiaErc20Address,
    signer.connectUnchecked(),
  );

  const premiaFeeDiscountAddress = getContractAddress(
    chainId,
    ContractType.PremiaFeeDiscount,
  );
  preContracts.PremiaFeeDiscount = PremiaFeeDiscount__factory.connect(
    premiaFeeDiscountAddress,
    signer.connectUnchecked(),
  );

  const premiaStakingAddress = getContractAddress(
    chainId,
    ContractType.PremiaStaking,
  );
  preContracts.PremiaStaking = PremiaStaking__factory.connect(
    premiaStakingAddress,
    signer.connectUnchecked(),
  );

  const proxyManagerAddress = getContractAddress(
    chainId,
    ContractType.ProxyManager,
  );
  preContracts.ProxyManager = ProxyManager__factory.connect(
    proxyManagerAddress,
    signer.connectUnchecked(),
  );

  const contracts = preContracts as PremiaContracts;

  return { contracts, signer, chainId };
}
