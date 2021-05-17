import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@material-ui/core';
import { merge } from 'lodash';

// colors
const primary = '#5294FF';
const secondary = '#646464';
const black = '#343a40';
const white = '#ffffff';
const greyText = '#808191';

const buyGreen = '#67CB44';
const sellRed = '#EA3274';

const callGradientA = '#5294FF';
const callGradientB = '#1EFF78';

const putGradientA = '#EB4A97';
const putGradientB = '#8C43F6';

const background = '#141414';
const dividerGrey = 'rgba(228, 228, 228, 0.1)';

const warningLight = 'rgba(253, 200, 69, .3)';
const warningMain = 'rgba(253, 200, 69, .5)';
const warningDark = 'rgba(253, 200, 69, .7)';

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 8;

function createTheme(
  custom: any,
  options?: ThemeOptions | undefined,
  ...args: object[]
) {
  return createMuiTheme(merge(custom, options), ...args);
}

const theme = createTheme(
  {},
  {
    palette: {
      type: 'dark',
      primary: {
        main: primary,
        light: callGradientA,
        dark: callGradientB,
      },
      secondary: {
        main: secondary,
        light: putGradientA,
        dark: putGradientB,
      },
      grey: {
        400: '#808191',
      },
      common: {
        black,
        white,
      },
      warning: {
        light: warningLight,
        main: warningMain,
        dark: warningDark,
      },
      text: {
        primary: white,
        secondary: greyText,
      },
      background: {
        default: background,
        paper: background,
      },
      success: {
        main: buyGreen,
      },
      error: {
        main: sellRed,
      },
      divider: dividerGrey,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
    typography: {
      htmlFontSize: 16,
      fontFamily: 'Roboto Mono',
      fontSize: 14,
      h1: {
        fontSize: '3.42rem',
      },
      h2: {
        fontSize: '2.5rem',
      },
      h3: {
        fontSize: '1.4rem',
      },
      h4: {
        fontFamily: 'Inter',
        fontSize: '1.5rem',
      },
      h5: {
        fontFamily: 'Inter',
        fontSize: '1.25rem',
      },
      h6: {
        fontFamily: 'Inter',
        fontSize: '1rem',
      },
      subtitle1: {
        fontSize: '1.71rem',
      },
      subtitle2: {
        fontSize: '1.25rem',
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontFamily: 'Inter',
        fontSize: '0.85rem',
      },
    },
    spacing,
    breakpoints: {
      values: {
        xl,
        lg,
        md,
        sm,
        xs,
      },
    },
    overrides: {
      MuiInputBase: {
        root: {
          paddingLeft: '1rem',
        },
      },
      MuiInput: {
        underline: {
          '&::before': {
            borderColor: dividerGrey,
          },
        },
      },
      MuiInputLabel: {
        root: {
          fontSize: '0.85rem',
          padding: '0 4px 8px',
        },
        shrink: {
          color: primary,

          '&.MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(12px, 10px) scale(0.75)',
          },
        },
        outlined: {
          '&.MuiInputLabel-outlined': {
            transform: 'translate(8px, 20px) scale(1)',
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          border: `1px solid ${primary}`,
          borderRadius: 8,
          height: 48,
          padding: 4,
        },
        notchedOutline: {
          border: 'none',
        },
        input: {
          padding: 4,
        },
      },
      MuiFilledInput: {
        root: {
          paddingLeft: 0,
          background: 'rgba(228, 228, 228, 0.1)',
          height: 48,
          borderRadius: '8px !important',
          paddingTop: '0 !important',
        },
        underline: {
          '&::after': {
            borderBottom: 'none',
          },
          '&::before': {
            borderBottom: 'none',
          },
          '&:hover::before': {
            borderBottom: 'none',
          },
        },
        input: {
          paddingLeft: '24px',
        },
      },
      MuiSelect: {
        filled: {
          border: '1px solid black',
          backgroundColor: white,
          color: black,
          width: '100%',
          padding: '20px 12px 4px',
          marginLeft: 0,

          '&:focus': {
            borderRadius: 8,
            backgroundColor: white,
          },
        },
        iconFilled: {
          color: primary,
        },
        select: {
          borderRadius: 8,
          border: '1px solid transparent',
          background: 'rgba(228, 228, 228, 0.1)',
          marginLeft: '-1rem',
          padding: 8,

          '&:focus': {
            borderRadius: 8,
          },
        },
        icon: {
          right: 9,
        },
        selectMenu: {
          height: 32,
          display: 'flex',
          alignItems: 'center',
        },
      },
      MuiButtonGroup: {
        root: {
          borderRadius: 16,
        },
        contained: {
          boxShadow: 'none',
        },
        groupedContainedHorizontal: {
          '&:not(:last-child)': {
            borderRight: 'none',
          },
        },
        groupedHorizontal: {
          '&:not(:last-child) > div > div': {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          '&:not(:first-child) > div > div': {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        },
      },
      MuiTableCell: {
        root: {
          padding: '8px',
        },
      },
      MuiFab: {
        extended: {
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',

          '&.MuiFab-sizeSmall': {
            height: 28,
            padding: '0 0.75rem',
          },
        },
        sizeSmall: {
          padding: '0 1rem',
        },
      },
      MuiButton: {
        root: {
          fontWeight: 400,
          borderRadius: 16,
          textTransform: 'none',
          padding: '6px 1.25rem',
        },
        containedSecondary: {
          backgroundColor: 'transparent',
          borderColor: dividerGrey,

          '&:hover': {
            backgroundColor: primary,
          },
        },
        outlined: {
          borderColor: white,
        },
        outlinedSecondary: {
          borderColor: dividerGrey,
        },
        label: {
          color: white,
        },
        contained: {
          border: '1px solid black',
        },
      },
      MuiPaper: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
        rounded: {
          borderRadius: 16,
          border: `1px solid ${dividerGrey}`,
        },
      },
    },
  },
);

export default responsiveFontSizes(theme);
