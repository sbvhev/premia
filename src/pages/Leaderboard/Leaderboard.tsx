import React, { useMemo } from 'react';
import {
  Box,
  Container,
  Divider,
  Typography,
  TableRow,
  TableCell,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useDarkModeManager } from 'state/user/hooks';
import { shortenAddress } from 'utils';
import { formatNumber } from 'utils/formatNumber';
import cx from 'classnames';
import { useWeb3 } from 'state/application/hooks';

import { DataTable } from 'components';
import { ReactComponent as UpArrow } from 'assets/svg/UpArrow.svg';
import { ReactComponent as DownArrow } from 'assets/svg/DownArrow.svg';
import PrizeFirst from 'assets/svg/PrizeFirst.svg';
import PrizeSecond from 'assets/svg/PrizeSecond.svg';
import PrizeThird from 'assets/svg/PrizeThird.svg';
import LeaderMe from 'assets/svg/LeaderMe.svg';

const getHeadCells = () => [
  {
    id: 'rank',
    numeric: false,
    label: 'Rank',
    sortKey: (leadItem: any) => leadItem.me && leadItem?.rank,
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
    marginBottom: 35,
    [breakpoints.down('xs')]: {
      lineHeight: 1,
    },
  },
  leaderTable: {
    '& table': {
      '& tr': {
        position: 'relative',
        '&.meRow td': {
          fontWeight: 'bold',
          '& $callText': {
            fontWeight: 'bold'
          },
          '& $successRatioBox': {
            '& > div': {
              opacity: 1,
              zIndex: 1,
            },
            '& p': {
              color: (props: any) => props.darkMode ? 'black' : 'white',
              zIndex: 2,
            }
          }
        }
      },
      '& th': {
        height: 53,
        padding: 0,
        '&:first-child': {
          paddingLeft: 23
        }
      },
      '& td': {
        padding: 0,
        height: 55,
        borderBottom: `1px solid ${palette.divider}`,
        fontSize: 14,
        lineHeight: '24px',
        fontWeight: 500,
        '& $callText': {
          fontWeight: 'normal'
        }
      }  
    }
  },
  rankBox: {
    width: 51,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 17,
    '& div': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      borderRadius: 12,
      top: 0,
      left: 0,
    },
    '& p': {
      fontSize: 14,
      lineHeight: '18px',
      fontWeight: 'bold'
    }
  },
  firstRank: {
    '& div': {
      background: 'linear-gradient(115.58deg, #FFA15E 8.45%, #EFFF8E 101.04%)',
      opacity: (props: any) => props.darkMode ? 0.1 : 0.2,
    },
    '& p': {
      background: 'linear-gradient(115.58deg, #FF5E5E 8.45%, #FFED8E 101.04%)',
      WebkitBackgroundClip: 'text',
      textFillColor: 'transparent',
      marginLeft: 3,
      fontWeight: 'normal'
    }
  },
  secondRank: {
    '& div': {
      background: 'linear-gradient(115.58deg, #FDFDFD 8.45%, #E6E6E6 101.04%)',
      opacity: (props: any) => props.darkMode ? 0.1 : 0.3,
    },
    '& p': {
      background: 'linear-gradient(115.58deg, #858585 8.45%, #E6E6E6 101.04%)',
      WebkitBackgroundClip: 'text',
      textFillColor: 'transparent',
      marginLeft: 3,
      fontWeight: 'normal'
    }
  },
  thirdRank: {
    '& div': {
      background: 'linear-gradient(115.58deg, rgba(196, 111, 85, 0.1) 8.45%, rgba(153, 52, 52, 0.1) 101.04%)',
    },
    '& p': {
      background:
        'linear-gradient(115.58deg, #C46F55 8.45%, #993434 101.04%)',
      WebkitBackgroundClip: 'text',
      textFillColor: 'transparent',
      marginLeft: 3,
      fontWeight: 'normal'
    }
  },
  meBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    border: '1px solid',
    borderImageSlice: 1,
    borderImageSource: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
    '& img': {
      position: 'absolute',
      top: -38,
      left: -40
    },
    '& p': {
      position: 'absolute',
      transform: 'rotate(-45deg)',
      color: 'black',
      fontSize: 8,
      lineHeight: '24px',
      fontWeight: 500,
      top: 8,
      left: 13
    }
  },
  cardRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: '0 10px',
    color: palette.text.primary,
    '& p': {
      fontSize: 14,
      fontWeight: 500,
      '&$callText': {
        fontWeight: 'normal'
      }
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
  mobileItem: {
    position: 'relative',
    '& $meBack': {
      border: 'none',
      left: 3
    },
    '&.meRow': {
      background: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
      borderRadius: 12,
      padding: 1,
      '& .MuiDivider-root': {
        background: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
      },
      '& > div.MuiContainer-root': {
        background: palette.background.paper,
        border: 'none'
      },
      '& $cardRow, & $callText, & $putText, & $mobileAddressContainer p': {
        fontWeight: 'bold'
      },
      '& $successRatioBox': {
        '& > div': {
          opacity: 1,
        },
        '& p': {
          zIndex: 2,
          color: (props: any) => props.darkMode ? 'black' : 'white'
        }
      }
    },
    '& $rankBox': {
      marginLeft: 0
    },
    '& > div > div': {
      padding: '0 12px',
    },
    '& > div > div:first-child': {
      height: 54
    },
    '& $cardRow': {
      marginTop: 8,
      fontSize: 14,
      fontWeight: 500,
      '&:first-child': {
        marginTop: 12,
      },
      '&:last-child': {
        paddingBottom: 14
      }
    }
  },
  mobileAddressContainer: {
    display: 'flex',
    alignItems: 'center',
    '& > p': {
      fontSize: 14,
      fontWeight: 500,
      marginRight: 5
    }
  },
  callText: {
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
    WebkitBackgroundClip: 'text',
    textFillColor: 'transparent'
  },
  putText: {
    background: `linear-gradient(121.21deg, ${palette.error.main} 7.78%, ${palette.error.dark} 118.78%)`,
    WebkitBackgroundClip: 'text',
    textFillColor: 'transparent'
  },
  successRatioBox: {
    width: 63,
    height: 32,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      position: 'absolute',
      borderRadius: 8,
      background: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
      opacity: (props: any) => props.darkMode ? 0.1 : 0.2,
    },
    '& p': {
      fontSize: 14,
      lineHeight: '18px',
      color: (props: any) => props.darkMode ? 'black' : 'white'
    }
  }
}));

