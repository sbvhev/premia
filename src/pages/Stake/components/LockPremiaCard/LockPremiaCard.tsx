import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

import lockPremiaIcon from 'assets/images/lockPremia-icon.png';
import calendarIcon from 'assets/svg/CalendarIcon.svg';
import greyLogo from 'assets/svg/PremiaLogoSmallGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: '610px',
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
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.default,
    borderRadius: '12px',
  },
  lockImg: {
    position: 'relative',
    top: 82,
    left: 143,
    width: '99px',
    height: '136px',
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
    fontSize: '18px',
    lineHeight: '18px',
  },
  secondaryTitle: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '18px',
    margin: '7px 0 9px',
  },
  subTitle: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
  },
  smallInfoText: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '24px',
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
    // justifyContent: 'space-between',
    justifyContent: 'flex-end',
    padding: '0 16px 12px',
    height: '230px',
    margin: '22px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  borderedBox: {
    boxSizing: 'border-box',
    height: '46px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    padding: '3px',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    }
  },
  inputAmount: {
    backgroundColor: palette.background.default,
    boxShadow: 'none',
    border: 'none',
    marginLeft: '8px',
    color: palette.text.primary,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    }
  },
  elementHeader: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
  },
  buttonLeft: {
    width: '48%',
    marginRight: '4px',
  },
  buttonRight: {
    width: '52%',
    marginLeft: '4px',
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    height: '158px',
    // marginTop: '18px',
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

// interface LockState {
//   action: 'stake' | 'unstake';
//   lockupMonths: number;
//   amount: string;
//   // permit?: ERC2612PermitMessage & RSV;
//   permitDeadline?: number;
// }

const LockPremiaCard: React.FC = () => {
  const classes = useStyles();
  // const theme = useTheme();
  // const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const [state, setState] = useState<LockState>({
  //   action: 'stake',
  //   lockupMonths: 1,
  //   amount: '0',
  // });

  return (
    <Box className={classes.wrapper}>
      <img
          src={lockPremiaIcon}
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
            Lock premia
          </Typography>
          <Typography
            component='p'
            color='textSecondary'
            // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
            className={classes.subTitle}
          >
            Reduce your transaction costs
          </Typography>
        </Box>
        <Box className={classes.topSection}>
          <Box className={classes.col}>
            <Box display="flex" style={{ margin: '0 8px 2px', justifyContent: 'flex-start' }}>
              <Typography
                component='p'
                color='textPrimary'
                className={classes.elementHeader}
              >
                Lock period
              </Typography>
            </Box>
              <Box className={classes.borderedBox}>
                <Typography
                  component='p'
                  color='textSecondary'
                  className={classes.subTitle}
                  style={{ marginLeft: '10px' }}
                >
                  Select period
                </Typography>
                <img
                  src={calendarIcon}
                  alt='Pick a date'
                  style={{ marginRight: '10px' }}
                />
              </Box>
          </Box>

          <Box className={classes.col}>
            <Box className={classes.horizontalBox} style={{ margin: '10px 8px 0', width: 'calc(100% - 16px)' }}>
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
                {'Max size available: 8,912'}
              </Typography>
            </Box>
              <Box className={classes.borderedBox}>
                <Box display="flex" alignItems="center">
                  <img
                    src={greyLogo}
                    alt='Select Amount'
                    style={{ marginLeft: '10px' }}
                  />
                  <input
                    value={'100'}
                    onChange={() => {}}
                    className={classes.inputAmount}
                  />
                </Box>
                <Button color="primary" variant="outlined" size="small" >
                  MAX
                </Button>
              </Box>
          </Box>

          <Box className={classes.horizontalBox} style={{ marginTop: '12px' }}>
            <Button color="secondary" variant="contained" size="large" className={classes.buttonLeft}>
              Stake
            </Button>
            <Button color="secondary" variant="outlined" size="large" className={classes.buttonRight}>
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
              Time till unlock
            </Typography>
            <Box className={classes.progressBarAndTime}>
              <Box className={classes.progressContainer}>
                <Box className={classes.progressBar} style={{ width: '75%' }} />
              </Box>
              <Typography
                component='p'
                color='textPrimary'
                // className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
                className={classes.elementHeader}
              >
                {`3m 25d`}
              </Typography>
            </Box>
          </Box>
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
              Fee Discount
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
              Lock Multiplier
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

export default LockPremiaCard;
