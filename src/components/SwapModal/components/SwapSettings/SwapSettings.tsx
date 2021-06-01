import React from 'react';
import {
  Typography,
  Box,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, withStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ReactComponent as BackIcon } from 'assets/svg/GoBackArrow.svg';
import { ReactComponent as InfoIcon } from 'assets/svg/TooltipQuestionmark.svg'; 
import { ReactComponent as PercentageIcon } from 'assets/svg/PercentageIcon.svg'; 
import { ReactComponent as Expand } from 'assets/svg/ExpandRightArrow.svg'; 

import { SwitchWithGlider } from 'components';

import { SettingsConfirmation } from '../../components';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    width: '448px',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
  },
  wrapperMobile: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
  },
  mainCard: {
    width: '448px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,
  },
  mainCardMobile: {
    width: '100%',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '42px 26px 28px',
    height: '283px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  topSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '42px 14px 28px',
    // height: '283px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  title: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '18px',
    color: palette.text.primary,
  },
  elementHeader: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '18px',
    textAlign: 'left',
    marginLeft: '2px',
    color: palette.text.primary,
  },
  borderedInput: {
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    height: '42px',
    width: '100%',
    maxWidth: '258px',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    padding: '14px',
    color: palette.text.primary,
    zIndex: 2,
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
    '&:after': {
      borderColor: palette.primary.dark,
    },
    '&:focus': {
      borderColor: palette.primary.main,
      outline: 'none',
      boxShadow: 'none',
      borderWidth: '1px',
      borderRadius: '12px',
    },
  },
  smallInfoText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    textAlign: 'left',
    marginLeft: '12px',
    color: palette.text.secondary,
  },
  pastSwapsSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '18px 26px 0px',
    minHeight: '68px',
    borderTop: `1px solid ${palette.divider}`,
  },
  pastSwapsSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 16px 0px',
    minHeight: '68px',
    borderTop: `1px solid ${palette.divider}`,
  },
  swapDetailsText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
  },
  goBackContainer: {
    position: 'absolute',
    top: 32,
    left: 'calc(50% - 200px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  goBackContainerMobile: {
    position: 'absolute',
    top: 'calc(20vh + 40px)',
    left: 'calc(50% - 150px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  expandContainer: {
    display: 'flex', 
    alignItems: 'center', 
    padding: '8px 12px',
    borderRadius: '50%',
    marginLeft: '12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  exchangesTopSection: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '88px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  diabledSwitch: {
    width: '35px',
    height: '20px',
    backgroundColor: 'transpatent',
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,
    padding: '2px',
  },
  enabledSwitch: {
    width: '35px',
    height: '20px',
    backgroundColor: palette.primary.main,
    borderRadius: '12px',
    border: '1px solid transparent',
    padding: '2px',
  },
  modeItem: {
    border: `1px solid ${palette.background.paper}`,
    borderRadius: 10,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: palette.background.paper,
      border: `1px solid ${palette.divider}`,
    },
  },
  textSelected: {
    fontWeight: 700,
    fontSize: '14px',
    color: palette.primary.main,
  },
  textIdle: {
    fontWeight: 400,
    fontSize: '14px',
  },
  inactiveMode: {
    backgroundColor: 'transparent',
  },
  switchContainer: {
    width: '258px',
    height: '44px',
    padding:'5px',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
  }
}));

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const MySwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 44,
      height: 24,
      padding: 2,
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    switchBase: {
      width: 40,
      height: 20,
      border: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
      borderRadius: '12px',
      marginLeft: '2px',
      '&$checked': {
        marginTop: '1px',
        transform: 'translateX(16px)',
        color: 'white',
        border: 'none',
        backgroundColor: 'transparent',
        '& + $track': {
          border: `1px solid transparent`,
          transform: 'translateY(-1px)',
          marginLeft: '2px',
          width: 36,
          height: 20,
          borderRadius: '12px',
          backgroundColor: theme.palette.primary.main,
          opacity: 1,
        },
      },
      '&$focusVisible $thumb': {
        color: theme.palette.secondary.main,
      },
    },
    thumb: {
      width: 15,
      height: 15,
      transform: 'translateX(-8px)',
    },
    track: {
      height: '16px',
      width: 38,
      backgroundColor: theme.palette.background.paper,
      opacity: 1,
    },
    checked: {
      
    },
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const exchanges = [
  {
    name: 'Uniswap',
    enabled: false,
  },
  {
    name: 'UniswapV2',
    enabled: true,
  },
  {
    name: 'Eth2Dai',
    enabled: false,
  },
  {
    name: 'Kyber',
    enabled: true,
  },
  {
    name: 'Curve',
    enabled: false,
  },
  {
    name: 'LiquidityProvider',
    enabled: false,
  },
  {
    name: 'MultiBridge',
    enabled: false,
  },
];


