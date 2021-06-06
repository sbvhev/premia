import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Container,
  Divider,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  TableRow,
  TableCell,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CallMadeIcon from '@material-ui/icons/CallMade';
import Moment from 'moment';
import cx from 'classnames';

import { formatNumber } from 'utils/formatNumber';
import { OptionType } from 'web3/options';

import { DataTable, LineChart, DonutChart, PositionModal } from 'components';
import { ReactComponent as OptionsIcon } from 'assets/svg/OptionsIcon.svg';
import { ReactComponent as YieldIcon } from 'assets/svg/YieldIcon.svg';
import CapitalIcon from 'assets/svg/CapitalIcon.svg';
import ReturnIcon from 'assets/svg/ReturnIcon.svg';
import { ReactComponent as VaultIcon } from 'assets/svg/VaultIcon.svg';
import { ReactComponent as UniIcon } from 'assets/svg/UniIcon.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import { ReactComponent as YFIIcon } from 'assets/svg/YFIIcon.svg';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';
import { ReactComponent as UpArrow } from 'assets/svg/UpArrow.svg';
import { ReactComponent as DownArrow } from 'assets/svg/DownArrow.svg';
import { ReactComponent as CallIcon } from 'assets/svg/CallIcon.svg';
import { ReactComponent as PutIcon } from 'assets/svg/PutIcon.svg';
import NoPositionYield from 'assets/svg/NoPositionYield.svg';
import NoPositionOptions from 'assets/svg/NoPositionOptions.svg';
import { ReactComponent as WarningIcon } from 'assets/svg/WarningIcon.svg';

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
    label: 'Type&name',
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
    label: 'Expected APY',
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
    element: <SellAllButton />,
    sortDisabled: true,
    sortKey: () => 1,
  },
];

const SellAllButton: React.FC = () => {
  return (
    <Button variant='outlined' size='large'>
      Exercise all
    </Button>
  );
};

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  title: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 0.64,
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
    width: 38,
    height: 38,
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
    fontSize: 18,
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
    '@media (min-height: 700px)': {
      position: 'absolute',
      maxWidth: 800,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      padding: 16,
    },
    '& h2': {
      fontSize: 18,
      fontWeight: 700,
    },
  },
  findPositionContainer: {
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
    boxShadow: `0px 0px 25px rgba(43, 229, 154, 0.25)`,
    borderRadius: 10,
    padding: 18,
    marginTop: 20,
    '& h2': {
      color: palette.common.black,
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
  noPositionButton: {
    minWidth: 181,
    color: palette.common.black,
    marginTop: 4,
    '&:hover': {
      background: palette.primary.light,
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
    top: 4,
    right: 2,
    '& p': {
      fontSize: 8,
      color: palette.common.black,
    },
  },
  findPositionButton: {
    minWidth: 169,
    background: palette.common.black,
    '& svg': {
      opacity: 0.5,
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
          color: palette.background.paper,
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
  },
}));

const getTodayHours = () => {
  const hoursPerDay = 24;
  let formattedTime;
  let times = [];
  for (let i = 0; i < hoursPerDay + 1; i++) {
    formattedTime = Moment(i, 'hh').format('h a');
    times.push(formattedTime);
  }
  return times;
};

const getThisWeekDates = () => {
  let startOfWeek = Moment().startOf('week');
  let endOfWeek = Moment().endOf('week');

  let days = [];
  let day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(Moment(day.toDate()).format('YYYY/MM/DD'));
    day = day.clone().add(1, 'd');
  }

  return days;
};

const getThisMonthDates = () => {
  let startOfMonth = Moment().startOf('month');
  let endOfMonth = Moment().endOf('month');

  let days = [];
  let day = startOfMonth;

  while (day <= endOfMonth) {
    days.push(Moment(day.toDate()).format('MMM DD'));
    day = day.clone().add(1, 'd');
  }

  return days;
};

