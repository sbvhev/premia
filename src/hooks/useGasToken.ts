import { useWeb3 } from 'state/application/hooks';
import { Currency } from '@uniswap/sdk';
import { BNB } from 'web3/tokens';
import { ETHER } from '@uniswap/sdk';

export interface CurrencyWithLogoUri extends Currency {
  logoURI: string;
}

export function useGasToken(): CurrencyWithLogoUri {
  const { chainId } = useWeb3();
  const BNB_LOGO_URI =
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB8c77482e45F1F44dE1745F52C74426C631bDD52/logo.png';
  const ETH_LOGO_URI =
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png';

  return chainId === 56
    ? { ...BNB, logoURI: BNB_LOGO_URI }
    : { ...ETHER, logoURI: ETH_LOGO_URI };
}
