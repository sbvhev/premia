import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Popover,
  Link,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useQuery } from 'react-apollo';
import moment from 'moment';
import cx from 'classnames';

import {
  useOptionType,
  useUnderlyingPrice,
  useBreakEvenPrice,
  useTotalCostInUsd,
  useBase,
  useUnderlying,
  useMaturityDate,
  useSize,
  useSlippagePercentage,
} from 'state/options/hooks';
import { usePriceChanges, useWeb3 } from 'state/application/hooks';
import { useIsDarkMode } from 'state/user/hooks';
import { getCLevelChartItems } from 'graphql/queries';
import { useApproval, usePools } from 'hooks';
import { formatNumber, formatBigNumber } from 'utils/formatNumber';
import { OptionType } from 'web3/options';
import { CLevelChartItem } from 'web3/pools';

import OptionsFilter from './OptionsFilter';
import OptionsPrice from './OptionsPrice';
import SlippageModal from './SlippageModal';
import {
  SelectTokenTabs,
  BuyConfirmationModal,
  LineChart,
  ContainedButton,
  PositionOpenModal,
} from 'components';
import { ReactComponent as HelpIcon } from 'assets/svg/HelpIcon.svg';
import { ReactComponent as PriceTriangle } from 'assets/svg/PriceTriangle.svg';
import { ReactComponent as SettingsGear } from 'assets/svg/SettingsGear.svg';
import { formatUnits } from 'ethers/lib/utils';

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
    marginTop: (props: any) => (props.priceChange < 0 ? '-5px' : ''),
    transform: (props: any) => (props.priceChange < 0 ? 'rotate(180deg)' : ''),

    '& path': {
      fill: (props: any) =>
        props.priceChange < 0 ? palette.error.light : palette.success.dark,
    },
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
    '& h2': {
      fontSize: 18,
      fontWeight: 700,
      margin: '-7.5px 0',
    },
    '& $helpIcon': {
      marginLeft: 2,
    },
  },
  priceText: {
    fontSize: 14,
    lineHeight: '24px',
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
      background: (props: any) =>
        props.priceChange < 0
          ? `linear-gradient(121.21deg, ${palette.error.main} 7.78%, ${palette.error.light} 118.78%)`
          : `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
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
  costAndSlippageRow: {
    display: 'flex',
    justifyContent: 'space-between',
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

const Options: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [popoverType, setPopoverType] = useState('');
  const [positionModalOpen, setPositionModalOpen] = useState(false);
  const [slippageModalOpen, setSlippageModalOpen] = useState(false);
  const [buyConfirmationModalOpen, setBuyConfirmationModalOpen] =
    useState(false);
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const darkMode = useIsDarkMode();

  const { base } = useBase();
  const { underlying } = useUnderlying();
  const { size } = useSize();
  const { optionType } = useOptionType();
  const { maturityDate } = useMaturityDate();
  const { totalCostInUsd } = useTotalCostInUsd();
  const { account } = useWeb3();
  const { optionPool, optionPoolContract } = usePools();
  const { slippagePercentage } = useSlippagePercentage();

  const activeToken = useMemo(
    () => (optionType === OptionType.Call ? underlying : base),
    [optionType, base, underlying],
  );

  const { data: { clevelChartItems = [] } = {} } = useQuery(
    getCLevelChartItems,
    {
      pollInterval: 5000,
      skip: !optionPool,
      variables: { poolId: optionPool?.id },
    },
  );

  const priceChanges = usePriceChanges();
  const underlyingPrice = useUnderlyingPrice();
  const breakEvenPrice = useBreakEvenPrice();
  const { allowance, onApprove } = useApproval(
    activeToken.address,
    optionPoolContract?.address || account,
  );

  const handleBuyOption = useCallback(
    () => setBuyConfirmationModalOpen(true),
    [setBuyConfirmationModalOpen],
  );
  const priceChange = useMemo(
    () => priceChanges[underlying.symbol],
    [priceChanges, underlying],
  );
  const classes = useStyles({ priceChange });

  const totalAvailableInActiveToken = useMemo(
    () =>
      Number(
        formatUnits(optionPool?.totalAvailable ?? 0, underlying.decimals),
      ) / (optionType === OptionType.Call ? 1 : underlyingPrice),
    [optionPool, underlying, optionType, underlyingPrice],
  );

  const sufficientAllowance = useMemo(
    () => Number(allowance) > 0 && Number(allowance) >= totalCostInUsd,
    [allowance, totalCostInUsd],
  );
  const sufficientLiquidity = useMemo(
    () => totalAvailableInActiveToken >= size,
    [totalAvailableInActiveToken, size],
  );

  return (
    <>
      {buyConfirmationModalOpen && (
        <BuyConfirmationModal
          open={buyConfirmationModalOpen}
          onClose={() => setBuyConfirmationModalOpen(false)}
          onCompletePurchase={() => setPositionModalOpen(true)}
        />
      )}
      {positionModalOpen && (
        <PositionOpenModal
          open={positionModalOpen}
          onClose={() => setPositionModalOpen(false)}
        />
      )}
      {slippageModalOpen && (
        <SlippageModal
          open={slippageModalOpen}
          onClose={() => setSlippageModalOpen(false)}
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
        <SelectTokenTabs />
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
              This option can be exercised for a profit if the price of{' '}
              {underlying.symbol}:{' '}
              <b>
                {optionType === OptionType.Call ? 'Exceeds' : 'Goes below'}{' '}
                {formatNumber(breakEvenPrice)} {base.symbol} by{' '}
                {moment(new Date(maturityDate)).format('MMMM DD, YYYY')}
              </b>
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
        {popoverType === 'totalCost' && (
          <Box
            pl={'17px'}
            pr={1}
            py={'14px'}
            onMouseLeave={() => {
              setAnchorEl(null);
            }}
          >
            <p>Total costs lorem ipsum</p>
          </Box>
        )}
        {popoverType === 'slippage' && (
          <Box
            pl={'17px'}
            pr={1}
            py={'14px'}
            onMouseLeave={() => {
              setAnchorEl(null);
            }}
          >
            <p>
              The maximum price slippage you are willing to incur on a trade.
            </p>
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
              <Typography color='textSecondary' className={classes.priceText}>
                Current price
              </Typography>
              <Box display='flex' alignItems='center' mt={-0.5625}>
                <Typography color='textPrimary' component='h2'>
                  $
                  {formatNumber(underlyingPrice, true, {
                    maximumFractionDigits: 6,
                  })}
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
                  <Typography color='textPrimary' className={classes.priceText}>
                    {priceChange < 0 ? '' : '+'}
                    {formatNumber(priceChange)}%
                  </Typography>
                  <PriceTriangle className={classes.priceIcon} />
                </Box>
              </Box>
            </Box>
            <Box pl={xs ? 1 : 3}>
              <Grid container alignItems='center'>
                <Typography color='textSecondary' className={classes.priceText}>
                  Breakeven
                </Typography>
                <HelpIcon
                  className={classes.helpIcon}
                  onMouseEnter={(event) => {
                    setPopoverType('break');
                    setAnchorEl(event.currentTarget);
                  }}
                />
              </Grid>
              <Typography color='textPrimary' component='h2'>
                $
                {formatNumber(breakEvenPrice, true, {
                  maximumFractionDigits: 6,
                })}
              </Typography>
            </Box>
            <Box pl={xs ? 1 : 3} className={classes.costAndSlippageRow}>
              <Box>
                <Box display='flex' alignItems='center'>
                  <Typography
                    color='textSecondary'
                    className={classes.priceText}
                  >
                    Total cost
                  </Typography>
                  <HelpIcon
                    className={classes.helpIcon}
                    onMouseEnter={(event) => {
                      setPopoverType('totalCost');
                      setAnchorEl(event.currentTarget);
                    }}
                  />
                </Box>
                <Typography color='textPrimary' component='h2'>
                  $
                  {formatNumber(totalCostInUsd, true, {
                    maximumFractionDigits: 6,
                  })}
                </Typography>
              </Box>
              <Box marginRight='6px'>
                <Box display='flex' alignItems='center'>
                  <HelpIcon
                    className={classes.helpIcon}
                    onMouseEnter={(event) => {
                      setPopoverType('slippage');
                      setAnchorEl(event.currentTarget);
                    }}
                  />
                  <Typography
                    color='textSecondary'
                    className={classes.priceText}
                    style={{ marginLeft: '3px' }}
                  >
                    Slippage
                  </Typography>
                </Box>
                <Box
                  display='flex'
                  justifyContent='flex-end'
                  alignItems='center'
                >
                  <Typography
                    color='textPrimary'
                    component='h2'
                    style={{ lineHeight: '8px' }}
                  >
                    {`${slippagePercentage}%`}
                  </Typography>
                  <Box
                    display='flex'
                    alignItems='center'
                    padding='2px'
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => setSlippageModalOpen(true)}
                  >
                    <SettingsGear
                      style={{
                        height: '11px',
                        width: '10px',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box pl={xs ? 0 : 3} className={classes.depositButton}>
              <ContainedButton
                fullWidth
                size='large'
                color={optionType === OptionType.Call ? 'primary' : 'secondary'}
                label={
                  sufficientAllowance
                    ? sufficientLiquidity
                      ? 'Buy Option'
                      : 'Insufficient Liquidity'
                    : `Approve ${activeToken.symbol}`
                }
                onClick={() =>
                  sufficientAllowance ? handleBuyOption() : onApprove()
                }
              />
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
                data={clevelChartItems.map((item: CLevelChartItem) =>
                  formatBigNumber(item.cLevel),
                )}
                categories={clevelChartItems.map((item: CLevelChartItem) =>
                  moment
                    .unix(Number(item.timestamp))
                    .format('YYYY/MM/DD HH:mm'),
                )}
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
