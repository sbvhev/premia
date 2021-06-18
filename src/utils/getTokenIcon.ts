import { tokenIcons, tokenCallIcons, tokenPutIcons } from '../constants';

export function getTokenIcon(tokenSymbol?: string) {
  return tokenIcons[(tokenSymbol ?? '?') as keyof typeof tokenIcons];
}

export function getTokenPutIcon(tokenSymbol?: string) {
  return tokenPutIcons[(tokenSymbol ?? '?') as keyof typeof tokenPutIcons];
}

export function getTokenCallIcon(tokenSymbol?: string) {
  return tokenCallIcons[(tokenSymbol ?? '?') as keyof typeof tokenCallIcons];
}
