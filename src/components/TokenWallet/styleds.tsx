import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    paddedColumn: {
      padding: 20,
      paddingBottom: 12
    },

    searchInput: {
      position: 'relative',
      display: 'flex',
      padding: 16,
      alignItems: 'center',
      width: '100%',
      whiteSpace: 'nowrap',
      background: 'none',
      outline: 'none',
      borderRadius: 20,
      color: theme.text1,
      borderStyle: 'solid',
      border: `1px solid ${theme.bg3}`,
      '-webkit-appearance': 'none',
    
      fontSize: 18,
    
      '::placeholder': {
        color: theme.text3
      },

      transition: 'border 100ms',

      ':focus': {
        border: `1px solid ${theme.primary1}`,
        outline: 'none'
      }
    },

    separator: {
      width: '100%',
      height: 1,
      backgroundColor: theme.bg2
    }
  }),
);

export const PaddedColumn = (props: any) => {
  const classes = useStyles();
  return <div className={classes.paddedColumn}>{ props.children }</div>
};

export const SearchInput = (props: any) => {
  const classes = useStyles();
  return <input className={classes.searchInput}>{ props.children }</input>
}

export const Separator = (props: any) => {
  const classes = useStyles();
  return <div className={classes.separator}>{ props.children }</div>
}
