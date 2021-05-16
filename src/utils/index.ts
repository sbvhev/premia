import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '@uniswap/sdk';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

const ETHERSCAN_URLS: { [chainId in ChainId | 56]: string } = {
  1: 'https://etherscan.io',
  3: 'https://ropsten.etherscan.io',
  4: 'https://rinkeby.etherscan.io',
  5: 'https://goerli.etherscan.io',
  42: 'https://kovan.etherscan.io',
  56: 'https://bscscan.com',
};

export function getEtherscanLink(
  chainId: ChainId | 56,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block',
): string {
  const prefix = ETHERSCAN_URLS[chainId] || ETHERSCAN_URLS[1];

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address?: string, chars = 4): string {
  const parsed = isAddress(address);

  if (!parsed) {
    return '';
  }

  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string,
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any,
  );
}

// get formatted remaining periods
export function getRemainingPeriods(lockedUntil: number) {
  const currentTimeStamp = Math.round(new Date().getTime() / 1000);

  if (lockedUntil < currentTimeStamp) {
    return '0 minutes';
  }

  let seconds = Math.floor(lockedUntil - currentTimeStamp);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  if (days > 0) return `${days} days, ${hours} hours`;

  return `${hours} hours, ${minutes} minutes`;
}
