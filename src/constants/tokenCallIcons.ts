import { ReactComponent as WBTCCallIcon } from 'assets/svg/WBTCCallIcon.svg';
import { ReactComponent as UniCallIcon } from 'assets/svg/UniCallIcon.svg';
import { ReactComponent as LinkCallIcon } from 'assets/svg/LinkCallIcon.svg';
import { ReactComponent as YFICallIcon } from 'assets/svg/YFICallIcon.svg';
import { ReactComponent as ETHCallIcon } from 'assets/svg/ETHCallIcon.svg';
import { ReactComponent as DAICallIcon } from 'assets/svg/DAICallIcon.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/svg/TooltipQuestionmark.svg';

export const tokenCallIcons = {
  BNB: ETHCallIcon,
  WBNB: ETHCallIcon,
  BUSD: DAICallIcon,
  DAI: DAICallIcon,
  BTC: WBTCCallIcon,
  wBTC: WBTCCallIcon,
  WBTC: WBTCCallIcon,
  UNI: UniCallIcon,
  LINK: LinkCallIcon,
  YFI: YFICallIcon,
  ETH: ETHCallIcon,
  WETH: ETHCallIcon,
  '?': QuestionMarkIcon,
};

export default tokenCallIcons;
