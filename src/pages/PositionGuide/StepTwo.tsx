import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import cn from 'classnames';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import { ArrowDropUp as ArrowDropUpIcon } from '@material-ui/icons';
import { ColoredSlider } from 'components';
import { useIsDarkMode } from 'state/user/hooks';
import { ReactComponent as Decrease } from 'assets/svg/Decrease.svg';
import { ReactComponent as RemailStable } from 'assets/svg/RemailStable.svg';
import { ReactComponent as Increase } from 'assets/svg/Increase.svg';
import { StepProps } from './Stepper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selector: {
      padding: 22,
      borderBottom: `1px solid ${theme.palette.divider}`,

      [theme.breakpoints.down('md')]: {
        padding: '22px 10px',
      },
    },
    title: {
      fontSize: 18,
      lineHeight: '18px',
      fontWeight: 700,
      marginBottom: 18,

      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
      },
    },
    priceIcon: {
      color: theme.palette.success.dark,
    },
    assets: {
      display: 'flex',
      justifyContent: 'space-between',

      '& > div': {
        aspectRatio: '16/ 9',
        width: 'calc(33.33% - 10px)',

        [theme.breakpoints.down('md')]: {
          width: '100%',
          height: 85,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',

          '& svg': {
            width: 84,
            height: 84,
            marginTop: 0,
          },
        },
      },

      [theme.breakpoints.down('md')]: {
        justifyContent: 'start',
        flexDirection: 'column',
      },
    },
    asset: {
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',

      '& p': {
        lineHeight: '18px',
        fontWeight: 'bold',
        fontSize: 16,
        zIndex: 33,
      },

      '& > div': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background:
          'linear-gradient(316.57deg, #EB4A97 18.89%, #8C43F6 95.84%)',
        opacity: 0.1,
      },

      '& > svg': {
        zIndex: 3,
        marginTop: -20,
      },

      '&$selected': {
        color: theme.palette.background.paper,

        '& > div': {
          opacity: 1,
        },

        '& path': {
          fill: theme.palette.background.paper,
        },
      },
    },
    decrease: {
      '& > div': {
        background:
          'linear-gradient(316.57deg, #EB4A97 18.89%, #8C43F6 95.84%)',
      },
    },
    remailStable: {
      '& > div': {
        background:
          'linear-gradient(266.96deg, #EB7A4A 29.5%, #F643CF 117.72%)',
      },
    },
    increase: {
      '& > div': {
        background:
          'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
      },
    },
    selected: {},
    priceSelector: {
      padding: '18px 25px',
      display: 'flex',
      flexDirection: 'row',

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: '18px 10px',
      },
    },
    currentPricePercent: {
      background: `linear-gradient(121.21deg, ${theme.palette.success.main} 7.78%, ${theme.palette.success.dark} 118.78%)`,
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: 4,
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subText: {
      marginLeft: 8,
      fontSize: 14,
    },
    priceTitle: {
      fontSize: 16,
      lineHeight: '18px',
      fontWeight: 'bold',
    },
    priceSubTitle: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '12px',
      color: theme.palette.text.secondary,
    },
    dunno: {
      width: 170,
      height: 45,

      [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 45,
      },
    },
    rightPanel: {
      borderLeft: `1px solid ${theme.palette.divider}`,
      paddingLeft: 26,
      display: 'flex',
      alignItems: 'center',

      [theme.breakpoints.down('md')]: {
        paddingLeft: 0,
        borderLeft: 'none',
      },
    },
    currentPrice: {
      fontSize: 14,
      lineHeight: '24px',
      textAlign: 'right',
      color: theme.palette.text.secondary,

      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        lineHeight: '12px',
        marginTop: theme.spacing(1),
      },
    },
  }),
);

const StepTwo: React.FC<StepProps> = ({ activeStep }) => {
  const classes = useStyles();
  const [asset, setAsset] = useState('');
  const darkMode = useIsDarkMode();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const [strikePrice, setStrikePrice] = useState<number | number[]>(50);

  return (
    <>
      <Box component='div' className={classes.selector}>
        <Typography className={classes.title}>
          What would happen to asset price?
        </Typography>
        <Box className={classes.assets}>
          <Box
            className={cn(
              classes.asset,
              classes.decrease,
              asset === 'Decrease' ? classes.selected : '',
            )}
            onClick={() => setAsset('Decrease')}
          >
            <Box />
            <Decrease />
            <Typography>Decrease</Typography>
          </Box>
          <Box
            className={cn(
              classes.asset,
              classes.remailStable,
              asset === 'Remail stable' ? classes.selected : '',
            )}
            onClick={() => setAsset('Remail stable')}
          >
            <Box />
            <RemailStable />
            <Typography>Remail stable</Typography>
          </Box>
          <Box
            className={cn(
              classes.asset,
              classes.increase,
              asset === 'Increase' ? classes.selected : '',
            )}
            onClick={() => setAsset('Increase')}
          >
            <Box />
            <Increase />
            <Typography>Increase</Typography>
          </Box>
        </Box>
      </Box>
      {!!asset && (
        <Box className={classes.priceSelector}>
          <Box width={1} mt={1} pr={mobile ? 0 : 3}>
            <Grid
              container
              direction='row'
              justify={mobile ? 'center' : 'space-between'}
              style={{ textAlign: mobile ? 'center' : 'inherit' }}
            >
              <Box>
                <Typography color='textPrimary' className={classes.priceTitle}>
                  Where do you think the price will go?
                </Typography>
                <Typography
                  color='textSecondary'
                  className={classes.priceSubTitle}
                >
                  Decrease to what price?
                </Typography>
              </Box>
              <Box>
                <Typography
                  color='textSecondary'
                  className={classes.currentPrice}
                >
                  Current price
                </Typography>
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
            </Grid>

            <Box width={1}>
              <ColoredSlider
                min={50}
                max={1500}
                marks={[50, 1500].map((value) => ({
                  label: value,
                  value,
                }))}
                value={strikePrice}
                valueLabelDisplay='on'
                onChange={(event: any, value) => {
                  setStrikePrice(value);
                }}
              />
            </Box>
          </Box>
          <Box className={classes.rightPanel}>
            <Button
              variant='outlined'
              color='secondary'
              className={classes.dunno}
            >
              I don't know
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default StepTwo;
