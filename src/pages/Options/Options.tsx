import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  Popover,
  Link,
} from '@material-ui/core';
import { SearchTabs, BuyConfirmationModal } from 'components';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ReactComponent as WBTCIcon } from 'assets/svg/wBTCIcon.svg';
import { ReactComponent as UniIcon } from 'assets/svg/UniIcon.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import { ReactComponent as YFIIcon } from 'assets/svg/YFIIcon.svg';
import { ReactComponent as EthIcon } from 'assets/svg/EthIcon.svg';
import cx from 'classnames';
import OptionsFilter from './OptionsFilter';
import OptionsPrice from './OptionsPrice';
import { ReactComponent as HelpIcon } from 'assets/svg/HelpIcon.svg';
import { ReactComponent as PriceTriangle } from 'assets/svg/PriceTriangle.svg';
import { LineChart } from 'components';
import { useOptionType } from 'state/options/hooks';
import { useIsDarkMode } from 'state/user/hooks';

const useStyles = makeStyles(({ palette }) => ({
  title: {
    fontSize: '28px',
    lineHeight: '27.5px',
    fontWeight: 700,
    margin: '42px 0 0 20px',
  },
  price: {
    fontSize: 18,
  },
  priceIcon: {
    color: palette.success.dark,
  },
  helpIcon: {
    color: palette.text.secondary,
    fontSize: 16,
  },
  priceInfoBox: {
    padding: '16px 0',
    height: 340,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& p': {
      fontSize: 14,
      lineHeight: '24px',
    },
    '& h2': {
      fontSize: 18,
      fontWeight: 700,
      margin: '-7.5px 0',
    },
    '& $helpIcon': {
      marginLeft: 2,
    },
  },
  graphContainer: {
    '& p': {
      fontSize: 14,
      marginRight: 4,
    },
    '& h2': {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: -4,
    },
  },
  currentPricePercent: {
    marginLeft: 6,
    '& div': {
      background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: 4,
    },
    '& p': {
      fontSize: 14,
      fontWeight: 400,
      margin: '0 2px 0 4px',
    },
    '& svg': {
      marginBottom: -2,
      marginRight: 4,
    },
  },
  depositButton: {
    '& button': {
      margin: 0,
      '& span': {
        fontSize: 16,
        fontWeight: 700,
      },
    },
  },
  popover: {
    pointerEvents: 'none',
    '& p': {
      fontSize: 14,
      lineHeight: '16px',
      color: palette.text.primary,
      margin: 0,
    },
    '& a': {
      fontSize: 14,
      lineHeight: '18px',
      marginTop: 6,
      color: palette.primary.main,
    },
    '&.pool': {
      '& .MuiPopover-paper': {
        maxWidth: 375,
        marginLeft: -34,
        '&::before': {
          right: 'calc(100% - 40px)',
        },
      },
    },
    '& .MuiPopover-paper': {
      maxWidth: 349,
      marginLeft: 6,
      '&::before': {
        content: '""',
        position: 'absolute',
        marginRight: '-0.71em',
        bottom: 0,
        right: '50%',
        width: 16,
        height: 16,
        background: palette.background.paper,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
        transform: 'translate(-50%, 50%) rotate(135deg)',
        clipPath:
          'polygon(-8px -8px, calc(100% + 8px) -8px, calc(100% + 8px) calc(100% + 8px))',
      },
    },
  },
}));

const tabItems = [
  {
    image: WBTCIcon,
    label: 'wBTC',
  },
  {
    marginLeft: -2,
    image: UniIcon,
    label: 'Uni',
    highlight: true,
  },
  {
    image: LinkIcon,
    label: 'Link',
  },
  {
    image: YFIIcon,
    label: 'YFI',
    highlight: true,
  },
  {
    image: EthIcon,
    label: 'ETH',
  },
];

