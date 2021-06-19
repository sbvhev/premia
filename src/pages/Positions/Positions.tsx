import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Container,
  Divider,
  Typography,
  TableRow,
  TableCell,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { formatUnits, formatEther } from 'ethers/lib/utils';
import Moment from 'moment';
import cx from 'classnames';

import { useDarkModeManager } from 'state/user/hooks';
import { usePrices } from 'state/application/hooks';
import { formatBigNumber, formatNumber } from 'utils/formatNumber';
import { getTokenIcon } from 'utils/getTokenIcon';
import { UserOwnedPool } from 'web3/pools';
import { OptionType, UserOwnedOption } from 'web3/options';
import {
  useExerciseOption,
  useAllUserOwnedPools,
  useUserOwnedOptions,
  useDeviceWidth,
} from 'hooks';

import {
  DataTable,
  DonutChart,
  PositionCloseModal,
  SwitchWithGlider,
} from 'components';
import { ReactComponent as OptionsIcon } from 'assets/svg/OptionsIcon.svg';
import { ReactComponent as YieldIcon } from 'assets/svg/YieldIcon.svg';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';
import { ReactComponent as UpArrow } from 'assets/svg/UpArrow.svg';
import { ReactComponent as DownArrow } from 'assets/svg/DownArrow.svg';
import { ReactComponent as CallIcon } from 'assets/svg/CallIcon.svg';
import { ReactComponent as PutIcon } from 'assets/svg/PutIcon.svg';
import { ReactComponent as WarningIcon } from 'assets/svg/WarningIcon.svg';
import NoPositionYield from 'assets/images/NoPositionYield.png';
import NoPositionOptions from 'assets/images/NoPositionOptions.png';
import LargeCapitalIcon from 'assets/svg/LargeCapitalIcon.svg';
import LargeReturnIcon from 'assets/svg/LargeReturnIcon.svg';
import CapitalIcon from 'assets/svg/CapitalIcon.svg';
import ReturnIcon from 'assets/svg/ReturnIcon.svg';

const getYieldHeadCells = () => [
  {
    id: 'token',
    numeric: false,
    label: 'Token',
    sortKey: (yieldItem: any) => yieldItem?.symbol,
  },
  {
    id: 'capital',
    numeric: false,
    label: (
      <>
        Capital
        <DaiIcon />
      </>
    ),
    sortKey: (yieldItem: any) => yieldItem?.capital,
  },
  {
    id: 'typename',
    numeric: false,
    label: 'Type & Name',
    sortKey: (yieldItem: any) => yieldItem?.name,
  },
  {
    id: 'earned',
    numeric: false,
    label: (
      <>
        Earned
        <DaiIcon />
      </>
    ),
    sortKey: (yieldItem: any) => yieldItem?.earned,
  },
  {
    id: 'expectedapy',
    numeric: false,
    label: 'Current ROI',
    sortKey: (yieldItem: any) => yieldItem?.apy,
  },
  {
    id: 'action',
    numeric: true,
    label: '',
    sortDisabled: true,
    sortKey: () => 1,
  },
];

const getOptionsHeadCells = () => [
  {
    id: 'token',
    numeric: false,
    label: 'Token',
    sortKey: (yieldItem: any) => yieldItem?.symbol,
  },
  {
    id: 'size',
    numeric: false,
    label: 'Size',
    sortKey: (yieldItem: any) => yieldItem?.size,
  },
  {
    id: 'type',
    numeric: false,
    label: 'Type',
    sortKey: (yieldItem: any) => yieldItem?.type,
  },
  {
    id: 'strike',
    numeric: false,
    label: (
      <>
        Strike
        <DaiIcon />
      </>
    ),
    sortKey: (yieldItem: any) => yieldItem?.strike,
  },
  {
    id: 'currentvalue',
    numeric: false,
    label: (
      <>
        Current Value
        <DaiIcon />
      </>
    ),
    sortKey: (yieldItem: any) => yieldItem?.value,
  },
  {
    id: 'expiration',
    numeric: false,
    label: 'Expiration',
    sortKey: (yieldItem: any) => yieldItem?.expiration,
  },
  {
    id: 'action',
    numeric: true,
    buttonCell: true,
    label: '',
    // element: <SellAllButton />,   Disabled for now
    sortDisabled: true,
    sortKey: () => 1,
  },
];

