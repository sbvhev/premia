import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  TextField,
  Box,
} from '@material-ui/core';
import { ReactComponent as Search } from 'assets/svg/Search.svg';
import { useIsDarkMode } from 'state/user/hooks';
import { ReactComponent as FireIcon } from 'assets/svg/FireIcon.svg';

export interface SwitchProps {
  items: any[];
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  searchField: {
    color: '#646464',
    margin: '0 7px',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: '10px 10px 8px',
    },

    '& .MuiOutlinedInput-root': {
      paddingRight: 0,
      height: 42,
      borderColor: (props: any) =>
        props.dark ? 'transparent' : theme.palette.divider,

      '& input': {
        '&:focus::placeholder': {
          color: 'transparent',
        },
      },
    },

    '& .MuiIconButton-root': {
      padding: '12px 12px 12px 0',
      '&:hover': {
        background: 'transparent',
      },
    },

    '& input': {
      fontSize: 14,
      paddingLeft: 10,
      color: (props: any) => (props.dark ? '' : '#8D97A0'),
    },

    '& label': {
      top: -6,
    },

    '& > div': {
      background: (props: any) => (props.dark ? '#181818' : 'white'),
    },

    '& path': {
      fill: (props: any) => (props.dark ? '#646464' : '#8D97A0'),
    },
  },
  tab: {
    position: 'relative',
    opacity: 1,
    color: theme.palette.text.secondary,
    '& svg:first-child path': {
      fill: theme.palette.text.secondary,
    },
    '&.Mui-selected svg:first-child path': {
      fill: theme.palette.primary.main,
    },
    '& svg:nth-child(2)': {
      position: 'absolute',
      top: 6,
      right: 0,
    },
  },
  box: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    background: theme.palette.background.paper,
    border: (props: any) => props.dark && `1px solid ${theme.palette.divider}`,
    boxShadow: (props: any) =>
      props.dark ? 'none' : '0px 2px 5px rgba(0, 0, 0, 0.07)',
  },
  fireIcon: {
    position: 'absolute',
    right: '-2px !important',
    top: '-8px !important',

    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
  },
}));

const SearchTabs: React.FC<SwitchProps> = ({ items, value, onChange }) => {
  const dark = useIsDarkMode();
  const classes = useStyles({ dark });

  return (
    <Box component='div' className={classes.box}>
      <Tabs variant='scrollable' value={value} onChange={onChange}>
        {items.map((val, index) => {
          const Icon = val.image;
          return (
            <Tab
              key={index}
              className={classes.tab}
              icon={
                <>
                  <Icon style={{ marginLeft: val.marginLeft }} />
                  {val.highlight && <FireIcon className={classes.fireIcon} />}
                </>
              }
              label={val.label}
            />
          );
        })}
      </Tabs>
      <TextField
        placeholder='Search...'
        variant='outlined'
        className={classes.searchField}
        InputLabelProps={{
          shrink: false,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment component='div' position='end'>
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchTabs;