const Options: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [buyConfirmationModalOpen, setBuyConfirmationModalOpen] =
    useState(false);
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const [tokenIndex, setTokenIndex] = useState(2);
  const { optionType } = useOptionType();
  const darkMode = useIsDarkMode();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [popoverType, setPopoverType] = useState('');

  return (
    <>
      {buyConfirmationModalOpen && (
        <BuyConfirmationModal
          open={buyConfirmationModalOpen}
          onClose={() => setBuyConfirmationModalOpen(false)}
        />
      )}
      {!mobile && (
        <Typography
          component='h1'
          color='textPrimary'
          className={classes.title}
        >
          Options
        </Typography>
      )}
      <Box mt={2} mb={4} ml={!mobile ? '6px' : '0'}>
        <SearchTabs
          items={tabItems}
          value={tokenIndex}
          onChange={(ev, index) => {
            setTokenIndex(index);
          }}
        />
      </Box>

      <Popover
        className={cx(classes.popover, popoverType)}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: popoverType === 'pool' ? 'left' : 'center',
        }}
      >
        {popoverType === 'current' && (
          <Box px={1.5} pt={'11px'} pb={1.25}>
            <p>24h change</p>
          </Box>
        )}
        {popoverType === 'break' && (
          <Box pl={'17px'} pr={1} py={'14px'}>
            <p>
              This option can be exercised for a profit if the price of AAVE:{' '}
              <b>Exceeds 500 DAI by June 11, 2021</b>
            </p>
          </Box>
        )}
        {popoverType === 'pool' && (
          <Box pt={'23px'} pl={'18px'} pr={'13px'} pb={'19px'}>
            <p>
              <b>Premia pools</b> use state of the art liquidity-aware pricing
              models. When there is excess capital available, options become
              cheaper. When capital starts to dry up, price of options
              increases. The price level updates after every trade.{' '}
            </p>
            <Link>Read more</Link>
          </Box>
        )}
      </Popover>

      <Grid container style={!mobile ? { marginLeft: '6px' } : {}}>
        <Grid item container lg={9}>
          <Grid item xs={12} sm={6}>
            <Container fixed>
              <Box py={2} px={2}>
                <OptionsFilter />
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.priceInfoBox}>
            <Box pl={xs ? 1 : 3}>
              <Typography color='textSecondary'>Current price</Typography>
              <Box display='flex' alignItems='center' mt={-0.5625}>
                <Typography color='textPrimary' component='h2'>
                  $1,222
                </Typography>
                <Box
                  position='relative'
                  display='flex'
                  alignItems='center'
                  className={classes.currentPricePercent}
                  onMouseEnter={(event: any) => {
                    setPopoverType('current');
                    setAnchorEl(event.currentTarget);
                  }}
                  onMouseLeave={(event: any) => {
                    setAnchorEl(null);
                  }}
                >
                  <Box
                    width={1}
                    height={1}
                    style={{ opacity: darkMode ? 0.1 : 0.2 }}
                  ></Box>
                  <Typography color='textPrimary'>+13%</Typography>
                  <PriceTriangle className={classes.priceIcon} />
                </Box>
              </Box>
            </Box>
            <Box pl={xs ? 1 : 3}>
              <Grid container alignItems='center'>
                <Typography color='textSecondary'>Breakeven</Typography>
                <HelpIcon
                  className={classes.helpIcon}
                  onMouseEnter={(event) => {
                    setPopoverType('break');
                    setAnchorEl(event.currentTarget);
                  }}
                  onMouseLeave={() => {
                    setAnchorEl(null);
                  }}
                />
              </Grid>
              <Typography color='textPrimary' component='h2'>
                $1,749.37
              </Typography>
            </Box>
            <Box pl={xs ? 1 : 3}>
              <Typography color='textSecondary'>Total cost</Typography>
              <Typography color='textPrimary' component='h2'>
                $1,749.37
              </Typography>
            </Box>
            <Box pl={xs ? 0 : 3} className={classes.depositButton}>
              <Button
                fullWidth
                variant='contained'
                size='large'
                color={optionType === 'call' ? 'primary' : 'secondary'}
                onClick={() => setBuyConfirmationModalOpen(true)}
              >
                Deposit
              </Button>
            </Box>
          </Grid>
          {tablet && (
            <Grid item xs={12}>
              <Box mb={3}>
                <OptionsPrice />
              </Box>
              <Divider />
            </Grid>
          )}
          <Grid item xs={12}>
            <Box pt={3} px={tablet ? 0 : 3} className={classes.graphContainer}>
              <Typography color='textPrimary' component='h2'>
                Pool price level
              </Typography>
              <Grid container alignItems='center'>
                <Typography color='textSecondary'>Last 7 days</Typography>
                <HelpIcon
                  className={classes.helpIcon}
                  onMouseEnter={(event) => {
                    setPopoverType('pool');
                    setAnchorEl(event.currentTarget);
                  }}
                  onMouseLeave={() => {
                    setAnchorEl(null);
                  }}
                />
              </Grid>
              <LineChart
                color={optionType === 'call' ? '#14A887' : '#BF47C3'}
                data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
                categories={[
                  '2021/5/24',
                  '2021/5/25',
                  '2021/5/26',
                  '2021/5/27',
                  '2021/5/28',
                  '2021/5/29',
                  '2021/5/30',
                ]}
                width='100%'
                height={200}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid item container lg={3}>
          {!tablet && <OptionsPrice />}
        </Grid>
      </Grid>
    </>
  );
};

export default Options;
