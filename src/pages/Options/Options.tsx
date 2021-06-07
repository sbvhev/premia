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
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import cx from 'classnames';

import {
  useOptionType,
  useUnderlying,
  useUnderlyingPrice,
  useBreakEvenPrice,
} from 'state/options/hooks';
import { useIsDarkMode } from 'state/user/hooks';
import { OptionType } from 'web3/options';
import { tokenIcons } from 'constants/tokenIcons';

import OptionsFilter from './OptionsFilter';
import OptionsPrice from './OptionsPrice';
import { SearchTabs, BuyConfirmationModal, LineChart } from 'components';
import { ReactComponent as HelpIcon } from 'assets/svg/HelpIcon.svg';
import { ReactComponent as PriceTriangle } from 'assets/svg/PriceTriangle.svg';

const useStyles = makeStyles(({ palette }) => ({
  title: {
    fontSize: '28px',
    lineHeight: '27.5px',
    fontWeight: 700,
    margin: '20px 0 0 20px',
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
      cursor: 'pointer',
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
    image: tokenIcons.WBTC,
    label: 'wBTC',
    symbol: 'WBTC',
  },
  {
    marginLeft: -2,
    image: tokenIcons.UNI,
    label: 'Uni',
    symbol: 'UNI',
    highlight: true,
  },
  {
    image: tokenIcons.LINK,
    label: 'Link',
    symbol: 'LINK',
  },
  {
    image: tokenIcons.YFI,
    label: 'YFI',
    symbol: 'YFI',
    highlight: true,
  },
  {
    image: tokenIcons.WETH,
    label: 'ETH',
    symbol: 'WETH',
  },
];

const Options: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [popoverType, setPopoverType] = useState('');
  const [buyConfirmationModalOpen, setBuyConfirmationModalOpen] =
    useState(false);
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const darkMode = useIsDarkMode();
  const { optionType } = useOptionType();
  const { underlying, setUnderlying } = useUnderlying();
  const underlyingPrice = useUnderlyingPrice();
  const breakEvenPrice = useBreakEvenPrice();

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
          value={tabItems.findIndex(
            (item) => item.symbol === underlying.symbol,
          )}
          onChange={() => setUnderlying(underlying)}
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
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        {popoverType === 'current' && (
          <Box
            px={1.5}
            pt={'11px'}
            pb={1.25}
            onMouseLeave={() => {
              setAnchorEl(null);
            }}
          >
            <p>24h change</p>
          </Box>
        )}
        {popoverType === 'break' && (
          <Box
            pl={'17px'}
            pr={1}
            py={'14px'}
            onMouseLeave={() => {
              setAnchorEl(null);
            }}
          >
            <p>
              This option can be exercised for a profit if the price of AAVE:{' '}
              <b>Exceeds 500 DAI by June 11, 2021</b>
            </p>
          </Box>
        )}
        {popoverType === 'pool' && (
          <Box
            pt={'23px'}
            pl={'18px'}
            pr={'13px'}
            pb={'19px'}
            onMouseLeave={() => {
              setAnchorEl(null);
            }}
          >
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
                  ${underlyingPrice}
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
                />
              </Grid>
              <Typography color='textPrimary' component='h2'>
                ${breakEvenPrice}
              </Typography>
            </Box>
            <Box pl={xs ? 1 : 3}>
              <Typography color='textSecondary'>Total cost</Typography>
              <Typography color='textPrimary' component='h2'>
                ${breakEvenPrice}
              </Typography>
            </Box>
            <Box pl={xs ? 0 : 3} className={classes.depositButton}>
              <Button
                fullWidth
                variant='contained'
                size='large'
                color={optionType === OptionType.Call ? 'primary' : 'secondary'}
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
                />
              </Grid>
              <LineChart
                isCall={optionType === OptionType.Call}
                backgroundColor={theme.palette.background.default}
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