export interface SwapModalProps {
  goBack: () => void;
}

interface enabledExchanges {
  [key: string]: boolean;
}

const SwapSettings: React.FC<SwapModalProps> = ({ goBack }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [slippage, setSlippage] = React.useState<string>('0.5');
  const [customSlippage, setCustomSlippage] = React.useState<string>('');
  const [minutes, setMinutes] = React.useState<string>('20');
  const [showExchanges, setShowExchanges] = React.useState(false);
  const [checkedState, setCheckedState] = React.useState<enabledExchanges>({
    Uniswap: false,
    UniswapV2: true,
    Eth2Dai: false,
    Kyber: true,
    Curve: false,
    LiquidityProvider: false,
    MultiBridge: false,
  });

  const LowSlippageButton = () => (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      className={slippage !== '0.1' ? classes.inactiveMode : classes.modeItem}
      width={!mobile ? '78px' : '78px'}
      height={!mobile ? '32px' : '32px'}
    >
      <Box display='flex' alignItems='center'>
        <Typography
          className={slippage === '0.1' ? classes.textSelected : classes.textIdle}
          color='textSecondary'
        >
          0.1%
        </Typography>
      </Box>
    </Box>
  );

  const MidSlippageButton = () => (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      className={slippage !== '0.5' ? classes.inactiveMode : classes.modeItem}
      width={!mobile ? '78px' : '78px'}
      height={!mobile ? '32px' : '32px'}
    >
      <Box display='flex' alignItems='center'>
        <Typography
          className={slippage === '0.5' ? classes.textSelected : classes.textIdle}
          color='textSecondary'
        >
          0.5%
        </Typography>
      </Box>
    </Box>
  );

  const HighSlippageButton = () => (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      className={slippage !== '1' ? classes.inactiveMode : classes.modeItem}
      width={!mobile ? '78px' : '78px'}
      height={!mobile ? '32px' : '32px'}
    >
      <Box display='flex' alignItems='center'>
        <Typography
          className={slippage === '1' ? classes.textSelected : classes.textIdle}
          color='textSecondary'
        >
          1%
        </Typography>
      </Box>
    </Box>
  );

  const hadleClickLowSlippage = () => {
    setSlippage('0.1');
  }

  const hadleClickMidSlippage = () => {
    setSlippage('0.5');
  }

  const hadleClickHighSlippage = () => {
    setSlippage('1');
  }

  const handleChangeCustomSlippage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numberValue = value.replace(/[^0-9.]/g, '');
    setCustomSlippage(numberValue);
  };

  const handleChangeMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numberValue = value.replace(/[^0-9.]/g, '');
    setMinutes(numberValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedState({ ...checkedState, [event.target.name]: event.target.checked });
  };

  const mappedExchanges = exchanges.map((item) => {
    return (
      <Box key={item.name} display="flex" alignItems="center" justifyContent="space-between" margin="12px 0">
        <Typography className={classes.elementHeader}>{item.name}</Typography>
        <MySwitch checked={checkedState[item.name]} onChange={handleChange} name={item.name} />
      </Box>
    )
  });

  return (
    <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
      <Box className={!mobile ? classes.mainCard : classes.mainCardMobile}>
        {!showExchanges ? (
          <>
            <Box className={!mobile ? classes.topSection : classes.topSectionMobile}>
              <Typography className={classes.title} style={{ marginBottom: '32px' }}>Swap settings</Typography>
              <Box display="flex" width="100%" alignItems="center" margin="4px 0">
                <Typography className={classes.elementHeader}>Slippage tolerance</Typography>
                <Tooltip title="Lorem ipsum text">
                  <InfoIcon style={{ marginLeft: '6px' }} />
                </Tooltip>
              </Box>
              <Box
                display="flex"
                flexDirection={!mobile ? 'row' : 'column'}
                height={!mobile ? '56px' : '104px'}
                alignItems={!mobile ? 'center' : 'flex-start'}
                width="100%"
                padding="7px 4px"
              >
                <Box className={classes.switchContainer}>
                  {!mobile ? (
                    <SwitchWithGlider 
                      elements={[LowSlippageButton, MidSlippageButton, HighSlippageButton]}
                      positions={[37, 120, 203]}
                      clickFuncs={[hadleClickLowSlippage, hadleClickMidSlippage, hadleClickHighSlippage]}
                      start={120}
                      gliderWidth={78}
                      gliderHeight={32}
                    />
                  ) : (
                    <SwitchWithGlider 
                      elements={[LowSlippageButton, MidSlippageButton, HighSlippageButton]}
                      positions={[30, 114, 198]}
                      clickFuncs={[hadleClickLowSlippage, hadleClickMidSlippage, hadleClickHighSlippage]}
                      start={114}
                      gliderWidth={78}
                      gliderHeight={32}
                    />
                  )}
                </Box>
                <Box
                  display="flex"
                  width={!mobile ? '116px' : '100%'}
                  margin={!mobile ? '0 0 0 auto' : '6px 0'}
                  // justifyContent="center"
                >
                  <input
                    value={customSlippage}
                    onChange={handleChangeCustomSlippage}
                    className={classes.borderedInput}
                    placeholder="Custom"
                  />
                  <PercentageIcon
                    style={!mobile ? 
                      { position: 'absolute', marginTop: '16px', right: 46}
                      : {position: 'absolute', marginTop: '16px', right: 96}
                    }
                  />
                </Box>
              </Box>
              <Box display="flex" width="100%" alignItems="center" margin="10px 0">
                <Typography className={classes.elementHeader}>Transaction deadline</Typography>
                <Tooltip title="Lorem ipsum text2">
                  <InfoIcon style={{ marginLeft: '6px' }} />
                </Tooltip>
              </Box>
              <Box display="flex" width="100%" alignItems="center">
                <Box width={!mobile ? '252px' : '260px'} padding={!mobile ? '7px 4px' : '7px 0' }>
                  <input
                    value={minutes}
                    onChange={handleChangeMinutes}
                    className={classes.borderedInput}
                  />
                </Box>
                <Typography
                  className={classes.smallInfoText}
                  style={!mobile ? {} : { margin: '4px 0px 4px 8px' }}
                >
                  Minutes
                </Typography>
              </Box>
            </Box>
            <Box className={!mobile ? classes.pastSwapsSection : classes.pastSwapsSectionMobile}>
              <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                <Typography className={classes.elementHeader}>Enabled Exchanges</Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography className={classes.swapDetailsText}>{'11'}</Typography>
                  <Box className={classes.expandContainer} onClick={() => setShowExchanges(true)}>
                    <Expand />
                  </Box>
                </Box> 
              </Box> 
            </Box>
          </>
        ) : (
          <>
            <Box className={classes.exchangesTopSection}>
              <Typography style={{ marginTop: '16px' }}className={classes.title}>Enabled Exchanges</Typography>
            </Box>
            <Box width="100%" padding="6px 30px">
              {mappedExchanges}
            </Box>
          </> 
        )}
      </Box>
      <Box
        id='back'
        className={
          !mobile ? classes.goBackContainer : classes.goBackContainerMobile
        }
        onClick={!showExchanges ? goBack : () => setShowExchanges(false)}
      >
        <BackIcon />
      </Box>
      <SettingsConfirmation
        open={parseFloat(customSlippage) > 1}
        onClose={() => setCustomSlippage('1')}
        agree={() => {}}
        disagree={() => setCustomSlippage('1')}
      />
    </Box>
  );
};

export default SwapSettings;
