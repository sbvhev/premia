import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import {
  Box,
  // Paper,
  // Toolbar,
  Typography,
  // Grid,
  // InputLabel,
  // Slider,
  Button,
  // ButtonGroup,
} from '@material-ui/core';
// import { useQuery } from 'react-apollo';
// import { DateRangePicker } from 'react-dates';
// import { RSV } from 'eth-permit/rpc';
// import { ERC2612PermitMessage, signERC2612Permit } from 'eth-permit/eth-permit';

import StakePremiaIcon from 'assets/images/stakePremia-icon.png';
import greyLogo from 'assets/svg/PremiaLogoSmallGrey.svg';

import theme from 'theme';

const useStyles = makeStyles(({ breakpoints }: Theme) => ({
  wrapper: {
    height: '620px',
    width: '384px',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundcolor: 'transparent',
  },
  borderedCard: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '384px',
    height: '545px',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    borderRadius: '12px',
  },
  lockImg: {
    position: 'relative',
    top: 82,
    left: 143,
    width: '99px',
    zIndex: 10,
  },
  titleBox: {
    marginTop: '98px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontWeight: 700,
    size: '18px',
  },
  secondaryTitle: {
    fontWeight: 700,
    size: '16px',
  },
  subTitle: {
    fontWeight: 400,
    size: '14px',
  },
  smallInfoText: {
    fontWeight: 500,
    size: '12px',
  },
  col: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  horizontalBox: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '12px',
    height: '225px',
    margin: '22px 0 4px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  borderedBox: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    padding: '0 13px',
  },
  elementHeader: {
    fontWeight: 500,
    size: '14px',
  },
  buttonLeft: {
    width: '48%',
  },
  buttonRight: {
    width: '52%',
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    height: '158px',
    marginTop: '18px',
  },
  progressBarAndTime: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  progressContainer: {
    display: 'flex',
    width: '145px',
    height: '5px',
    background: 'rgb(100,100,100, 0.4)',
    // opacity: '0.4',
    borderRadius: '5px',
    marginRight: '8px',
  },
  progressBar: {
    display: 'flex',
    height: '5px',
    background: '#FF9152',
    boxShadow: '0px 0px 11px rgba(255, 139, 63, 0.767701)',
    borderRadius: '5px',
  }

}));

// interface StakeState {
//   action: 'stake' | 'unstake';
//   lockupMonths: number;
//   amount: string;
//   // permit?: ERC2612PermitMessage & RSV;
//   permitDeadline?: number;
// }

const StakePremiaCard: React.FC = () => {
  const classes = useStyles();
  // const theme = useTheme();
  // const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const [state, setState] = useState<StakeState>({
  //   action: 'stake',
  //   lockupMonths: 1,
  //   amount: '0',
  // });

  return (
    <Box className={classes.wrapper}>
      <img
          src={StakePremiaIcon}
          alt='Lock premia'
          className={classes.lockImg}
        />
      <Box className={classes.borderedCard}>
        <Box className={classes.titleBox}>
          <Typography
            component='h2'
            color='textPrimary'
            // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
            className={classes.title}
          >
            Stake premia
          </Typography>
          <Typography
            component='p'
            color='textSecondary'
            // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
            className={classes.subTitle}
          >
            Earn platform fees
          </Typography>
        </Box>
        <Box className={classes.topSection}>
          <Box className={classes.col} style={{ margin: '0 5px' }}>
            {/* <Box className={classes.horizontalBox}>
              <Typography
                component='p'
                color='textPrimary'
                // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
                className={classes.elementHeader}
              >
                Lock period
              </Typography>
            </Box>
              <Box className={classes.borderedBox}>
                <Typography
                  component='p'
                  color='textSecondary'
                  // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
                  className={classes.subTitle}
                >
                  Select period
                </Typography>
                <img
                  src={calendarIcon}
                  alt='Pick a date'
                  // className={classes.lockImg}
                />
              </Box> */}
          </Box>

          <Box className={classes.col} style={{ margin: '0 5px' }}>
            <Box className={classes.horizontalBox} style={{ margin: '0 5px' }}>
              <Typography
                component='p'
                color='textPrimary'
                // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
                className={classes.elementHeader}
              >
                Stake quantity
              </Typography>
              <Typography
                component='p'
                color='textSecondary'
                // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
                className={classes.smallInfoText}
              >
                {'Max size available: 124,098'}
              </Typography>
            </Box>
              <Box className={classes.borderedBox}>
                <img
                  src={greyLogo}
                  alt='Select Amount'
                  // className={classes.lockImg}
                />
                <input value={'100'} onChange={() => {}} />
                <Button color="primary" variant="outlined">
                  MAX
                </Button>
              </Box>
          </Box>

          <Box className={classes.horizontalBox}>
            <Button color="primary" variant="contained" className={classes.buttonLeft}>
              Stake
            </Button>
            <Button color="secondary" variant="outlined" className={classes.buttonRight}>
              Unstake
            </Button>
          </Box>

        </Box>

        <Box className={classes.botSection}>

          <Box className={classes.horizontalBox}>
            <Typography
              component='h3'
              color='textPrimary'
              // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
              className={classes.secondaryTitle}
            >
              My stats
            </Typography>
          </Box>
          <Box className={classes.horizontalBox} style={{ alignItems: 'center' }}>
            <Typography
              component='p'
              color='textSecondary'
              // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
              className={classes.elementHeader}
            >
              xPremia Unlocked
            </Typography>
            {/* <Box className={classes.progressBarAndTime}>
              <Box className={classes.progressContainer}>
                <Box className={classes.progressBar} style={{ width: '75%' }} />
              </Box> */}
              <Typography
                component='p'
                color='textPrimary'
                // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
                className={classes.elementHeader}
              >
                {`1000`}
              </Typography>
            </Box>
          {/* </Box> */}
          <Box className={classes.horizontalBox}>
            <Typography
              component='p'
              color='textSecondary'
              // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
              className={classes.elementHeader}
            >
              xPremia Locked
            </Typography>
            <Typography
              component='p'
              color='textPrimary'
              // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
              className={classes.elementHeader}
            >
              {`100`}
            </Typography>
          </Box>
          <Box className={classes.horizontalBox}>
            <Typography
              component='p'
              color='textSecondary'
              // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
              className={classes.elementHeader}
            >
              Total xPremia
            </Typography>
            <Typography
              component='p'
              color='textPrimary'
              // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
              className={classes.elementHeader}
            >
              {`12`}
            </Typography>
          </Box>
          <Box className={classes.horizontalBox}>
            <Typography
              component='p'
              color='textSecondary'
              // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
              className={classes.elementHeader}
            >
              Underlying Premia
            </Typography>
            <Typography
              component='p'
              color='textPrimary'
              // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
              className={classes.elementHeader}
            >
              {`11`}
            </Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  )
};

export default StakePremiaCard;
