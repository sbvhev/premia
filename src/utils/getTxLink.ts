import { ChainId } from '@uniswap/sdk';

export function getTxLink(
  txHash: string,
  chainId: ChainId | 56 | undefined,
): string {
  switch (chainId) {
    case 56:
      return `https://bscscan.com/tx/${txHash}`;

    case ChainId.RINKEBY:
      return `https://rinkeby.etherscan.io/tx/${txHash}`;

    case ChainId.MAINNET:
    default:
      return `https://etherscan.io/tx/${txHash}`;
  }
}