// const SellAllButton: React.FC = () => {
//   return (
//     <Button variant='outlined' size='large'>
//       Exercise all
//     </Button>
//   );
// };

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  title: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: '18px',
    [breakpoints.down('xs')]: {
      lineHeight: 1,
    },
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginLeft: 16,
  },
  fullWidth: {
    width: '100%',
    maxWidth: 'unset',
  },
  yieldBox: {
    width: ({ smallWindowSize }: any) => (smallWindowSize ? 34 : 56),
    height: ({ smallWindowSize }: any) => (smallWindowSize ? 34 : 56),
    position: 'relative',
    '& div': {
      opacity: 0.2,
    },
    '& img': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  capital: {
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
  },
  return: {
    background: `linear-gradient(121.21deg, ${palette.error.main} 7.78%, ${palette.error.dark} 118.78%)`,
  },
  price: {
    fontSize: ({ smallWindowSize }: any) => (smallWindowSize ? 18 : 24),
    lineHeight: 1,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginLeft: 4,
      width: 16,
      height: 16,
    },
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
  },
  errorIcon: {
    position: 'absolute',
    top: 0,
    right: 8,
    width: '12px !important',
    '& path': {
      fill: `${palette.error.main} !important`,
    },
  },
  tableCellIcon: {
    marginRight: 4,
    marginBottom: -3,
    filter: 'grayScale(1)',
  },
  typeBox: {
    padding: '0 11px',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
    position: 'relative',
    width: 74,
    height: 32,
    '& div': {
      width: '100%',
      height: '100%',
      opacity: 0.1,
      position: 'absolute',
      borderRadius: 12,
      top: 0,
      left: 0,
    },
    '& svg': {
      width: 12,
      marginRight: 8,
    },
  },
  vault: {
    color: palette.primary.main,
    '& div': {
      background: palette.primary.main,
    },
  },
  call: {
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
    WebkitBackgroundClip: 'text',
    textFillColor: 'transparent',
    '& div': {
      background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
    },
  },
  put: {
    background: `linear-gradient(121.21deg, ${palette.error.main} 7.78%, ${palette.error.dark} 118.78%)`,
    WebkitBackgroundClip: 'text',
    textFillColor: 'transparent',
    '& div': {
      background: `linear-gradient(121.21deg, ${palette.error.main} 7.78%, ${palette.error.dark} 118.78%)`,
    },
  },
  expirationCell: {
    lineHeight: 1,
    '& p': {
      fontSize: 14,
      lineHeight: 1,
      marginTop: 2,
    },
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: '0 10px',
    color: palette.text.primary,
    '& p': {
      fontSize: 14,
    },
    '& svg': {
      width: 16,
      height: 16,
      marginLeft: 4,
      '& path': {
        fill: palette.text.secondary,
      },
    },
  },
  noPositionsContainer: {
    maxWidth: 790,
    margin: '70px auto',
    '& h2': {
      fontSize: 18,
      lineHeight: 1,
      fontWeight: 'bold',
    },
    [breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 395px)',
    },
    [breakpoints.down('xs')]: {
      minHeight: 'calc(100vh - 430px)',
    },
  },
  findPositionContainer: {
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
    boxShadow: `0px 0px 25px rgba(43, 229, 154, 0.25)`,
    borderRadius: 10,
    padding: 18,
    margin: '20px 0',
    justifyContent: 'space-between',
    '& h2': {
      textAlign: 'center',
      color: ({ darkMode }: any) => (darkMode ? 'black' : 'white'),
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      '& h2': {
        marginBottom: 16,
      },
    },
  },
  noPositionBox: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '26px 0',
    '& a': {
      textDecoration: 'none',
    },
  },
  noPositionBtnContainer: {
    marginTop: 20,
    '& h2': {
      marginBottom: 18,
    },
    '& a': {
      textDecoration: 'none',
    },
    '& button': {
      width: 181,
      height: 45,
      fontSize: 16,
      margin: 0,
    },
  },
  positionFilterContainer: {
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    margin: '34px 0 20px',
    '& .MuiBottomNavigation-root': {
      padding: 6,
      '&:nth-child(2)': {
        minWidth: 300,
        [breakpoints.down('xs')]: {
          marginTop: 12,
        },
      },
      '& button': {
        padding: '6px 0',
        margin: 0,
        '& svg': {
          marginRight: 7,
        },
      },
    },
  },
  expiredIcon: {
    background: 'linear-gradient(266.96deg, #EB7A4A 29.5%, #F643CF 117.72%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    '& p': {
      fontSize: 8,
      color: palette.common.black,
    },
  },
  findPositionButton: {
    width: 169,
    height: 45,
    margin: 0,
    fontSize: 14,
    background: palette.background.paper,
    border: '1px solid transparent',
    color: palette.text.primary,

    '&:hover:not(:active)': {
      background: palette.background.paper,
      opacity: 0.8,
    },

    '&:active': {
      background: palette.background.paper,
      opacity: 0.8,
    },

    '& svg': {
      opacity: 0.5,
      fill: palette.text.primary,
    },
  },
  infoHeading: {
    height: 53,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    '@media (max-width: 500px)': {
      height: 'auto',
      padding: '10px 0',
      '& > div': {
        width: '100%',
      },
    },
  },
  plInfoContainer: {
    display: 'flex',
    justifyContent: 'space-around',

    '@media (max-width: 500px)': {
      marginLeft: 12,
      marginTop: 8,
      '& > div:last-child': {
        marginRight: 0,
        marginLeft: 10,
      },
    },
    '& svg': {
      '& path': {
        fill: palette.text.secondary,
      },
    },
  },
  profitLossSection: {
    height: '100%',
    width: '100%',
  },
  borderedPlTitle: {
    width: '100%',
    borderBottom: `1px solid ${palette.divider}`,
    padding: '18px',
    marginBottom: '18px',
    marginLeft: '0px',
  },
  tableHeading: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    [breakpoints.down('xs')]: {
      height: 'auto',
    },
    '& .MuiBottomNavigation-root': {
      minWidth: 227,
      padding: '7px 7px 6px',
      '& button': {
        margin: 0,
        padding: '6px 8px',
      },
    },
  },
  tableContainer: {
    '& .MuiTableContainer-root': {
      overflow: 'unset',
    },
    '& thead': {
      height: 53,
    },
    '& tbody tr': {
      height: 57,
    },
    '& thead tr th, & tbody tr td': {
      fontSize: 14,
      borderBottom: `1px solid ${palette.divider}`,
      '&.buttonCell': {
        width: 110,
        padding: '6px 10px 6px 0',
        '& button': {
          padding: 0,
          margin: 0,
          width: '100%',
          height: 40,
          fontSize: 14,
          fontWeight: 700,
        },
      },
      '&.yieldButtonCell': {
        padding: '6px 3px 6px 0',
        width: 187,
        '& button': {
          width: 85,
          margin: 0,
          '&:first-child': {
            marginRight: 7,
          },
          '&.MuiButton-outlined': {
            color: palette.text.secondary,
          },
        },
        '@media (max-width: 1048px)': {
          width: 140,
          '& button': {
            width: 64,
            margin: 0,
            '&:first-child': {
              marginRight: 4,
            },
            '&.MuiButton-outlined': {
              color: palette.text.secondary,
            },
          },
        },
      },
    },
    '& thead tr th': {
      padding: '7px 6px',
      cursor: 'pointer',
      '&:first-child': {
        padding: '7px 0px 7px 23px',
        [breakpoints.down('sm')]: {
          padding: '7px 6px 7px 13px',
        },
      },
      '&.buttonCell': {
        '& button': {
          color: palette.text.secondary,
        },
      },
    },
    '& tbody tr td': {
      padding: '6px',
      '&:first-child': {
        padding: '6px 0px 6px 15px',
        [breakpoints.down('sm')]: {
          padding: '6px',
        },
      },
      '&.buttonCell': {
        '& button': {
          color: palette.common.white,

          '&:hover': {
            color: palette.primary.main,
          },
        },
      },
    },
  },
  tokenIconCell: {
    display: 'flex',
    alignItems: 'flex-end',
    lineHeight: 1.3,
    '& > div': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: 8,
      [breakpoints.up('sm')]: {
        width: 21,
      },
    },
    '& svg': {
      '& path': {
        fill: palette.secondary.main,
      },
    },
  },
  exercisedCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& p': {
      fontSize: 14,
      lineHeight: 1.2,
      width: 'calc(100% - 25px)',
      background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
      WebkitBackgroundClip: 'text',
      textFillColor: 'transparent',
    },
    '& > div': {
      width: 18,
      height: 18,
      background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
      boxShadow: '0px 0px 25px rgba(43, 229, 154, 0.25)',
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#D4E1F4',
      '& svg': {
        width: 12,
        fill: palette.background.paper,
      },
    },
  },
  noPositionImage: {
    width: 92,
    height: 92,
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    '& img': {
      width: '100%',
    },
  },
  plPercents: {
    display: 'flex',
    flexDirection: 'column',
    margin: '9px 12px 18px 16px',
    '& p': {
      fontSize: 11,
      height: 24,
      marginTop: 2,
      display: 'flex',
      alignItems: 'center',
      color: palette.text.secondary,
    },
  },
  yieldButtonCell: {
    marginTop: 12,
    marginBottom: 10,
    padding: '0 10px',
    '& .MuiButton-outlined': {
      border: `1px solid ${palette.divider}`,
      color: palette.text.secondary,
    },
  },
  boundLine: {
    width: '100%',
    height: 1,
    background: palette.divider,
    position: 'absolute',
    left: 0,
    zIndex: 3,
  },
  switchContainer: {
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.paper,
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    borderRadius: '12px',
    height: '56px',
    padding: '6px',
  },
  switchContainerMobile: {
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.paper,
    justifyContent: 'space-evenly',
    borderRadius: '12px',
    display: 'flex',
    width: '100%',
    height: '43px',
    padding: '5px',
  },
  inactiveSwitch: {
    cursor: 'pointer',
    '& svg': {
      marginRight: 7,
    },
    '& svg path': {
      fill: palette.secondary.main,
    },
    '& .MuiTypography-root': {
      fontWeight: 400,
      lineHeight: '14px',
      fontSize: '14px',
      color: palette.secondary.main,
    },
    '&:hover': {
      '& svg path': {
        fill: palette.text.primary,
      },
      '& .MuiTypography-root': {
        fontWeight: 400,
        fontSize: '14px',
        color: palette.text.primary,
      },
    },
  },
  activeSwitch: {
    cursor: 'default',
    '& svg path': {
      fill: palette.primary.main,
    },
    '& .MuiTypography-root': {
      color: palette.primary.main,
      fontWeight: 700,
    },
    '&:hover': {
      '& svg path': {
        fill: palette.primary.main,
      },
      '& .MuiTypography-root': {
        color: palette.primary.main,
        fontWeight: 700,
      },
    },
  },
}));

