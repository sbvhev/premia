import WBTCPutIcon from 'assets/svg/WBTCPutIcon.svg';
import UniPutIcon from 'assets/svg/UniPutIcon.svg';
import LinkPutIcon from 'assets/svg/LinkPutIcon.svg';
import YFIPutIcon from 'assets/svg/YFIPutIcon.svg';
import ETHPutIcon from 'assets/svg/ETHPutIcon.svg';
import DAIPutIcon from 'assets/svg/DAIPutIcon.svg';
import QuestionMarkIcon from 'assets/svg/TooltipQuestionmark.svg';

export const tokenPutIcons = {
  BNB: ETHPutIcon,
  WBNB: ETHPutIcon,
  BUSD: DAIPutIcon,
  DAI: DAIPutIcon,
  BTC: WBTCPutIcon,
  wBTC: WBTCPutIcon,
  WBTC: WBTCPutIcon,
  UNI: UniPutIcon,
  LINK: LinkPutIcon,
  YFI: YFIPutIcon,
  ETH: ETHPutIcon,
  WETH: ETHPutIcon,
  '?': QuestionMarkIcon,
};

export default tokenPutIcons;
