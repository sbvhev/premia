import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  TextField,
  Box
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useIsDarkMode } from 'state/user/hooks';
import { ReactComponent as FireIcon } from 'assets/svg/FireIcon.svg';

export interface SwitchProps {
  items: any[];
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  searchField: {
    right: 5,
    top: 5,
    position: 'absolute',
    color: '#646464',

    '& label': {
      top: -6,
    },

    '& > div': {
      background: (props: any) => (props.dark ? '#181818' : 'white'),
    },

    '& path': {
      fill: '#646464',
    },
  },
  box: {
    width: '100%',
    position: 'relative',
    borderRadius: 12,
    border: '1px solid #212121'
  },
}));

const CustomTabs: React.FC<SwitchProps> = ({ items, value, onChange }) => {
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
              icon={
                <>
                  <Icon />
                  {val.highlight && <FireIcon />}
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

export default CustomTabs;
