import DaiLogo from 'assets/svg/DaiLogo.svg';
import wBtcLogo from 'assets/svg/wBtcLogo.svg';
import EthLogo from 'assets/svg/EthLogo.svg';
import BnbLogo from 'assets/images/wbnb-logo.png';
import BusdLogo from 'assets/images/busd-logo.png';

export function getDenominatorLogo(_symbol: string) {
  const symbol = _symbol.toLowerCase();

  switch (symbol) {
    case 'wbtc':
      return wBtcLogo;
    case 'weth':
    case 'eth':
      return EthLogo;
    case 'wnbnb':
    case 'bnb':
      return BnbLogo;
    case 'busd':
      return BusdLogo;
    default:
      return DaiLogo;
  }
}

export default getDenominatorLogo;
