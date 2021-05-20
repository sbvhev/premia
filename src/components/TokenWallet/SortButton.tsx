import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    filterWrapper: {
      padding: 8,
      backgroundColor: theme.bg2,
      color: theme.text1,
      borderRadius: 8,
      userSelect: 'none',

      '& > *': {
        userSelect: 'none',
      },

      '&:hover': {
        cursor: 'pointer',
      },
    },
  }),
);

export default function SortButton({
  toggleSortOrder,
  ascending,
}: {
  toggleSortOrder: () => void;
  ascending: boolean;
}) {
  const classes = useStyles();

  return (
    <span className={classes.filterWrapper} onClick={toggleSortOrder}>
      <Typography variant='body1'>{ascending ? '↑' : '↓'}</Typography>
    </span>
  );
}