const Leaderboard: React.FC = () => {
  const [darkMode] = useDarkModeManager();
  const classes = useStyles({ darkMode });
  const { account } = useWeb3();
  const theme = useTheme();
  const mobileWindowSize = useMediaQuery(theme.breakpoints.down('xs'));

  const leaderItems = [
    {
      rank: 1,
      user: '0x6EEE30E5eCd010ce35d167C649c89ee9E990D391',
      totalPL: 124001.04,
      optionsPL: 100002.01,
      vaultsPL: 23999.03,
      successratio: 100,
    },
    {
      rank: 2,
      user: '0x6EEE30E5eCd010ce35d167C649c89ee9E990D391',
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
      user: '0x6EEE30E5eCd010ce35d167C649c89ee9E990D391',
      totalPL: 124001.04,
      optionsPL: 100002.01,
      vaultsPL: 23999.03,
      successratio: 100,
    },
    {
      rank: 5,
      user: '0x6EEE30E5eCd010ce35d167C649c89ee9E990D391',
      totalPL: 124001.04,
      optionsPL: 100002.01,
      vaultsPL: 23999.03,
      successratio: 100,
    },
    {
      rank: 6,
      user: '0x6EEE30E5eCd010ce35d167C649c89ee9E990D391',
      totalPL: -22341.01,
      optionsPL: -23631.40,
      vaultsPL: 1929.41,
      successratio: 96,
    },
    {
      rank: 7,
      user: '0x6EEE30E5eCd010ce35d167C649c89ee9E990D391',
      totalPL: -22341.01,
      optionsPL: -23631.40,
      vaultsPL: 1929.41,
      successratio: 96,
    },
    {
      rank: 8,
      user: '0x6EEE30E5eCd010ce35d167C649c89ee9E990D391',
      totalPL: -22341.01,
      optionsPL: -23631.40,
      vaultsPL: 1929.41,
      successratio: 96,
    },
    {
      rank: 9,
      user: '0x6EEE30E5eCd010ce35d167C649c89ee9E990D391',
      totalPL: -22341.01,
      optionsPL: -23631.40,
      vaultsPL: 1929.41,
      successratio: 96,
    },
    {
      rank: 10,
      user: '0x6EEE30E5eCd010ce35d167C649c89ee9E990D391',
      totalPL: -22341.01,
      optionsPL: -23631.40,
      vaultsPL: 1929.41,
      successratio: 96,
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
              <Box mb={2} className={cx(classes.mobileItem, account === user.toLowerCase() && 'meRow')}>
                {account === user.toLowerCase() &&
                  <Box className={classes.meBack} width={1} height={1}>
                    <img src={LeaderMe} alt='Me' />
                    <Typography>Me</Typography>
                  </Box>
                }
                <Container fixed>
                  <Box
                    width={1}
                    display='flex'
                    pl={1}
                    justifyContent='space-between'
                    alignItems='center'
                    position='relative'
                  >
                    <Box className={cx(
                      classes.rankBox,
                      rank === 1 && classes.firstRank,
                      rank === 2 && classes.secondRank,
                      rank === 3 && classes.thirdRank
                    )}>
                      { (rank === 1 || rank === 2 || rank === 3) && <Box width={1} height={1} />}
                      { rank === 1 && <img src={PrizeFirst} alt='Prize First' />}
                      { rank === 2 && <img src={PrizeSecond} alt='Prize Second' />}
                      { rank === 3 && <img src={PrizeThird} alt='Prize Third' />}
                      <Typography>
                        {rank !== 1 && rank !== 2 && rank !== 3 && '#'}
                        {rank}
                      </Typography>
                    </Box>
                    <Box className={classes.mobileAddressContainer}>
                      <Typography>
                        { shortenAddress(user) }
                      </Typography>
                      <Box className={classes.successRatioBox}>
                        <Box width={1} height={1} />
                        <Typography className={cx(account !== user.toLowerCase() && classes.callText)}>{successratio}%</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                  <Box className={classes.cardRow}>
                    <Typography color='textSecondary'>
                      Total P&L
                    </Typography>
                    <Typography className={leaderItem.totalPL > 0 ? classes.callText : classes.putText}>
                      {totalPL >= 0 ? '+' : '-'}${formatNumber(Math.abs(totalPL))}
                    </Typography>
                  </Box>
                  <Box className={classes.cardRow}>
                    <Typography color='textSecondary'>
                      Option P&L
                    </Typography>
                    {optionsPL >= 0 ? '+' : '-'}${formatNumber(Math.abs(optionsPL))}
                  </Box>
                  <Box className={classes.cardRow}>
                    <Typography color='textSecondary'>
                      Vaults P&L
                    </Typography>
                    {vaultsPL >= 0 ? '+' : '-'}${formatNumber(Math.abs(vaultsPL))}
                  </Box>
                </Container>
              </Box>
            );
          })}
        </>
      ) : (
        <Box className={classes.leaderTable}>
          <DataTable
            headCells={headCells}
            data={leaderItems}
            sortUpIcon={<UpArrow />}
            sortDownIcon={<DownArrow />}
            rowPerPage={25}
            showEmptyRows={false}
            renderRow={(leaderItem: any, index) => {
              return (
                <TableRow key={index} className={cx(account === leaderItem.user.toLowerCase() && 'meRow')}>
                  <TableCell>
                    {account === leaderItem.user.toLowerCase() &&
                      <Box width={1} height={1} className={classes.meBack}>
                        <img src={LeaderMe} alt='Me' />
                        <Typography>Me</Typography>
                      </Box>
                    }
                    <Box className={cx(
                      classes.rankBox,
                      leaderItem.rank === 1 && classes.firstRank,
                      leaderItem.rank === 2 && classes.secondRank,
                      leaderItem.rank === 3 && classes.thirdRank
                    )}>
                      { (leaderItem.rank === 1 || leaderItem.rank === 2 || leaderItem.rank === 3) && <Box width={1} height={1} />}
                      { leaderItem.rank === 1 && <img src={PrizeFirst} alt='Prize First' />}
                      { leaderItem.rank === 2 && <img src={PrizeSecond} alt='Prize Second' />}
                      { leaderItem.rank === 3 && <img src={PrizeThird} alt='Prize Third' />}
                      <Typography>
                        {leaderItem.rank !== 1 && leaderItem.rank !== 2 && leaderItem.rank !== 3 && '#'}
                        {leaderItem.rank}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {shortenAddress(leaderItem.user)}
                  </TableCell>
                  <TableCell>
                    <Box className={leaderItem.totalPL > 0 ? classes.callText : classes.putText}>
                      {leaderItem.totalPL >= 0 ? '+' : '-'}${formatNumber(Math.abs(leaderItem.totalPL))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {leaderItem.optionsPL >= 0 ? '+' : '-'}${formatNumber(Math.abs(leaderItem.optionsPL))}
                  </TableCell>
                  <TableCell>
                    {leaderItem.vaultsPL >= 0 ? '+' : '-'}${formatNumber(Math.abs(leaderItem.vaultsPL))}
                  </TableCell>
                  <TableCell>
                    <Box className={classes.successRatioBox}>
                      <Box width={1} height={1} />
                      <Typography className={cx(account !== leaderItem.user.toLowerCase() && classes.callText)}>{leaderItem.successratio}%</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            }}
          />
        </Box>
      )}
    </>
  );
};

export default Leaderboard;
