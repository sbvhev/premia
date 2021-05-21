import React, { useState } from 'react';
import cn from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Box,
  Typography,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  useMediaQuery,
  Grid,
  Paper,
} from '@material-ui/core';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as WBTCIcon } from 'assets/svg/wBTCIcon.svg';
import { ReactComponent as ETHIcon } from 'assets/svg/ETHIcon.svg';
import { ReactComponent as YFIIcon } from 'assets/svg/YFIIcon.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import { ReactComponent as VaultBlueIcon } from 'assets/svg/VaultBlue.svg';
import { ReactComponent as VaultGreenIcon } from 'assets/svg/VaultGreen.svg';
import { ReactComponent as VaultRedIcon } from 'assets/svg/VaultRed.svg';
import { ExpandMore, Check } from '@material-ui/icons';
import { findLastIndex } from 'lodash';

const useStyles = makeStyles(({ palette }) => ({
  borderedCard: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 28,
    marginRight: 32,
    width: 340,
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.default,
    borderRadius: '12px',
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
    padding: '13px 50px 13px 40px',
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
    top: -46,
    left: 14,
    width: 20,
    zIndex: 1,
  },
  maxButton: {
    position: 'relative',
    top: -60,
    left: 190,
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
    paddingTop: 32,
    width: 'calc(100% - 460px)',

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

    '& svg': {
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
        background: `linear-gradient(to right, #5294FF, #1EFF78)`,
      },

      '& $background': {
        zIndex: 0
      },

      '& $select': {
        zIndex: 4,
        background: 'black'
      }
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

      '& $select': {
        zIndex: 4,
      },
    },
  },
  select: {
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: 14,
    lineHeight: '18px',
    borderRadius: 9,
    height: 40,
    width: 140,
    display: 'flex',
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    cursor: 'pointer',

    '& svg': {
      width: 16,
      height: 16,
      marginRight: 8,
      marginBottom: 0
    },

    '&:hover': {
      background: 'black',
      border: 'transparent',
    },
  },
  background: {
    background: '#080f19',
    borderRadius: 12,
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

const BasicVault: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [coin, setCoin] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    const coin = event.target.value;
    setCoin(coin);
  };

  return (
    <Grid container direction='row'>
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
                    return <ExpandMore />;
                  }}
                  value={coin}
                  onChange={handleChange}
                  inputProps={{
                    name: 'age',
                  }}
                >
                  <MenuItem className={classes.menuItem} value='wBTC'>
                    <WBTCIcon />
                    <Typography component='span' color='textSecondary'>
                      Uni
                    </Typography>
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value='Uni'>
                    <UniswapIcon />
                    <Typography component='span' color='textSecondary'>
                      Uni
                    </Typography>
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value='Link'>
                    <LinkIcon />
                    <Typography component='span' color='textSecondary'>
                      Link
                    </Typography>
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value='YFI'>
                    <YFIIcon />
                    <Typography component='span' color='textSecondary'>
                      YFI
                    </Typography>
                  </MenuItem>
                  <MenuItem className={classes.menuItem} value='ETH'>
                    <ETHIcon />
                    <Typography component='span' color='textSecondary'>
                      Eth
                    </Typography>
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

            <Box width='100%' height='46px'>
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
            <Grid item xs={4}>
              <Box
                className={cn(
                  classes.vaultCard,
                  selectedIndex === 1 ? 'selected' : '',
                )}
              >
                <Box className={classes.background} />
                <VaultBlueIcon />
                <Typography
                  component='h2'
                  color='textSecondary'
                  variant='body2'
                >
                  Low risk
                </Typography>
                <Typography component='h2' color='textPrimary'>
                  10% Expected APY
                </Typography>
                <Box
                  className={classes.select}
                  onClick={() => {
                    setSelectedIndex(1);
                  }}
                >
                  { selectedIndex === 1 && <Check />}
                  { selectedIndex === 1 ? 'Selected' : 'Select' }
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                className={cn(
                  classes.vaultCard,
                  selectedIndex === 2 ? 'selected' : '',
                )}
              >
                <Box
                  className={classes.background}
                />
                <VaultGreenIcon />
                <Typography
                  component='h2'
                  color='textSecondary'
                  variant='body2'
                >
                  Medium risk
                </Typography>
                <Typography component='h2' color='textPrimary'>
                  20% Expected APY
                </Typography>
                <Box
                  className={classes.select}
                  onClick={() => {
                    setSelectedIndex(2);
                  }}
                >
                  { selectedIndex === 2 && <Check />}
                  { selectedIndex === 2 ? 'Selected' : 'Select' }
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                className={cn(
                  classes.vaultCard,
                  selectedIndex === 3 ? 'selected' : '',
                )}
              >
                <Box className={classes.background} />
                <VaultRedIcon />
                <Typography
                  component='h2'
                  color='textSecondary'
                  variant='body2'
                >
                  High risk
                </Typography>
                <Typography component='h2' color='textPrimary'>
                  60% Expected APY
                </Typography>
                <Box
                  className={classes.select}
                  onClick={() => {
                    setSelectedIndex(3);
                  }}
                >
                  { selectedIndex === 3 && <Check />}
                  { selectedIndex === 3 ? 'Selected' : 'Select' }
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default BasicVault;
