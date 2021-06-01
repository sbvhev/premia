import React, { useState } from 'react';
import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Box,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
  Grid,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import { ExpandMore, Check } from '@material-ui/icons';
import { ReactComponent as Help } from 'assets/svg/Help.svg';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as WBTCIcon } from 'assets/svg/wBTCIcon.svg';
import { ReactComponent as ETHIcon } from 'assets/svg/EthIcon.svg';
import { ReactComponent as YFIIcon } from 'assets/svg/YFIIcon.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import { ReactComponent as VaultBlueIcon } from 'assets/svg/VaultBlue.svg';
import { ReactComponent as VaultGreenIcon } from 'assets/svg/VaultGreen.svg';
import { ReactComponent as VaultRedIcon } from 'assets/svg/VaultRed.svg';
import { TooltipPan } from 'components';
import { useIsDarkMode } from 'state/user/hooks';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  borderedCard: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 28,
    marginRight: 32,
    width: 340,
    border: `1px solid ${palette.divider}`,
    boxShadow: (props: any) =>
      props.dark ? 'none' : '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',

    [breakpoints.down('md')]: {
      width: '100%',
      marginRight: 0,
    },
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    textAlign: 'start',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
  },
  smallInfoText: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '24px',
    paddingLeft: 8,
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
    justifyContent: 'flex-end',
    height: '230px',
    margin: '22px 0 0',
  },
  borderedInput: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    height: '46px',
    width: '100%',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    padding: '13px 50px 13px 36px',
    color: palette.text.primary,
    zIndex: 2,
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  inputIcon: {
    position: 'relative',
    top: -36,
    left: 14,
    width: 20,
    height: 22,
    zIndex: 1,

    '& path': {
      fill: (props: any) => (props.dark ? '' : palette.secondary.main),
    },
  },
  maxButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    height: 34,
    zIndex: 3,
  },
  elementHeader: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& svg': {
      marginRight: 8,
      width: 16,
      height: 16,
    },
  },
  rightCard: {
    paddingTop: 28,
    width: 'calc(100% - 375px)',

    [breakpoints.down('md')]: {
      width: '100%',
    },

    '& $title': {
      marginBottom: 12,
      height: 20,
    },
  },
  vaultCard: {
    height: '100%',
    borderRadius: 12,
    background: 'rgba(82, 148, 255, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 2,

    '& > svg': {
      width: 90,
      height: 90,
      marginBottom: 18,
      zIndex: 4,
    },

    '& h2': {
      zIndex: 4,
    },

    '&.selected': {
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        margin: -2,
        borderRadius: 'inherit',
        background: `linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)`,
      },

      '& $background': {
        zIndex: 0,
      },

      '& $riskTitle': {
        color: 'white',

        '& path': {
          fill: 'white',
        },
      },

      '& $subTitle': {
        color: 'white',
      },

      '& $select': {
        zIndex: 4,
        background: palette.background.paper,
      },
    },

    '&:hover': {
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        margin: -2,
        borderRadius: 'inherit',
        background: `linear-gradient(to right, #5294FF, #1EFF78)`,
      },
    },

    [breakpoints.down('md')]: {
      flexDirection: 'row',
      padding: 20,

      '& > svg': {
        marginBottom: 0,
        minWidth: 80,
        minHeight: 80,
      },
    },
  },
  select: {
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: (props: any) => (props.dark ? 'white' : 'black'),
    background: palette.background.paper,
    fontSize: 14,
    lineHeight: '18px',
    borderRadius: 9,
    height: 40,
    width: 140,
    display: 'flex',
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    cursor: 'pointer',

    '& svg': {
      width: 16,
      height: 16,
      marginRight: 8,
      marginBottom: 0,
    },

    '&:hover': {
      background: palette.background.paper,
      border: 'transparent',
    },

    [breakpoints.down('md')]: {
      height: 32,
      marginTop: 4,
      width: '100%',
    },
  },
  background: {
    background: (props: any) => (props.dark ? '#080f19' : '#e2eaf6'),
    borderRadius: 11,
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  riskTitle: {
    color: '#646464',
    fontSize: 14,
    lineHeight: '18px',

    '& svg': {
      width: 14,
      height: 14,
      position: 'relative',
      top: -2,

      '& path': {
        fill: '#646464',
      },
    },
  },
  subTitle: {
    fontWeight: 'bold',
    marginTop: -4,
    fontSize: 16,
    lineHeight: '18px',
  },
  expandMore: {
    marginRight: 8,
    position: 'absolute',
    right: 0,
    cursor: 'pointer',

    '& path': {
      fill: palette.secondary.main,
    },
  },
}));

