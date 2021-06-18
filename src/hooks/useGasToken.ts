import { useWeb3 } from 'state/application/hooks';
import { Currency, ETHER } from '@uniswap/sdk';

import { BNB, MATIC } from '../constants';
export interface CurrencyWithLogoUri extends Currency {
  logoURI: string;
}

export function useGasToken(): CurrencyWithLogoUri {
  const { chainId } = useWeb3();
  const BNB_LOGO_URI =
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB8c77482e45F1F44dE1745F52C74426C631bDD52/logo.png';
  const ETH_LOGO_URI =
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png';
  const MATIC_LOGO_URI =
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0/logo.png';

  switch (chainId) {
    case 56:
      return { ...BNB, logoURI: BNB_LOGO_URI };

    case 137:
      return { ...MATIC, logoURI: MATIC_LOGO_URI };

    default:
      break;
  }

  return { ...ETHER, logoURI: ETH_LOGO_URI };
}
