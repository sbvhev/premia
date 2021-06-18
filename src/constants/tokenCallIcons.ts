import WBTCCallIcon from 'assets/svg/WBTCCallIcon.svg';
import UniCallIcon from 'assets/svg/UniCallIcon.svg';
import LinkCallIcon from 'assets/svg/LinkCallIcon.svg';
import YFICallIcon from 'assets/svg/YFICallIcon.svg';
import ETHCallIcon from 'assets/svg/ETHCallIcon.svg';
import DAICallIcon from 'assets/svg/DAICallIcon.svg';
import QuestionMarkIcon from 'assets/svg/TooltipQuestionmark.svg';

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
