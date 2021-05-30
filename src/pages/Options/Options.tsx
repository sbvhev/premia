import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { SearchTabs, WithdrawDepositModal } from 'components';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ReactComponent as WBTCIcon } from 'assets/svg/wBTCIcon.svg';
import { ReactComponent as UniIcon } from 'assets/svg/UniIcon.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import { ReactComponent as YFIIcon } from 'assets/svg/YFIIcon.svg';
import { ReactComponent as EthIcon } from 'assets/svg/EthIcon.svg';
import OptionsFilter from './OptionsFilter';
import OptionsPrice from './OptionsPrice';
import HelpIcon from '@material-ui/icons/Help';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { LineChart } from 'components';
import { useOptionType } from 'state/options/hooks';
import { useIsDarkMode } from 'state/user/hooks';
import { PageWithSidebar } from 'layouts';

const useStyles = makeStyles(({ palette }) => ({
  title: {
    fontSize: '28px',
    lineHeight: '27.5px',
    fontWeight: 700,
  },
  price: {
    fontSize: 18,
  },
  subText: {
    marginLeft: 8,
    fontSize: 14,
  },
  priceIcon: {
    color: palette.success.dark,
  },
  helpIcon: {
    color: palette.text.secondary,
    fontSize: 16,
    marginLeft: 4,
  },
  currentPricePercent: {
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 4,
  },
}));

const tabItems = [
  {
    image: WBTCIcon,
    label: 'wBTC',
  },
  {
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
  const [withdrawDepositModalOpen, setWithdrawDepositModalOpen] =
    useState(false);
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const [tokenIndex, setTokenIndex] = useState(2);
  const { optionType } = useOptionType();
  const darkMode = useIsDarkMode();

  return (
    <PageWithSidebar>
      {withdrawDepositModalOpen && (
        <WithdrawDepositModal
          open={withdrawDepositModalOpen}
          call={false}
          onClose={() => setWithdrawDepositModalOpen(false)}
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
      <Box mt={2} mb={4}>
        <SearchTabs
          items={tabItems}
          value={tokenIndex}
          onChange={(ev, index) => {
            setTokenIndex(index);
          }}
        />
      </Box>
      <Grid container>
        <Grid item container lg={9}>
          <Grid item xs={12} sm={6}>
            <Container fixed>
              <Box py={2} px={2}>
                <OptionsFilter />
              </Box>
            </Container>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={6}
            direction='column'
            justify='space-between'
          >
            <Box mx={2}>
              <Box py={1} pl={xs ? 1 : 3}>
                <Typography color='textSecondary'>Current Price</Typography>
                <Grid container alignItems='center'>
                  <Typography
                    color='textPrimary'
                    component='h2'
                    className={classes.price}
                  >
                    $1,222
                  </Typography>
                  <Box
                    position='relative'
                    display='flex'
                    alignItems='center'
                    ml={1}
                  >
                    <Box
                      width={1}
                      height={1}
                      style={{ opacity: darkMode ? 0.1 : 0.2 }}
                      className={classes.currentPricePercent}
                    ></Box>
                    <span className={classes.subText}>+13%</span>
                    <ArrowDropUpIcon className={classes.priceIcon} />
                  </Box>
                </Grid>
              </Box>
              <Box py={1} pl={xs ? 1 : 3}>
                <Typography color='textSecondary'>Breakeven</Typography>
                <Typography
                  color='textPrimary'
                  component='h2'
                  className={classes.price}
                >
                  $1,749.37
                </Typography>
              </Box>
              <Box py={1} pl={xs ? 1 : 3}>
                <Typography color='textSecondary'>Total cost</Typography>
                <Typography
                  color='textPrimary'
                  component='h2'
                  className={classes.price}
                >
                  $1,749.37
                </Typography>
              </Box>
              <Box py={1} pl={xs ? 0 : 3}>
                <Button
                  fullWidth
                  variant='contained'
                  size='large'
                  color={optionType === 'call' ? 'primary' : 'secondary'}
                  onClick={() => setWithdrawDepositModalOpen(true)}
                >
                  Buy Option
                </Button>
              </Box>
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
            <Box pt={3} px={tablet ? 0 : 3}>
              <Typography
                color='textPrimary'
                component='h2'
                className={classes.price}
              >
                Pool price level
              </Typography>
              <Grid container alignItems='center'>
                <Typography color='textSecondary'>Last 7 days</Typography>
                <HelpIcon className={classes.helpIcon} />
              </Grid>
              <LineChart
                color={
                  optionType === 'call'
                    ? theme.palette.success.dark
                    : theme.palette.error.main
                }
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
    </PageWithSidebar>
  );
};

export default Options;
