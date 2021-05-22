import Onboard from 'bnc-onboard';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ChainId } from '@uniswap/sdk';
import { Wallet } from 'bnc-onboard/dist/src/interfaces';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { Contract, ContractCall } from 'ethers-multicall';
import { ethers } from 'ethers';
import { get } from 'lodash';

import { getPrice, useBlockNumber, usePrices } from 'state/application/hooks';
import { getSignerAndContracts } from 'web3/contracts';
import {
  updateBlockNumber,
  updateTokenPrices,
  setWeb3Settings,
  TokenPrice,
} from './actions';
import { AppState } from 'state';
import {
  useAllTokens,
  useDebounce,
  useIsWindowVisible,
  useReferrer,
  useDenominatorAddress,
  useDenominatorDecimals,
} from 'hooks';
import { UNISWAP_FACTORY, wallets, WETH, WBNB } from '../../constants';
import UniswapV2FactoryAbi from 'constants/abi/UniswapV2Factory.json';
import UniswapV2PairAbi from 'constants/abi/UniswapV2Pair.json';

const assetList = [
  { key: 'WBNB', coinGeckoId: 'wbnb' },
  { key: 'BNB', coinGeckoId: 'binance-coin' },
  { key: 'AAVE', coinGeckoId: 'aave' },
  { key: 'BADGER', coinGeckoId: 'badger-dao' },
  { key: 'COMP', coinGeckoId: 'compound-governance-token' },
  { key: 'COVER', coinGeckoId: 'cover-protocol' },
  { key: 'CRV', coinGeckoId: 'curve-dao-token' },
  { key: 'DPI', coinGeckoId: 'defipulse-index' },
  { key: 'LINK', coinGeckoId: 'chainlink' },
  { key: 'MKR', coinGeckoId: 'maker' },
  { key: 'PREMIA', coinGeckoId: 'premia' },
  { key: 'REN', coinGeckoId: 'republic-protocol' },
  { key: 'SNX', coinGeckoId: 'havven' },
  { key: 'SUSHI', coinGeckoId: 'sushi' },
  { key: 'UNI', coinGeckoId: 'uniswap' },
  { key: 'WBTC', coinGeckoId: 'wrapped-bitcoin' },
  { key: 'YFI', coinGeckoId: 'yearn-finance' },
  { key: 'DAI', coinGeckoId: 'dai' },
  { key: 'WETH', coinGeckoId: 'weth' },
  { key: 'ALCX', coinGeckoId: 'alchemix' },
];

