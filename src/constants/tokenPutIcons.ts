import { ReactComponent as WBTCPutIcon } from 'assets/svg/WBTCPutIcon.svg';
import { ReactComponent as UniPutIcon } from 'assets/svg/UniPutIcon.svg';
import { ReactComponent as LinkPutIcon } from 'assets/svg/LinkPutIcon.svg';
import { ReactComponent as YFIPutIcon } from 'assets/svg/YFIPutIcon.svg';
import { ReactComponent as ETHPutIcon } from 'assets/svg/ETHPutIcon.svg';
import { ReactComponent as DAIPutIcon } from 'assets/svg/DAIPutIcon.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/svg/TooltipQuestionmark.svg';

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
