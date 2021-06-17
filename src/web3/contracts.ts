import { ethers } from 'ethers';

import {
  Erc20,
  Erc20__factory,
  FeeCalculator,
  FeeCalculator__factory,
  PremiaErc20,
  PremiaErc20__factory,
  PremiaFeeDiscount,
  PremiaFeeDiscount__factory,
  PremiaStaking,
  PremiaStaking__factory,
  TradingCompetitionMerkle,
  UniswapV2Router02,
  UniswapV2Router02__factory,
  Weth__factory,
  Weth,
  TradingCompetitionMerkle__factory,
} from '../contracts';

export enum ContractType {
  WETH = 'WETH',
  DAI = 'DAI',
  WBNB = 'WBNB',
  BUSD = 'BUSD',
  WMATIC = 'WMATIC',
  SushiswapRouter = 'SushiswapRouter',
  FeeCalculator = 'FeeCalculator',
  PremiaErc20 = 'PremiaErc20',
  PremiaFeeDiscount = 'PremiaFeeDiscount',
  PremiaStaking = 'PremiaStaking',
  TradingCompetitionMerkle = 'TradingCompetitionMerkle',
}

export type ContractAddresses = {
  [key in ContractType]: { [chainId: number]: string };
};

export interface PremiaContracts {
  WETH: Weth;
  DAI: Erc20;
  WBNB: Weth;
  BUSD: Erc20;
  WMATIC: Weth;
  SushiswapRouter: UniswapV2Router02;
  FeeCalculator: FeeCalculator;
  PremiaErc20: PremiaErc20;
  PremiaFeeDiscount: PremiaFeeDiscount;
  PremiaStaking: PremiaStaking;
  TradingCompetitionMerkle: TradingCompetitionMerkle;
}

export const contracts: ContractAddresses = {
  WETH: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    4: '0x3b64bE65F7EF3CA6c26A52FaD9C1CeBBe1931fB3', // '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    42: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
    56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    137: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  },
  DAI: {
    1: '0x6b175474e89094c44da98b954eedeac495271d0f',
    4: '0xd9abf41C1b5929fEB71AbCc94d839C7757c6aFe0',
    42: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
    56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    137: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
  },
  WBNB: {
    56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  },
  BUSD: {
    56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  },
  WMATIC: {
    137: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  },
  SushiswapRouter: {
    1: '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
    4: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    42: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    56: '0x05ff2b0db69458a0750badebc4f9e13add608c7f',
    137: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
  },
  FeeCalculator: {
    1: '0x602B50091B0B351CA179E87aD6e006AeCEB2a6Ad',
    4: '0xf3a726eDd344513f81000379819669AC78205BCB',
    42: '0x4E831efC11511c6d259b5fd9f4cA6FE732728FAB',
    56: '0x581d114C4058230504F862119D5Bf01393E9e17e',
  },
  PremiaErc20: {
    1: '0x6399C842dD2bE3dE30BF99Bc7D1bBF6Fa3650E70',
    4: '0x7a8864eA3A4B855D0d359F16D38d966ce018aDb9',
    42: '0xa880c61D2774b34b9C710e9c41C0Cc6D8C791C3c',
    56: '0xc417b45e6090bd4201D9400b48F84c9f34f4d0a5',
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
  TradingCompetitionMerkle: {
    4: '0x66DD98ae687aEc4383eBB11615A6a4Cd954A8Eb4',
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

  if (chainId === 56) {
    const busdAddress = getContractAddress(chainId, ContractType.BUSD);
    preContracts.BUSD = busdAddress
      ? Erc20__factory.connect(busdAddress, signer.connectUnchecked())
      : undefined;

    const wbnbAddress = getContractAddress(chainId, ContractType.WBNB);
    preContracts.WBNB = wbnbAddress
      ? Weth__factory.connect(wbnbAddress, signer.connectUnchecked())
      : undefined;
  }

  if (chainId === 137) {
    const wmaticAddress = getContractAddress(chainId, ContractType.WMATIC);
    preContracts.WMATIC = Weth__factory.connect(
      wmaticAddress,
      signer.connectUnchecked(),
    );
  }

  if ([1, 4, 42, 56, 137].includes(chainId)) {
    const wethAddress = getContractAddress(chainId, ContractType.WETH);
    preContracts.WETH = Weth__factory.connect(
      wethAddress,
      signer.connectUnchecked(),
    );

    const daiAddress = getContractAddress(chainId, ContractType.DAI);
    preContracts.DAI = daiAddress
      ? Erc20__factory.connect(daiAddress, signer.connectUnchecked())
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
  }

  if ([1, 4, 42, 56].includes(chainId)) {
    const feeCalculatorAddress = getContractAddress(
      chainId,
      ContractType.FeeCalculator,
    );
    preContracts.FeeCalculator = FeeCalculator__factory.connect(
      feeCalculatorAddress,
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
  }

  if ([1, 4, 42].includes(chainId)) {
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
  }

  if (chainId === 4) {
    const tradingCompetitionMerkleAddress = getContractAddress(
      chainId,
      ContractType.TradingCompetitionMerkle,
    );
    preContracts.TradingCompetitionMerkle =
      TradingCompetitionMerkle__factory.connect(
        tradingCompetitionMerkleAddress,
        signer.connectUnchecked(),
      );
  }

  const contracts = preContracts as PremiaContracts;

  return { contracts, signer, chainId };
}