const Positions: React.FC = () => {
  const [darkMode] = useDarkModeManager();
  const theme = useTheme();
  const mobileWindowSize = useMediaQuery(theme.breakpoints.down('xs'));
  const smallWindowSize = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ darkMode, smallWindowSize });

  const [positionFilterIndex, setPositionFilterIndex] = useState(0);
  const [optionFilterIndex, setOptionFilterIndex] = useState(0);
  const [positionModalOpen, setPositionModalOpen] = useState(false);
  const [activeExerciseOption, setActiveExerciseOption] =
    useState<UserOwnedOption | null>(null);
  const deviceWidth = useDeviceWidth();

  const options = useUserOwnedOptions();
  const pools = useAllUserOwnedPools();
  const tokenPrices = usePrices();
  const onExercise = useExerciseOption(() => setPositionModalOpen(true));

  const yieldHeadCells = useMemo(() => getYieldHeadCells(), []);
  const optionsHeadCells = useMemo(() => getOptionsHeadCells(), []);
  const noPositions = useMemo(
    () => (positionFilterIndex === 0 ? options.length < 1 : pools.length < 1),
    [positionFilterIndex, options, pools],
  );
  const currentTime = useMemo(
    () => Math.floor(new Date().getTime() / 1000),
    [],
  );

  const filteredOptions = useMemo(
    () =>
      options.filter(({ option }) =>
        optionFilterIndex
          ? Number(formatEther(option.maturity)) > currentTime
          : Number(formatEther(option.maturity)) <= currentTime,
      ),
    [options, optionFilterIndex, currentTime],
  );

  const handleFilterOptions = () => {
    setPositionFilterIndex(0);
  };

  const handleFilterYield = () => {
    setPositionFilterIndex(1);
  };

  const handleFilterCurrentOptions = () => {
    setOptionFilterIndex(0);
  };

  const handleFilterExpiredOptions = () => {
    setOptionFilterIndex(1);
  };

  const handleExercise = (option: UserOwnedOption) => {
    setActiveExerciseOption(option);
    onExercise(option);
  };

  const OptionsSwitch = () => (
    <Box
      display='flex'
      alignItems='center'
      padding='0 10px'
      justifyContent='center'
      className={cx(
        classes.inactiveSwitch,
        positionFilterIndex === 0 && classes.activeSwitch,
      )}
      width={mobileWindowSize ? '50%' : '104px'}
      height={mobileWindowSize ? '31px' : '42px'}
      onClick={handleFilterOptions}
    >
      <OptionsIcon />
      <Typography>Options</Typography>
    </Box>
  );

  const YieldSwitch = () => (
    <Box
      display='flex'
      width={mobileWindowSize ? '50%' : '104px'}
      height={mobileWindowSize ? '31px' : '42px'}
      alignItems='center'
      padding='0 20px'
      justifyContent='center'
      className={cx(
        classes.inactiveSwitch,
        positionFilterIndex === 1 && classes.activeSwitch,
      )}
      onClick={handleFilterYield}
    >
      <YieldIcon />
      <Typography style={{ marginTop: '3px' }}>Yield</Typography>
    </Box>
  );

  const CurrentOptionsSwitch = () => (
    <Box
      display='flex'
      alignItems='center'
      padding='0 12px'
      justifyContent='center'
      width={mobileWindowSize ? '50%' : '102px'}
      height={mobileWindowSize ? '31px' : '42px'}
      className={cx(
        classes.inactiveSwitch,
        optionFilterIndex === 0 && classes.activeSwitch,
      )}
      onClick={handleFilterCurrentOptions}
    >
      <WatchLaterIcon />
      <Typography>Current</Typography>
    </Box>
  );

  const ExpiredOptionsSwitch = () => {
    // const iconWaringMobileShift = deviceWidth / 4 + 23;
    return (
      <Box
        width={mobileWindowSize ? '50%' : 'auto'}
        height={mobileWindowSize ? '100%' : 'auto'}
      >
        {/* <Box
          className={classes.expiredIcon}
          style={
            !mobileWindowSize
              ? {
                  transform: `translate(86px, 4px)`,
                }
              : {
                  transform: `translate(${iconWaringMobileShift}px, 2px)`,
                }
          }
        >
          <p>{1}</p>
        </Box> Hidden until feature complete */}
        <Box
          display='flex'
          alignItems='center'
          padding='0 10px'
          justifyContent='center'
          width={mobileWindowSize ? '100%' : '102px'}
          height={mobileWindowSize ? '100%' : '42px'}
          className={cx(
            classes.inactiveSwitch,
            optionFilterIndex === 1 && classes.activeSwitch,
          )}
          onClick={handleFilterExpiredOptions}
        >
          <WarningIcon />
          <Typography style={{ marginTop: '2px' }}>Expired</Typography>
        </Box>
      </Box>
    );
  };

  const totalOptionAllocation = useMemo(() => {
    return options.reduce((total, userOwned) => {
      return (
        total +
        (Number(
          formatUnits(userOwned.size, userOwned.option.underlying.decimals),
        ) -
          Number(
            formatUnits(
              userOwned.totalExercised,
              userOwned.option.underlying.decimals,
            ),
          )) *
          tokenPrices[userOwned.option.underlying.symbol]
      );
    }, 0);
  }, [options, tokenPrices]);

  const optionAllocationPerAsset = useMemo(() => {
    return options.reduce((allocations: any, userOwned) => {
      const category = `${userOwned.option.underlying.symbol} ${userOwned.option.optionType}`;
      let allocation = allocations.find(
        (allocation: any) => allocation.category === category,
      );

      if (!allocation) {
        allocation = { category, value: 0, total: 0 };
        allocations.push(allocation);
      }

      allocation.total += Number(
        formatUnits(userOwned.size, userOwned.option.underlying.decimals),
      );
      allocation.value =
        ((allocation.total * tokenPrices[userOwned.option.underlying.symbol]) /
          totalOptionAllocation) *
        100;

      return allocations;
    }, []);
  }, [options, tokenPrices, totalOptionAllocation]);

  const totalYieldAllocation = useMemo(() => {
    return pools.reduce((total, userOwned) => {
      const tokenSymbol =
        userOwned.optionType === OptionType.Call
          ? userOwned.underlying.symbol
          : userOwned.base.symbol;
      return (
        total +
        Number(formatUnits(userOwned.size, userOwned.underlying.decimals)) *
          tokenPrices[tokenSymbol]
      );
    }, 0);
  }, [pools, tokenPrices]);

  const yieldAllocationPerAsset = useMemo(() => {
    return pools.reduce((allocations: any, userOwned) => {
      const tokenSymbol =
        userOwned.optionType === OptionType.Call
          ? userOwned.underlying.symbol
          : userOwned.base.symbol;
      const category = tokenSymbol;
      let allocation = allocations.find(
        (allocation: any) => allocation.category === category,
      );

      if (!allocation) {
        allocation = { category, value: 0, total: 0 };
        allocations.push(allocation);
      }

      allocation.total += Number(
        formatUnits(userOwned.size, userOwned.underlying.decimals),
      );
      allocation.value =
        ((allocation.total * tokenPrices[tokenSymbol]) / totalYieldAllocation) *
        100;

      return allocations;
    }, []);
  }, [pools, tokenPrices, totalYieldAllocation]);

  const yieldAverageReturn = useMemo(() => {
    return pools.reduce((total, userOwned, i) => {
      return (
        total +
        Number(
          formatNumber(
            (Number(userOwned.totalPremiumsEarned) /
              Number(userOwned.totalDeposited)) *
              100,
          ),
        ) /
          (i + 1)
      );
    }, 0);
  }, [pools]);

  return (
    <>
      {activeExerciseOption && (
        <PositionCloseModal
          open={positionModalOpen}
          option={activeExerciseOption}
          onClose={() => {
            setActiveExerciseOption(null);
            setPositionModalOpen(false);
          }}
        />
      )}
      <Typography
        component='h1'
        color='textPrimary'
        className={classes.title}
        style={!mobileWindowSize ? { margin: '25px 0 0 20px' } : {}}
      >
        My dashboard
      </Typography>
      <Grid
        container
        className={classes.positionFilterContainer}
        style={
          !mobileWindowSize ? { paddingLeft: '6px' } : { margin: '18px 0 12px' }
        }
      >
        <Box
          className={
            !mobileWindowSize
              ? classes.switchContainer
              : classes.switchContainerMobile
          }
          width={!mobileWindowSize ? '224px' : '100%'}
          style={
            darkMode
              ? {}
              : {
                  borderColor: 'transparent',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
                }
          }
        >
          {!mobileWindowSize ? (
            <SwitchWithGlider
              elements={[OptionsSwitch, YieldSwitch]}
              defaultIndex={positionFilterIndex}
              marginBetweenSwitches={1}
              gliderWidth={104}
              gliderHeight={42}
            />
          ) : (
            <SwitchWithGlider
              elements={[OptionsSwitch, YieldSwitch]}
              defaultIndex={positionFilterIndex}
              marginBetweenSwitches={-2}
              gliderWidth={(deviceWidth - 50) / 2}
              gliderHeight={31}
            />
          )}
        </Box>
      </Grid>
      {!noPositions && (
        <Box mb={2.5} ml={!mobileWindowSize ? '6px' : ''}>
          <Grid
            container
            spacing={2}
            wrap={smallWindowSize ? 'wrap' : 'nowrap'}
          >
            <Grid item xs={12} sm={12} md={12}>
              {smallWindowSize ? (
                <Container fixed className={classes.fullWidth}>
                  <Box className={classes.infoHeading}>
                    <Box>
                      <Typography className={classes.mainTitle}>
                        My P&L
                      </Typography>
                    </Box>
                    <Box className={classes.plInfoContainer}>
                      <Box display='flex' alignItems='center'>
                        <Box className={classes.yieldBox}>
                          <Box
                            width={1}
                            height={1}
                            borderRadius={7}
                            className={classes.capital}
                          />
                          <img src={CapitalIcon} alt='Capital Active' />
                        </Box>
                        <Box ml={1}>
                          <Typography
                            color='textSecondary'
                            className={classes.subtitle}
                          >
                            Capital in{' '}
                            {positionFilterIndex === 0 ? 'options' : 'pools'}
                          </Typography>
                          <Typography
                            color='textPrimary'
                            component='h2'
                            className={classes.price}
                          >
                            {formatNumber(
                              positionFilterIndex === 0
                                ? totalOptionAllocation
                                : totalYieldAllocation,
                            )}
                            <DaiIcon />
                          </Typography>
                        </Box>
                      </Box>
                      <Box mx={2.5} display='flex' alignItems='center'>
                        <Box className={classes.yieldBox}>
                          <Box
                            width={1}
                            height={1}
                            borderRadius={7}
                            className={classes.return}
                          />
                          <img src={ReturnIcon} alt='Current Return' />
                        </Box>
                        <Box ml={1}>
                          <Typography
                            color='textSecondary'
                            className={classes.subtitle}
                          >
                            Average return
                          </Typography>
                          <Typography
                            color='textPrimary'
                            component='h2'
                            className={classes.price}
                          >
                            {formatNumber(yieldAverageReturn)}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              ) : (
                <Container fixed className={classes.profitLossSection}>
                  <Typography
                    className={cx(classes.mainTitle, classes.borderedPlTitle)}
                  >
                    My P&L
                  </Typography>

                  <Box
                    width={1}
                    padding={4}
                    className={classes.plInfoContainer}
                  >
                    <Box
                      display='flex'
                      flexDirection='column'
                      alignItems='center'
                    >
                      <Box className={classes.yieldBox}>
                        <Box
                          width={1}
                          height={1}
                          borderRadius={7}
                          className={classes.capital}
                        />
                        <img src={LargeCapitalIcon} alt='Capital Active' />
                      </Box>
                      <Box
                        mt={1}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                      >
                        <Typography
                          color='textSecondary'
                          className={classes.subtitle}
                        >
                          Capital in{' '}
                          {positionFilterIndex === 0 ? 'options' : 'pools'}
                        </Typography>
                        <Typography
                          color='textPrimary'
                          component='h2'
                          className={classes.price}
                        >
                          {formatNumber(
                            positionFilterIndex === 0
                              ? totalOptionAllocation
                              : totalYieldAllocation,
                          )}
                          <DaiIcon />
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      mx={2.5}
                      display='flex'
                      flexDirection='column'
                      alignItems='center'
                    >
                      <Box className={classes.yieldBox}>
                        <Box
                          width={1}
                          height={1}
                          borderRadius={7}
                          className={classes.return}
                        />
                        <img src={LargeReturnIcon} alt='Current Return' />
                      </Box>
                      <Box
                        mt={1}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                      >
                        <Typography
                          color='textSecondary'
                          className={classes.subtitle}
                        >
                          Average return
                        </Typography>
                        <Typography
                          color='textPrimary'
                          component='h2'
                          className={classes.price}
                        >
                          {formatNumber(yieldAverageReturn)}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              )}
            </Grid>
            <Grid item container sm={12} md={12}>
              <Container fixed className={classes.fullWidth}>
                <Grid container direction='column' style={{ height: '100%' }}>
                  <Box className={classes.infoHeading}>
                    <Typography className={classes.mainTitle}>
                      Asset allocation
                    </Typography>
                  </Box>
                  <Divider />
                  <Box
                    display='flex'
                    flex={1}
                    width={1}
                    height={1}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <DonutChart
                      data={
                        positionFilterIndex === 0
                          ? optionAllocationPerAsset
                          : yieldAllocationPerAsset
                      }
                      colors={['#4D9EF2', '#EB4A97']}
                      endColors={['#2DDEA0', '#A745DD']}
                      rotations={[21.21, 116.57]}
                      content={
                        positionFilterIndex === 0 ? 'My options' : 'My assets'
                      }
                    />
                  </Box>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Box>
      )}
      {noPositions ? (
        <Box className={classes.noPositionsContainer}>
          <Box mt={mobileWindowSize ? 3 : 5}>
            {positionFilterIndex === 0 && (
              <Box textAlign='center'>
                <Box className={classes.noPositionImage}>
                  <img src={NoPositionOptions} alt='No Options' />
                </Box>
                <Box className={classes.noPositionBtnContainer}>
                  <Typography component='h2'>
                    No active options positions
                  </Typography>
                  <Link to='/options'>
                    <Button color='primary'>Buy options</Button>
                  </Link>
                </Box>
              </Box>
            )}
            {positionFilterIndex === 1 && (
              <Box textAlign='center'>
                <Box className={classes.noPositionImage}>
                  <img src={NoPositionYield} alt='No Yield' />
                </Box>
                <Box className={classes.noPositionBtnContainer}>
                  <Typography component='h2'>
                    No active yield positions
                  </Typography>
                  <Link to='/vaults?tab=pro'>
                    <Button color='primary'>Earn yield</Button>
                  </Link>
                </Box>
              </Box>
            )}
          </Box>
          {/* Hide until Position Guide completed <Grid
            container
            alignItems='center'
            className={classes.findPositionContainer}
          >
            <Typography component='h2'>
              Help me find my first position
            </Typography>
            <Button
              className={classes.findPositionButton}
              endIcon={<CallMadeIcon />}
            >
              Position Guide
            </Button>
          </Grid> */}
        </Box>
      ) : (
        <>
          {positionFilterIndex === 0 && (
            <Box
              className={classes.tableContainer}
              ml={!mobileWindowSize ? '6px' : ''}
            >
              <Grid
                container
                className={classes.tableHeading}
                alignItems='center'
                justify='space-between'
              >
                <Box mt={1.25}>
                  <Typography
                    component='h1'
                    color='textPrimary'
                    className={classes.mainTitle}
                  >
                    My option positions
                  </Typography>
                </Box>
                <Box
                  mt={mobileWindowSize ? 2 : 0}
                  width={mobileWindowSize ? 1 : 'auto'}
                >
                  <Box
                    className={
                      !mobileWindowSize
                        ? classes.switchContainer
                        : classes.switchContainerMobile
                    }
                    width={!mobileWindowSize ? '224px' : '100%'}
                    style={
                      darkMode
                        ? {}
                        : {
                            borderColor: 'transparent',
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
                          }
                    }
                  >
                    {!mobileWindowSize ? (
                      <SwitchWithGlider
                        elements={[CurrentOptionsSwitch, ExpiredOptionsSwitch]}
                        defaultIndex={optionFilterIndex}
                        marginBetweenSwitches={1}
                        gliderWidth={104}
                        gliderHeight={42}
                      />
                    ) : (
                      <SwitchWithGlider
                        elements={[CurrentOptionsSwitch, ExpiredOptionsSwitch]}
                        defaultIndex={optionFilterIndex}
                        marginBetweenSwitches={-2}
                        gliderWidth={(deviceWidth - 50) / 2}
                        gliderHeight={31}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Box mt={mobileWindowSize ? 1.5 : 2.5}>
                {mobileWindowSize ? (
                  <>
                    {filteredOptions.map((userOwnedOption) => {
                      const { option } = userOwnedOption;
                      const isCall = option.optionType === OptionType.Call;
                      const tokenSymbol = isCall
                        ? option.underlying.symbol
                        : option.base.symbol;
                      const TokenIcon = getTokenIcon(tokenSymbol);
                      const UnderlyingIcon = getTokenIcon(
                        option.underlying.symbol,
                      );
                      const expiration = Moment(
                        new Date(Number(option.maturity) * 1000),
                      );
                      const price = tokenPrices[option.underlying.symbol];
                      const perOptionValue = Math.max(
                        0,
                        isCall
                          ? price - Number(formatEther(option.strike))
                          : Number(formatEther(option.strike)) - price,
                      );
                      const isExercised =
                        Number(formatEther(userOwnedOption.totalExercised)) -
                          Number(formatEther(userOwnedOption.size)) >=
                        0;

                      return (
                        <Box mb={2}>
                          <Container fixed>
                            <Box
                              width={1}
                              display='flex'
                              p={1.25}
                              pl={1}
                              justifyContent='space-between'
                              alignItems='center'
                            >
                              <Box className={classes.tokenIconCell}>
                                <Box>
                                  <UnderlyingIcon height={20} width={20} />
                                </Box>
                                {option.underlying.symbol}
                              </Box>
                              <Box
                                className={cx(
                                  classes.typeBox,
                                  isCall ? classes.call : classes.put,
                                )}
                              >
                                <Box />
                                {isCall ? <CallIcon /> : <PutIcon />}
                                {option.optionType}
                              </Box>
                            </Box>
                            <Divider />
                            <Box className={classes.cardRow}>
                              <Box display='flex' alignItems='center'>
                                <Typography color='textSecondary'>
                                  Size
                                </Typography>
                                <TokenIcon height={20} width={20} />
                              </Box>
                              {formatBigNumber(userOwnedOption.size)}
                            </Box>
                            <Box className={classes.cardRow}>
                              <Box display='flex' alignItems='center'>
                                <Typography color='textSecondary'>
                                  Current Value
                                </Typography>
                                <DaiIcon />
                              </Box>
                              {formatNumber(
                                Number(formatEther(userOwnedOption.size)) *
                                  perOptionValue,
                              )}
                            </Box>
                            <Box className={classes.cardRow}>
                              <Box display='flex' alignItems='center'>
                                <Typography color='textSecondary'>
                                  Strike
                                </Typography>
                                <DaiIcon />
                              </Box>
                              {formatBigNumber(option.strike)}
                            </Box>
                            <Box className={classes.cardRow}>
                              <Typography color='textSecondary'>
                                Expiration
                              </Typography>
                              <Box textAlign='right'>
                                {expiration.format('DD MMM')}
                                <Typography color='textSecondary'>
                                  {expiration.fromNow()}
                                </Typography>
                              </Box>
                            </Box>
                            <Box px={1} my={1.5}>
                              {isExercised ? (
                                <Box className={classes.exercisedCell}>
                                  <Box>
                                    <DoneIcon />
                                  </Box>
                                  <Typography>Exercised</Typography>
                                </Box>
                              ) : (
                                <Button
                                  fullWidth
                                  color={
                                    formatNumber(perOptionValue) === '0' ||
                                    optionFilterIndex === 1
                                      ? 'secondary'
                                      : 'primary'
                                  }
                                  disabled={
                                    formatNumber(perOptionValue) === '0' ||
                                    optionFilterIndex === 1
                                  }
                                  onClick={() =>
                                    handleExercise(userOwnedOption)
                                  }
                                >
                                  {optionFilterIndex === 0
                                    ? 'Exercise'
                                    : 'Expired'}
                                </Button>
                              )}
                            </Box>
                          </Container>
                        </Box>
                      );
                    })}
                  </>
                ) : (
                  <DataTable
                    headCells={optionsHeadCells}
                    data={filteredOptions}
                    rowPerPage={5}
                    sortUpIcon={<UpArrow />}
                    sortDownIcon={<DownArrow />}
                    showEmptyRows={false}
                    renderRow={(userOwnedOption: UserOwnedOption, index) => {
                      const { option } = userOwnedOption;
                      const isCall = option.optionType === OptionType.Call;
                      const UnderlyingIcon = getTokenIcon(
                        option.underlying.symbol,
                      );
                      const expiration = Moment(
                        new Date(Number(option.maturity) * 1000),
                      );
                      const price = tokenPrices[option.underlying.symbol];
                      const perOptionValue = Math.max(
                        0,
                        isCall
                          ? price - Number(formatEther(option.strike))
                          : Number(formatEther(option.strike)) - price,
                      );
                      const isExercised =
                        Number(formatEther(userOwnedOption.totalExercised)) -
                          Number(formatEther(userOwnedOption.size)) >=
                        0;

                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Box className={classes.tokenIconCell}>
                              <Box>
                                <UnderlyingIcon height={20} width={20} />
                              </Box>
                              {option.underlying.symbol}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {formatBigNumber(userOwnedOption.size)}
                          </TableCell>
                          <TableCell>
                            <Box
                              className={cx(
                                classes.typeBox,
                                isCall ? classes.call : classes.put,
                              )}
                            >
                              <Box />
                              {isCall ? <CallIcon /> : <PutIcon />}
                              {option.optionType}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {formatBigNumber(option.strike)}
                          </TableCell>
                          <TableCell>
                            {formatNumber(
                              Number(formatEther(userOwnedOption.size)) *
                                perOptionValue,
                            )}
                          </TableCell>
                          <TableCell>
                            <Box className={classes.expirationCell}>
                              {expiration.format('DD MMM')}{' '}
                              <Typography color='textSecondary'>
                                {expiration.fromNow()}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell className='buttonCell'>
                            {isExercised ? (
                              <Box className={classes.exercisedCell}>
                                <Box>
                                  <DoneIcon />
                                </Box>
                                <Typography>Exercised</Typography>
                              </Box>
                            ) : (
                              <Button
                                color={
                                  formatNumber(perOptionValue) === '0' ||
                                  optionFilterIndex === 1
                                    ? 'secondary'
                                    : 'primary'
                                }
                                disabled={
                                  formatNumber(perOptionValue) === '0' ||
                                  optionFilterIndex === 1
                                }
                                onClick={() => handleExercise(userOwnedOption)}
                              >
                                {optionFilterIndex === 0
                                  ? 'Exercise'
                                  : 'Expired'}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    }}
                  />
                )}
              </Box>
            </Box>
          )}
          {positionFilterIndex === 1 && (
            <Box
              className={classes.tableContainer}
              ml={!mobileWindowSize ? '6px' : ''}
            >
              <Grid
                container
                className={classes.tableHeading}
                alignItems='center'
                justify='space-between'
              >
                <Box mt={1.25}>
                  <Typography
                    component='h1'
                    color='textPrimary'
                    className={classes.mainTitle}
                  >
                    My yield positions
                  </Typography>
                </Box>
              </Grid>
              <Box mt={mobileWindowSize ? 1.5 : 2.5}>
                {mobileWindowSize ? (
                  <>
                    {pools.map((pool: UserOwnedPool, index) => {
                      const isCall = pool.optionType === OptionType.Call;
                      const tokenSymbol = isCall
                        ? pool.underlying.symbol
                        : pool.base.symbol;
                      const TokenIcon = getTokenIcon(tokenSymbol);

                      return (
                        <Box mb={2}>
                          <Container fixed>
                            <Box
                              width={1}
                              display='flex'
                              p={1.25}
                              pl={1}
                              justifyContent='space-between'
                              alignItems='center'
                            >
                              <Box className={classes.tokenIconCell}>
                                <Box>
                                  <TokenIcon height={20} width={20} />
                                </Box>
                                {tokenSymbol}
                              </Box>
                              <Box display='flex' alignItems='center'>
                                {pool.underlying.symbol}{' '}
                                {isCall ? 'Call' : 'Put'}
                                <Box ml={2} display='flex' alignItems='center'>
                                  <Box
                                    className={cx(
                                      classes.typeBox,
                                      isCall ? classes.call : classes.put,
                                    )}
                                  >
                                    <Box />
                                    {isCall ? <CallIcon /> : <PutIcon />}
                                    Pool
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                            <Divider />
                            <Box className={classes.cardRow}>
                              <Box display='flex' alignItems='center'>
                                <Typography color='textSecondary'>
                                  Capital
                                </Typography>
                                <DaiIcon />
                              </Box>
                              {formatNumber(
                                (Number(pool.totalAvailable) +
                                  Number(pool.totalLocked)) /
                                  10 ** pool.underlying.decimals,
                              )}
                            </Box>
                            <Box className={classes.cardRow}>
                              <Box display='flex' alignItems='center'>
                                <Typography color='textSecondary'>
                                  Earned
                                </Typography>
                                <DaiIcon />
                              </Box>
                              {formatBigNumber(pool.totalPremiumsEarned)}
                            </Box>
                            <Box className={classes.cardRow}>
                              <Box display='flex' alignItems='center'>
                                <Typography color='textSecondary'>
                                  Current ROI
                                </Typography>
                              </Box>
                              {formatNumber(
                                (Number(pool.totalPremiumsEarned) /
                                  Number(pool.totalDeposited)) *
                                  100,
                              )}
                              %
                            </Box>
                            <Box className={classes.yieldButtonCell}>
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <Button
                                    fullWidth
                                    color='primary'
                                    onClick={() => setPositionModalOpen(true)}
                                  >
                                    Add
                                  </Button>
                                </Grid>
                                <Grid item xs={6}>
                                  <Button
                                    fullWidth
                                    variant='outlined'
                                    onClick={() => setPositionModalOpen(true)}
                                  >
                                    Remove
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Container>
                        </Box>
                      );
                    })}
                  </>
                ) : (
                  <DataTable
                    headCells={yieldHeadCells}
                    data={pools}
                    sortUpIcon={<UpArrow />}
                    sortDownIcon={<DownArrow />}
                    rowPerPage={5}
                    showEmptyRows={false}
                    renderRow={(pool: UserOwnedPool, index) => {
                      const isCall = pool.optionType === OptionType.Call;
                      const tokenSymbol = isCall
                        ? pool.underlying.symbol
                        : pool.base.symbol;
                      const TokenIcon = getTokenIcon(tokenSymbol);

                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Box className={classes.tokenIconCell}>
                              <Box>
                                <TokenIcon height={20} width={20} />
                              </Box>
                              {tokenSymbol}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {formatNumber(
                              (Number(pool.totalLocked) +
                                Number(pool.totalAvailable)) /
                                10 ** pool.underlying.decimals,
                            )}
                          </TableCell>
                          <TableCell>
                            <Box display='flex' alignItems='center'>
                              <Box
                                mr={1}
                                className={cx(
                                  classes.typeBox,
                                  isCall ? classes.call : classes.put,
                                )}
                              >
                                <Box />
                                {isCall ? <CallIcon /> : <PutIcon />}
                                Pool
                              </Box>
                              {pool.underlying.symbol} {isCall ? 'Call' : 'Put'}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {formatBigNumber(pool.totalPremiumsEarned)}
                          </TableCell>
                          <TableCell>
                            {formatNumber(
                              (Number(pool.totalPremiumsEarned) /
                                Number(pool.totalDeposited)) *
                                100,
                            )}
                            %
                          </TableCell>
                          <TableCell className='yieldButtonCell'>
                            <Button
                              color='primary'
                              onClick={() => setPositionModalOpen(true)}
                            >
                              Add
                            </Button>
                            <Button
                              variant='outlined'
                              onClick={() => setPositionModalOpen(true)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }}
                  />
                )}
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Positions;
