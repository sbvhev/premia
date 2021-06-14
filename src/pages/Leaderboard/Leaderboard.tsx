import React, { useState, useEffect, useMemo } from 'react';
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
import cx from 'classnames';

import { useDarkModeManager } from 'state/user/hooks';
import { formatBigNumber, formatNumber } from 'utils/formatNumber';
import { UserOwnedPool } from 'web3/pools';
import { OptionType, UserOwnedOption } from 'web3/options';
import { useAllUserOwnedPools, useUserOwnedOptions } from 'hooks';
import { getTokenIcon } from 'utils/getTokenIcon';

import {
  DataTable,
} from 'components';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';
import { ReactComponent as UpArrow } from 'assets/svg/UpArrow.svg';
import { ReactComponent as DownArrow } from 'assets/svg/DownArrow.svg';
import { ReactComponent as CallIcon } from 'assets/svg/CallIcon.svg';
import { ReactComponent as PutIcon } from 'assets/svg/PutIcon.svg';

const getHeadCells = () => [
  {
    id: 'rank',
    numeric: false,
    label: 'Rank',
    sortKey: (leadItem: any) => leadItem?.rank,
  },
  {
    id: 'user',
    numeric: false,
    label: 'User',
    sortKey: (leadItem: any) => leadItem?.user,
  },
  {
    id: 'totalPL',
    numeric: false,
    label: 'Total P&L',
    sortKey: (leadItem: any) => leadItem?.totalPL,
  },
  {
    id: 'optionPL',
    numeric: false,
    label: 'Option P&L',
    sortKey: (leadItem: any) => leadItem?.optionPL,
  },
  {
    id: 'vaultsPL',
    numeric: false,
    label: 'Vaults P&L',
    sortKey: (leadItem: any) => leadItem?.vaultsPL,
  },
  {
    id: 'successratio',
    numeric: false,
    label: 'Success ratio',
    sortKey: (leadItem: any) => leadItem?.successratio,
  },
];

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
    maxWidth: 790,
    margin: 'auto',
    '& h2': {
      fontSize: 18,
      lineHeight: 1,
      fontWeight: 'bold',
    },
    [breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 275px)',
      '& h1': {
        marginTop: 20,
      },
    },
    [breakpoints.down('xs')]: {
      minHeight: 'calc(100vh - 290px)',
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
    marginLeft: 30,
    '& h2': {
      marginBottom: 9,
    },
    '& button': {
      width: 181,
      height: 45,
      fontSize: 16,
      margin: 0,
      color: ({ darkMode }: any) => (darkMode ? 'black' : 'white'),
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

const Leaderboard: React.FC = () => {
  const [darkMode] = useDarkModeManager();
  const classes = useStyles({ darkMode });
  const theme = useTheme();
  const mobileWindowSize = useMediaQuery(theme.breakpoints.down('xs'));

  const leaderItems = [
    {
      rank: 3,
      user: '0x3806410847af6cC861D8457b1E4aC029778AAf20',
      totalPL: 124001.04,
      optionsPL: 100002.01,
      vaultsPL: 23999.03,
      successratio: 100,
    },
    {
      rank: 1,
      user: '0x3806410847af6cC861D8457b1E4aC029778AAf20',
      totalPL: 124001.04,
      optionsPL: 100002.01,
      vaultsPL: 23999.03,
      successratio: 100,
    },
    {
      rank: 2,
      user: '0x3806410847af6cC861D8457b1E4aC029778AAf20',
      totalPL: 124001.04,
      optionsPL: 100002.01,
      vaultsPL: 23999.03,
      successratio: 100,
    },
    {
      rank: 3,
      user: '0x3806410847af6cC861D8457b1E4aC029778AAf20',
      totalPL: 124001.04,
      optionsPL: 100002.01,
      vaultsPL: 23999.03,
      successratio: 100,
    },
    {
      rank: 4,
      user: '0x3806410847af6cC861D8457b1E4aC029778AAf20',
      totalPL: 124001.04,
      optionsPL: 100002.01,
      vaultsPL: 23999.03,
      successratio: 100,
    },
    {
      rank: 5,
      user: '0x3806410847af6cC861D8457b1E4aC029778AAf20',
      totalPL: 124001.04,
      optionsPL: 100002.01,
      vaultsPL: 23999.03,
      successratio: 100,
    }
  ];

  const headCells = useMemo(() => getHeadCells(), []);

  return (
    <>
      <Typography
        component='h1'
        color='textPrimary'
        className={classes.title}
      >
        Leaderboard
      </Typography>
      {mobileWindowSize ? (
        <>
          {leaderItems.map((leaderItem) => {
            const { rank, user, successratio, totalPL, optionsPL, vaultsPL } = leaderItem;

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
                      { rank }
                    </Box>
                    <Box className={classes.typeBox}>
                      { user }
                    </Box>
                  </Box>
                  <Divider />
                  <Box className={classes.cardRow}>
                    <Typography color='textSecondary'>
                      Total P&L
                    </Typography>
                    {totalPL}
                  </Box>
                  <Box className={classes.cardRow}>
                    <Typography color='textSecondary'>
                      Option P&L
                    </Typography>
                    {optionsPL}
                  </Box>
                  <Box className={classes.cardRow}>
                    <Typography color='textSecondary'>
                      Vaults P&L
                    </Typography>
                    {vaultsPL}
                  </Box>
                </Container>
              </Box>
            );
          })}
        </>
      ) : (
        <DataTable
          headCells={headCells}
          data={leaderItems}
          sortUpIcon={<UpArrow />}
          sortDownIcon={<DownArrow />}
          rowPerPage={5}
          showEmptyRows={false}
          renderRow={(leaderItem: any, index) => {

            return (
              <TableRow key={index}>
                <TableCell>
                  <Box className={classes.tokenIconCell}>
                    {leaderItem.rank}
                  </Box>
                </TableCell>
                <TableCell>
                  {leaderItem.user}
                </TableCell>
                <TableCell>
                  <Box display='flex' alignItems='center'>
                    {leaderItem.totalPL}
                  </Box>
                </TableCell>
                <TableCell>
                  {leaderItem.optionsPL}
                </TableCell>
                <TableCell>
                  {leaderItem.vaultsPL}
                </TableCell>
                <TableCell className='yieldButtonCell'>
                  {leaderItem.successratio}
                </TableCell>
              </TableRow>
            );
          }}
        />
      )}
    </>
  );
};

export default Leaderboard;