export default function Updater(): null {
  // Save referrer to localStorage
  useReferrer();

  const dispatch = useDispatch();
  const location = useLocation();
  const windowVisible = useIsWindowVisible();
  const latestBlockNumber = useBlockNumber();
  const denominatorAddress = useDenominatorAddress();
  const denominatorDecimals = useDenominatorDecimals();
  const prices = usePrices();
  const tokens = useAllTokens();

  // const { denominator } = useOptionSettings();
  const {
    onboard: _onboard,
    chainId,
    web3,
    signer,
    contracts,
    account,
    wallet,
    blockNumber,
    multicallProvider,
  } = useSelector<AppState, AppState['application']>(
    (state) => state.application,
  );

  const [state, setState] = useState<{
    blockNumber: number | null;
    hasRequestedAccounts: boolean;
  }>({
    blockNumber: null,
    hasRequestedAccounts: false,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((s) => ({ ...s, blockNumber }));
    },
    [setState],
  );

  useEffect(() => {
    if (!web3 || !chainId || !windowVisible) return undefined;

    setState((s) => ({ ...s, blockNumber: null }));

    if (!blockNumber) {
      web3
        .getBlockNumber()
        .then(blockNumberCallback)
        .catch((error: any) =>
          console.error(
            `Failed to get block number for chainId: ${chainId}`,
            error,
          ),
        );
    }

    web3.on('block', blockNumberCallback);

    return () => {
      web3.removeListener('block', blockNumberCallback);
    };
  }, [
    dispatch,
    chainId,
    web3,
    blockNumber,
    blockNumberCallback,
    windowVisible,
  ]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.blockNumber || !windowVisible) return;

    dispatch(updateBlockNumber(debouncedState.blockNumber));
  }, [windowVisible, dispatch, debouncedState.blockNumber]);

  useEffect(() => {
    if (!web3 || state.hasRequestedAccounts) return;

    setState((s) => ({ ...s, hasRequestedAccounts: true }));

    const ethereum = (window as any).ethereum;

    const handleGetAccountAndContracts = async (
      web3: ethers.providers.Web3Provider,
    ) => {
      const { contracts, signer, chainId } = await getSignerAndContracts(web3);

      dispatch(setWeb3Settings({ contracts, signer, chainId }));
    };

    ethereum?.request({ method: 'eth_requestAccounts' }).then(() => {
      handleGetAccountAndContracts(web3).catch((e) => console.error(e));

      dispatch(setWeb3Settings({ ethereum }));
    });

    ethereum?.on('accountsChanged', async () => {
      handleGetAccountAndContracts(web3).catch((e) => console.error(e));

      if (
        ['marketplace', 'account'].includes(
          get(location.pathname.split('/'), 1),
        )
      ) {
        document.location.reload();
      }
    });

    ethereum?.on('chainChanged', () => {
      document.location.reload();
    });
  }, [web3, location, signer, contracts, state.hasRequestedAccounts, dispatch]);

  useEffect(() => {
    if (!signer || !web3 || !tokens.length || !chainId || !multicallProvider)
      return;

    // Update price every 10 blocks
    if ((!latestBlockNumber || latestBlockNumber % 20 !== 0) && prices['WETH'])
      return;

    (async () => {
      const uniswapFactory = new Contract(
        UNISWAP_FACTORY[chainId],
        UniswapV2FactoryAbi.abi,
      );

      const comparisonToken =
        chainId === 56
          ? WBNB.address
          : (WETH[chainId ?? ChainId.MAINNET] as any).address;

      const tokenList = [
        ...tokens.filter(
          (el) => el.address.toLowerCase() !== comparisonToken.toLowerCase(),
        ),
        // ...(denominatorAddress
        //   ? [
        //       {
        //         address: denominatorAddress,
        //         symbol: chainId === 56 ? 'BUSD' : String(denominator),
        //         decimals: denominatorDecimals,
        //       },
        //     ]
        //   : []),
      ];

      const comparisonTokenName = 'BNB';
      const comparisonTokenUsdPrice = await getPrice(
        chainId === 56 ? 'wbnb' : 'ethereum',
      );
      const tokenPrices: TokenPrice[] = [
        { key: `W${comparisonTokenName}`, value: comparisonTokenUsdPrice },
        { key: comparisonTokenName, value: comparisonTokenUsdPrice },
      ];

      const lpAddresses = await multicallProvider.all(
        tokenList.map((el) =>
          uniswapFactory.getPair(comparisonToken, el.address),
        ),
      );

      const calls: ContractCall[] = lpAddresses.map((address: string) => {
        const lpContract = new Contract(address, UniswapV2PairAbi.abi);
        return lpContract.getReserves();
      });

      const results = await multicallProvider.all(calls);

      for (let i = 0; i < tokenList.length; i++) {
        const tokensPerComparisonToken =
          parseInt(comparisonToken) < parseInt(tokenList[i].address)
            ? Number(formatUnits(results[i][1], tokenList[i].decimals)) /
              Number(formatEther(results[i][0]))
            : Number(formatUnits(results[i][0], tokenList[i].decimals)) /
              Number(formatEther(results[i][1]));

        const tokenUsdPrice =
          comparisonTokenUsdPrice / tokensPerComparisonToken;

        tokenPrices.push({
          key: tokenList[i].symbol,
          value: tokenUsdPrice,
        });
      }
      dispatch(updateTokenPrices(tokenPrices));
    })();
  }, [
    latestBlockNumber,
    prices,
    dispatch,
    tokens,
    account,
    web3,
    chainId,
    signer,
    multicallProvider,
    // denominator,
    denominatorAddress,
    denominatorDecimals,
  ]);

  useEffect(() => {
    if (_onboard) return;

    const chain = Number(localStorage.getItem('chainId') || 1);

    const onboard = Onboard({
      subscriptions: {
        address: (account: string) => dispatch(setWeb3Settings({ account })),
        network: (chainId: ChainId) => {
          dispatch(setWeb3Settings({ chainId }));
          // dispatch(
          //   setOptionSettings({
          //     denominator:
          //       chainId === 56 ? TokenDenominator.BUSD : TokenDenominator.DAI,
          //   }),
          // );
          localStorage.setItem('chainId', String(chainId));
        },
        balance: (balance: string) => dispatch(setWeb3Settings({ balance })),
        wallet: async (wallet: Wallet) => {
          const walletAvailable = await onboard.walletCheck();

          if (walletAvailable) {
            const web3 = new ethers.providers.Web3Provider(wallet.provider);

            if (window.localStorage) {
              window.localStorage.setItem('selectedWallet', wallet.name as any);
            }

            dispatch(setWeb3Settings({ wallet, web3 }));
          } else {
            dispatch(
              setWeb3Settings({
                wallet: null,
                web3: null,
                account: '',
                balance: '',
              }),
            );
          }
        },
      },
      networkId: chainId || 1,
      dappId: process.env.REACT_APP_BLOCKNATIVE_KEY,
      hideBranding: true,
      darkMode: true,
      walletSelect: { wallets: wallets(chain) },
      walletCheck: [
        { checkName: 'derivationPath' },
        { checkName: 'connect' },
        { checkName: 'accounts' },
      ],
    });

    dispatch(setWeb3Settings({ onboard }));
  }, [dispatch, _onboard, chainId, signer]);

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage
      ? window.localStorage.getItem('selectedWallet')
      : undefined;

    if (
      previouslySelectedWallet &&
      _onboard &&
      !['WalletLink', 'Coinbase'].includes(previouslySelectedWallet)
    ) {
      _onboard.walletSelect(previouslySelectedWallet);
    }
  }, [_onboard, dispatch, web3]);

  useEffect(() => {
    let geckoFetch: any;

    if ((!wallet || !web3 || !account) && Object.keys(prices).length < 1) {
      const fetchFromGecko = async () => {
        const geckoPricesPromises = assetList.map((asset) =>
          getPrice(asset.coinGeckoId),
        );
        const pricesArray = await Promise.all(geckoPricesPromises);
        const tokenPrices = [];

        for (const [index, asset] of assetList.entries()) {
          tokenPrices.push({
            key: asset.key,
            value: pricesArray[index],
          });
        }

        dispatch(updateTokenPrices(tokenPrices));
      };

      fetchFromGecko();

      geckoFetch = setInterval(() => {
        fetchFromGecko();
      }, 130000);
    }

    return () => clearInterval(geckoFetch);
  }, [wallet, account, web3, prices, dispatch]);

  return null;
}