const BasicVault: React.FC = () => {
  const dark = useIsDarkMode();
  const classes = useStyles({ dark });
  const theme = useTheme();
  const [coin, setCoin] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const [lowRiskAnchorEl, setLowRiskAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [mediumRiskAnchorEl, setMediumRiskAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [highRiskAnchorEl, setHighRiskAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    const coin = event.target.value;
    setCoin(coin);
  };

  return (
    <Grid container direction={!mobile ? 'row' : 'column'}>
      <Box className={classes.borderedCard}>
        <Box className={classes.titleBox}>
          <Box>
            <Typography
              component='h2'
              color='textPrimary'
              className={classes.title}
            >
              Deposit Details
            </Typography>
          </Box>
        </Box>
        <Box className={classes.topSection}>
          <Box className={classes.col}>
            <Box
              display='flex'
              style={{ margin: '0 8px 2px', justifyContent: 'flex-start' }}
            >
              <Typography
                component='p'
                color='textPrimary'
                className={classes.elementHeader}
              >
                Select asset
              </Typography>
            </Box>
          </Box>
          <Box className={classes.col}>
            <Box width='100%' height='46px'>
              <FormControl variant='outlined' fullWidth>
                <Select
                  IconComponent={() => {
                    return <ExpandMore className={classes.expandMore} />;
                  }}
                  value={coin}
                  onChange={handleChange}
                >
                  <MenuItem className={classes.menuItem} value='WBTC'>
                    <WBTCIcon />
                    <Typography component='span'>WBTC</Typography>
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value='UNI'>
                    <UniswapIcon />
                    <Typography component='span'>UNI</Typography>
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value='LINK'>
                    <LinkIcon />
                    <Typography component='span'>LINK</Typography>
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value='YFI'>
                    <YFIIcon />
                    <Typography component='span'>YFI</Typography>
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value='ETH'>
                    <ETHIcon />
                    <Typography component='span'>ETH</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box className={classes.col}>
            <Box
              className={classes.horizontalBox}
              style={{ margin: '10px 8px 0', width: 'calc(100% - 16px)' }}
            >
              <Typography
                component='p'
                color='textPrimary'
                className={classes.elementHeader}
              >
                Select amount
              </Typography>
            </Box>

            <Box width='100%' height='46px' style={{ position: 'relative' }}>
              <input
                value={'100'}
                onChange={() => {}}
                className={classes.borderedInput}
              />
              <UniswapIcon className={classes.inputIcon} />
              <Button
                color='primary'
                variant='outlined'
                size='small'
                className={classes.maxButton}
              >
                MAX
              </Button>
            </Box>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.smallInfoText}
            >
              {'Max size available: 8,912'}
            </Typography>
          </Box>

          <Box className={classes.horizontalBox} style={{ marginTop: '12px' }}>
            <Button color='primary' variant='contained' size='large' fullWidth>
              Deposit
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className={classes.rightCard}>
        <Grid container style={{ height: '100%' }}>
          <Typography
            component='h2'
            color='textPrimary'
            className={classes.title}
          >
            Select vault
          </Typography>
          <Grid
            container
            direction='row'
            style={{ height: 'calc(100% - 18px)' }}
            spacing={2}
          >
            <Grid item md={4} sm={12} xs={12}>
              <Box
                className={cn(
                  classes.vaultCard,
                  selectedIndex === 1 ? 'selected' : '',
                )}
                onClick={() => {
                  setSelectedIndex(1);
                }}
              >
                <Box className={classes.background} />
                <VaultBlueIcon />
                <Grid
                  container
                  direction='column'
                  alignItems={!mobile ? 'center' : 'flex-start'}
                  style={{ paddingLeft: mobile ? 20 : 0 }}
                >
                  <Typography
                    className={classes.riskTitle}
                    component='h2'
                    variant='body2'
                  >
                    Low risk
                    <IconButton
                      onMouseEnter={(event: React.MouseEvent<HTMLElement>) =>
                        setLowRiskAnchorEl(event.currentTarget)
                      }
                      onMouseLeave={() => setLowRiskAnchorEl(null)}
                    >
                      <Help />
                    </IconButton>
                    <TooltipPan
                      open={!!lowRiskAnchorEl}
                      anchorEl={lowRiskAnchorEl}
                    >
                      <Typography
                        component='h2'
                        color='textPrimary'
                        variant='body2'
                        style={{ marginBottom: '0.5rem' }}
                      >
                        <b>
                          Low risk position
                          <br />
                          has exposure to:
                        </b>
                      </Typography>
                      <Typography
                        component='h2'
                        color='textSecondary'
                        variant='body2'
                      >
                        ETH price
                        <br />
                        ETH volatility
                        <br />
                        Call option spreads
                        <br />
                        Lending rate
                      </Typography>
                    </TooltipPan>
                  </Typography>
                  <Typography
                    className={classes.subTitle}
                    component='h2'
                    color='textPrimary'
                  >
                    10% Expected APY
                  </Typography>
                  <Box className={classes.select}>
                    {selectedIndex === 1 && <Check />}
                    {selectedIndex === 1 ? 'Selected' : 'Select'}
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Box
                className={cn(
                  classes.vaultCard,
                  selectedIndex === 2 ? 'selected' : '',
                )}
                onClick={() => {
                  setSelectedIndex(2);
                }}
              >
                <Box className={classes.background} />
                <VaultGreenIcon />
                <Grid
                  container
                  direction='column'
                  alignItems={!mobile ? 'center' : 'flex-start'}
                  style={{ paddingLeft: mobile ? 20 : 0 }}
                >
                  <Typography
                    className={classes.riskTitle}
                    component='h2'
                    variant='body2'
                  >
                    Medium risk
                    <IconButton
                      onMouseEnter={(event: React.MouseEvent<HTMLElement>) =>
                        setMediumRiskAnchorEl(event.currentTarget)
                      }
                      onMouseLeave={() => setMediumRiskAnchorEl(null)}
                    >
                      <Help />
                    </IconButton>
                    <TooltipPan
                      open={!!mediumRiskAnchorEl}
                      anchorEl={mediumRiskAnchorEl}
                    >
                      <Typography
                        component='h2'
                        color='textPrimary'
                        variant='body2'
                        style={{ marginBottom: '0.5rem' }}
                      >
                        <b>
                          Medium risk position
                          <br />
                          has exposure to:
                        </b>
                      </Typography>
                      <Typography
                        component='h2'
                        color='textSecondary'
                        variant='body2'
                      >
                        ETH price
                        <br />
                        ETH volatility
                        <br />
                        Call option spreads
                        <br />
                        Lending rate rate
                      </Typography>
                    </TooltipPan>
                  </Typography>
                  <Typography
                    className={classes.subTitle}
                    component='h2'
                    color='textPrimary'
                  >
                    20% Expected APY
                  </Typography>
                  <Box className={classes.select}>
                    {selectedIndex === 2 && <Check />}
                    {selectedIndex === 2 ? 'Selected' : 'Select'}
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Box
                className={cn(
                  classes.vaultCard,
                  selectedIndex === 3 ? 'selected' : '',
                )}
                onClick={() => {
                  setSelectedIndex(3);
                }}
              >
                <Box className={classes.background} />
                <VaultRedIcon />
                <Grid
                  container
                  direction='column'
                  alignItems={!mobile ? 'center' : 'flex-start'}
                  style={{ paddingLeft: mobile ? 20 : 0 }}
                >
                  <Typography
                    className={classes.riskTitle}
                    component='h2'
                    variant='body2'
                  >
                    High risk
                    <IconButton
                      onMouseEnter={(event: React.MouseEvent<HTMLElement>) =>
                        setHighRiskAnchorEl(event.currentTarget)
                      }
                      onMouseLeave={() => setHighRiskAnchorEl(null)}
                    >
                      <Help />
                    </IconButton>
                    <TooltipPan
                      open={!!highRiskAnchorEl}
                      anchorEl={highRiskAnchorEl}
                    >
                      <Typography
                        component='h2'
                        color='textPrimary'
                        variant='body2'
                        style={{ marginBottom: '0.5rem' }}
                      >
                        <b>
                          High risk position
                          <br />
                          has exposure to:
                        </b>
                      </Typography>
                      <Typography
                        component='h2'
                        color='textSecondary'
                        variant='body2'
                      >
                        ETH price
                        <br />
                        ETH volatility
                        <br />
                        Call option spreads
                        <br />
                        Lending rate
                      </Typography>
                    </TooltipPan>
                  </Typography>
                  <Typography
                    className={classes.subTitle}
                    component='h2'
                    color='textPrimary'
                  >
                    60% Expected APY
                  </Typography>
                  <Box className={classes.select}>
                    {selectedIndex === 3 && <Check />}
                    {selectedIndex === 3 ? 'Selected' : 'Select'}
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default BasicVault;
