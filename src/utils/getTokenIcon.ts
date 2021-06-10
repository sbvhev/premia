import { tokenIcons } from 'constants/tokenIcons';

export function getTokenIcon(tokenSymbol?: string) {
  return tokenIcons[(tokenSymbol ?? '?') as keyof typeof tokenIcons];
}
