import React, { useMemo } from 'react';
import { ChainId, Currency, ETHER } from '@uniswap/sdk';
import { ethers } from 'ethers';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import { BNB } from '../../constants';
import { isToken } from 'web3/tokens';
import { useWeb3 } from 'state/application/hooks';

import PremiaLogo from 'assets/images/premia-logo-circle.png';
import CoverLogo from 'assets/images/cover-logo.png';
import AlchemixLogo from 'assets/images/alchemix-logo.jpeg';
import EthereumLogo from 'assets/images/ethereum-logo.png';
import BnbLogo from 'assets/images/bnb-logo.png';
import Logo from './Logo';

const useStyles = makeStyles({
  ethereumLogo: {
    width: (props: any) => props.size,
    height: (props: any) => props.size,
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.075)',
    borderRadius: 24,
  },

  logo: {
    width: (props: any) => props.size,
    height: (props: any) => props.size,
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.075)',
    borderRadius: (props: any) => props.size,
  },
});

export default function CurrencyLogo({
  currency,
  size = '24px',
  className,
  style,
}: {
  currency?: Currency | null;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { chainId } = useWeb3();
  const classes = useStyles({ size });
  let chainName = 'ethereum';

  switch (chainId) {
    case ChainId.RINKEBY:
      chainName = 'rinkeby';
      break;
    case 56:
      chainName = 'smartchain';
      break;
    case 137:
      chainName = 'polygon';
      break;
  }

  const srcs: string[] = useMemo(() => {
    const getTokenLogoURL = (address: string) =>
      `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/assets/${address}/logo.png`;

    if (currency && [ETHER, BNB].includes(currency)) return [];

    if (currency?.symbol === 'PREMIA') return [PremiaLogo];
    if (currency?.symbol === 'COVER') return [CoverLogo];
    if (currency?.symbol === 'ALCX') return [AlchemixLogo];

    if (isToken(currency)) {
      return [getTokenLogoURL(ethers.utils.getAddress(currency.address))];
    }
    return [];
  }, [currency, chainName]);

  if (currency === ETHER) {
    return (
      <img
        className={cn(classes.ethereumLogo, className)}
        src={EthereumLogo}
        style={style}
        alt='ethereum logo'
      />
    );
  }

  if (currency?.symbol === BNB.symbol) {
    return (
      <img
        className={cn(classes.ethereumLogo, className)}
        src={BnbLogo}
        style={style}
        alt='ethereum logo'
      />
    );
  }

  return (
    <Logo
      className={cn(className, classes.logo)}
      srcs={srcs}
      alt={`${currency?.symbol ?? 'token'} logo`}
      style={style}
    />
  );
}
