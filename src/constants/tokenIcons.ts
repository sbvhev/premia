import { ReactComponent as WBTCIcon } from 'assets/svg/WBTCIcon.svg';
import { ReactComponent as UniIcon } from 'assets/svg/UniIcon.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import { ReactComponent as YFIIcon } from 'assets/svg/YFIIcon.svg';
import { ReactComponent as EthIcon } from 'assets/svg/ETHIcon.svg';
import { ReactComponent as DaiIcon } from 'assets/svg/DAIIcon.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/svg/TooltipQuestionmark.svg';

export const tokenIcons = {
  BNB: EthIcon,
  WBNB: EthIcon,
  BUSD: DaiIcon,
  DAI: DaiIcon,
  BTC: WBTCIcon,
  wBTC: WBTCIcon,
  WBTC: WBTCIcon,
  UNI: UniIcon,
  LINK: LinkIcon,
  YFI: YFIIcon,
  ETH: EthIcon,
  WETH: EthIcon,
  '?': QuestionMarkIcon,
};

export default tokenIcons;