const Positions: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [positionFilter, setPositionFilter] = useState(0);
  const [dateFilter, setDateFilter] = useState(0);
  const [optionFilter, setOptionFilter] = useState(0);
  const [positionModalOpen, setPositionModalOpen] = useState(false);

  const yieldHeadCells = getYieldHeadCells();
  const optionsHeadCells = getOptionsHeadCells();

  const noPositions = false;

  const chartTypes = ['daily', 'weekly', 'monthly'];
  const chartDateCats = [
    getTodayHours(),
    getThisWeekDates(),
    getThisMonthDates(),
  ];

  const chartDateData = [
    3234, 6432, 1234, 3234, 6432, 1234, 3234, 6432, 1234, 3234, 6432, 1234,
    3234, 6432, 1234, 3234, 6432, 1234, 3234, 6432, 1234, 3234, 6432, 1234,
  ];
  const chartWeekData = [3234, 6432, 1234, 3234, 6432, 1234, 3234];
  const chartMonthData = [
    3234, 6432, 1234, 3234, 6432, 1234, 3234, 6432, 1234, 3234, 6432, 1234,
    3234, 6432, 1234, 3234, 6432, 1234, 3234, 6432, 1234, 3234, 6432, 1234,
    3234, 6432, 1234, 3234, 6432, 1234,
  ];
  const chartData = [chartDateData, chartWeekData, chartMonthData];

  const yieldData = [
    {
      tokenIcon: <UniIcon />,
      symbol: 'Uni',
      capital: 15002,
      type: 'vault',
      name: 'Medium Risk',
      earned: 100,
      apy: 24,
    },
    {
      tokenIcon: <LinkIcon />,
      symbol: 'Link',
      capital: 15002,
      option: OptionType.Call,
      type: 'pool',
      name: 'Link Call Pool',
      earned: 100,
      apy: 24,
    },
    {
      tokenIcon: <YFIIcon />,
      symbol: 'YFI',
      capital: 15002,
      option: 'PUT',
      type: 'pool',
      name: 'Uni Put Pool',
      earned: 100,
      apy: 24,
    },
    {
      tokenIcon: <UniIcon />,
      symbol: 'Uni',
      capital: 15002,
      type: 'vault',
      name: 'Low Risk',
      earned: 100,
      apy: 24,
    },
  ];

  const optionsData = [
    {
      tokenIcon: <UniIcon />,
      symbol: 'Uni',
      size: 15002,
      type: OptionType.Call,
      strike: 100,
      value: 100,
      expiration: Moment.now(),
    },
    {
      tokenIcon: <UniIcon />,
      symbol: 'Uni',
      size: 15002,
      type: OptionType.Call,
      strike: 100,
      value: 100,
      expiration: Moment.now(),
    },
    {
      tokenIcon: <UniIcon />,
      symbol: 'Uni',
      size: 15002,
      type: 'PUT',
      strike: 100,
      value: 100,
      exercised: true,
      expiration: Moment.now(),
    },
  ];

  const plPercents = [40, 30, 20, 10, 0, -10, -20];

  const boundIndex = plPercents.findIndex((val) => val === 0);

  const optionAssets = [
    {
      category: 'ETH',
      value: 73,
    },
    {
      category: 'Uni',
      value: 27,
    },
  ];

  const yieldAssets = [
    {
      category: 'Option 1',
      value: 73,
    },
    {
      category: 'Option 2',
      value: 27,
    },
  ];

  return (
    <>
      <PositionModal
        open={positionModalOpen}
        onClose={() => {
          setPositionModalOpen(false);
        }}
      />
      <Typography
        component='h1'
        color='textPrimary'
        className={classes.title}
        style={!mobile ? { margin: '25px 0 0 20px' } : {}}
      >
        My dashboard
      </Typography>
      <Grid
        container
        className={classes.positionFilterContainer}
        style={!mobile ? { paddingLeft: '6px' } : {}}
      >
        <BottomNavigation
          value={positionFilter}
          className={cx(mobile && classes.fullWidth)}
          onChange={(event, newValue) => {
            setPositionFilter(newValue);
          }}
          showLabels={true}
        >
          <BottomNavigationAction label='Options' icon={<OptionsIcon />} />
          <BottomNavigationAction label='Yield' icon={<YieldIcon />} />
        </BottomNavigation>
        {!noPositions && (
          <BottomNavigation
            value={dateFilter}
            className={cx(mobile && classes.fullWidth)}
            onChange={(event, newValue) => {
              setDateFilter(newValue);
            }}
            showLabels={true}
          >
            <BottomNavigationAction label='Today' />
            <BottomNavigationAction label='This week' />
            <BottomNavigationAction label='This month' />
          </BottomNavigation>
        )}
      </Grid>
      {!noPositions && (
        <Box mb={2.5} ml={!mobile ? '6px' : ''}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={8}>
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
                          Capital in options
                        </Typography>
                        <Typography
                          color='textPrimary'
                          component='h2'
                          className={classes.price}
                        >
                          124,098
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
                          12%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Divider />
                <Box display='flex' position='relative'>
                  <Box className={classes.plPercents}>
                    {plPercents.map((val, ind) => (
                      <Typography key={ind}>
                        {val}
                        {val !== 0 && '%'}
                      </Typography>
                    ))}
                    <Box
                      className={classes.boundLine}
                      top={boundIndex * 26 + 23}
                    />
                  </Box>
                  <Box flex={1} mb={-1.5} mr={1.5}>
                    <LineChart
                      isCall
                      data={chartData[dateFilter]}
                      categories={chartDateCats[dateFilter]}
                      chartType={chartTypes[dateFilter]}
                      width='100%'
                      height={200}
                    />
                  </Box>
                </Box>
              </Container>
            </Grid>
            <Grid item container sm={12} md={12} lg={4}>
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
                      data={positionFilter === 0 ? optionAssets : yieldAssets}
                      colors={['#4D9EF2', '#EB4A97']}
                      endColors={['#2DDEA0', '#A745DD']}
                      rotations={[21.21, 116.57]}
                      content={
                        positionFilter === 0 ? 'My assets' : 'My options'
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
          <Typography
            component='h1'
            color='textPrimary'
            align='center'
            className={classes.title}
          >
            You have no active positions
          </Typography>
          <Box mt={mobile ? 3 : 5} ml={!mobile ? '6px' : ''}>
            <Container fixed className={classes.noPositionBox}>
              {positionFilter === 0 && (
                <>
                  <Box className={classes.noPositionImage}>
                    <img src={NoPositionOptions} alt='No Options' />
                  </Box>
                  <Box ml={3}>
                    <Typography component='h2'>Your options</Typography>
                    <Link to='/options'>
                      <Button
                        className={classes.noPositionButton}
                        color='primary'
                      >
                        Buy options
                      </Button>
                    </Link>
                  </Box>
                </>
              )}
              {positionFilter === 1 && (
                <>
                  <Box className={classes.noPositionImage}>
                    <img src={NoPositionYield} alt='No Yield' />
                  </Box>
                  <Box ml={3}>
                    <Typography component='h2'>Your yield</Typography>
                    <Link to='/vaults'>
                      <Button
                        className={classes.noPositionButton}
                        color='primary'
                      >
                        Earn yield
                      </Button>
                    </Link>
                  </Box>
                </>
              )}
            </Container>
          </Box>
          <Grid
            container
            justify={mobile ? 'center' : 'space-between'}
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
          </Grid>
        </Box>
      ) : (
        <>
          {positionFilter === 0 && (
            <Box className={classes.tableContainer} ml={!mobile ? '6px' : ''}>
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
                <Box mt={mobile ? 2 : 0} width={mobile ? 1 : 'auto'}>
                  <BottomNavigation
                    value={optionFilter}
                    className={cx(mobile && classes.fullWidth)}
                    onChange={(event, newValue) => {
                      setOptionFilter(newValue);
                    }}
                    showLabels={true}
                  >
                    <BottomNavigationAction
                      label='Current'
                      icon={<WatchLaterIcon />}
                    />
                    <BottomNavigationAction
                      label='Expired'
                      icon={
                        <>
                          <WarningIcon />
                          <Box className={classes.expiredIcon}>
                            <Typography>1</Typography>
                          </Box>
                        </>
                      }
                    />
                  </BottomNavigation>
                </Box>
              </Grid>
              <Box mt={mobile ? 1.5 : 2.5}>
                {mobile ? (
                  <>
                    {optionsData.map((item: any) => (
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
                              <Box>{item.tokenIcon}</Box>
                              {item.symbol}
                            </Box>
                            <Box
                              className={cx(
                                classes.typeBox,
                                item.type === OptionType.Call
                                  ? classes.call
                                  : classes.put,
                              )}
                            >
                              <Box />
                              {item.type === OptionType.Call ? (
                                <CallIcon />
                              ) : (
                                <PutIcon />
                              )}
                              {item.type}
                            </Box>
                          </Box>
                          <Divider />
                          <Box className={classes.cardRow}>
                            <Typography color='textSecondary'>Size</Typography>
                            {formatNumber(item.size)}
                          </Box>
                          <Box className={classes.cardRow}>
                            <Box display='flex' alignItems='center'>
                              <Typography color='textSecondary'>
                                Current Value
                              </Typography>
                              <DaiIcon />
                            </Box>
                            {formatNumber(item.value)}
                          </Box>
                          <Box className={classes.cardRow}>
                            <Box display='flex' alignItems='center'>
                              <Typography color='textSecondary'>
                                Strike
                              </Typography>
                              <DaiIcon />
                            </Box>
                            {formatNumber(item.strike)}
                          </Box>
                          <Box className={classes.cardRow}>
                            <Typography color='textSecondary'>
                              Expiration
                            </Typography>
                            <Box textAlign='right'>
                              {Moment(item.expiration).format('DD MMM')}
                              <Typography color='textSecondary'>
                                2 days left
                              </Typography>
                            </Box>
                          </Box>
                          <Box px={1} my={1.5}>
                            {item.exercised ? (
                              <Box className={classes.exercisedCell}>
                                <Box>
                                  <DoneIcon />
                                </Box>
                                <Typography>Exercised for 100</Typography>
                              </Box>
                            ) : (
                              <Button
                                fullWidth
                                color='primary'
                                onClick={() => setPositionModalOpen(true)}
                              >
                                Exercise
                              </Button>
                            )}
                          </Box>
                        </Container>
                      </Box>
                    ))}
                  </>
                ) : (
                  <DataTable
                    headCells={optionsHeadCells}
                    data={optionsData}
                    rowPerPage={5}
                    sortUpIcon={<UpArrow />}
                    sortDownIcon={<DownArrow />}
                    showEmptyRows={false}
                    renderRow={(item: any, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Box className={classes.tokenIconCell}>
                              <Box>{item.tokenIcon}</Box>
                              {item.symbol}
                            </Box>
                          </TableCell>
                          <TableCell>{formatNumber(item.size)}</TableCell>
                          <TableCell>
                            <Box
                              className={cx(
                                classes.typeBox,
                                item.type === OptionType.Call
                                  ? classes.call
                                  : classes.put,
                              )}
                            >
                              <Box />
                              {item.type === OptionType.Call ? (
                                <CallIcon />
                              ) : (
                                <PutIcon />
                              )}
                              {item.type}
                            </Box>
                          </TableCell>
                          <TableCell>{item.strike}</TableCell>
                          <TableCell>{item.value}</TableCell>
                          <TableCell>
                            <Box className={classes.expirationCell}>
                              {Moment(item.expiration).format('DD MMM')}{' '}
                              <Typography color='textSecondary'>
                                2 days left
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell className='buttonCell'>
                            {item.exercised ? (
                              <Box className={classes.exercisedCell}>
                                <Box>
                                  <DoneIcon />
                                </Box>
                                <Typography>Exercised for 100</Typography>
                              </Box>
                            ) : (
                              <Button
                                color='primary'
                                onClick={() => setPositionModalOpen(true)}
                              >
                                Exercise
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
          {positionFilter === 1 && (
            <Box className={classes.tableContainer} ml={!mobile ? '6px' : ''}>
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
              <Box mt={mobile ? 1.5 : 2.5}>
                {mobile ? (
                  <>
                    {yieldData.map((item: any, index) => (
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
                              <Box>{item.tokenIcon}</Box>
                              {item.symbol}
                            </Box>
                            <Box display='flex' alignItems='center'>
                              {item.name}
                              <Box ml={2} display='flex' alignItems='center'>
                                <Box
                                  className={cx(
                                    classes.typeBox,
                                    item.type === 'vault'
                                      ? classes.vault
                                      : item.option === OptionType.Call
                                      ? classes.call
                                      : classes.put,
                                  )}
                                >
                                  <Box />
                                  {item.type === 'vault' ? (
                                    <VaultIcon />
                                  ) : item.option === OptionType.Call ? (
                                    <CallIcon />
                                  ) : (
                                    <PutIcon />
                                  )}
                                  {item.type}
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
                            {formatNumber(item.capital)}
                          </Box>
                          <Box className={classes.cardRow}>
                            <Box display='flex' alignItems='center'>
                              <Typography color='textSecondary'>
                                Earned
                              </Typography>
                              <DaiIcon />
                            </Box>
                            {item.earned}
                          </Box>
                          <Box className={classes.cardRow}>
                            <Box display='flex' alignItems='center'>
                              <Typography color='textSecondary'>
                                Expected APY
                              </Typography>
                            </Box>
                            {item.apy}
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
                    ))}
                  </>
                ) : (
                  <DataTable
                    headCells={yieldHeadCells}
                    data={yieldData}
                    sortUpIcon={<UpArrow />}
                    sortDownIcon={<DownArrow />}
                    rowPerPage={5}
                    showEmptyRows={false}
                    renderRow={(item: any, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Box className={classes.tokenIconCell}>
                              <Box>{item.tokenIcon}</Box>
                              {item.symbol}
                            </Box>
                          </TableCell>
                          <TableCell>{formatNumber(item.capital)}</TableCell>
                          <TableCell>
                            <Box display='flex' alignItems='center'>
                              <Box
                                mr={1}
                                className={cx(
                                  classes.typeBox,
                                  item.type === 'vault'
                                    ? classes.vault
                                    : item.option === OptionType.Call
                                    ? classes.call
                                    : classes.put,
                                )}
                              >
                                <Box />
                                {item.type === 'vault' ? (
                                  <VaultIcon />
                                ) : item.option === OptionType.Call ? (
                                  <CallIcon />
                                ) : (
                                  <PutIcon />
                                )}
                                {item.type}
                              </Box>
                              {item.name}
                            </Box>
                          </TableCell>
                          <TableCell>{item.earned}</TableCell>
                          <TableCell>{item.apy}</TableCell>
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
