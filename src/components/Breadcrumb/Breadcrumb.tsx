import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
  breadcrumb: {
    color: palette.text.primary,

    '&:hover': {
      color: palette.primary.main,
    },
    '&:-webkit-any-link': {
      color: palette.text.primary,
    },
  },
  pageTitle: {
    fontFamily: '"Teko"',
    fontWeight: 600,
    fontSize: 48,
    marginBottom: 32,
  },
  pageTitleMobile: {
    fontFamily: '"Teko"',
    fontWeight: 600,
    fontSize: '48px',
    margin: '82px 10px 16px',
  },
}));

export interface BreadcrumbStep {
  title: string;
  link?: string;
}

export interface BreadcrumbProps {
  steps: BreadcrumbStep[];
  mobile?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ steps, mobile }) => {
  const classes = useStyles();

  return (
    <Typography
      component='h2'
      variant='h3'
      color='textPrimary'
      className={!mobile ? classes.pageTitle : classes.pageTitleMobile}
    >
      {steps.map((step: BreadcrumbStep, index) => (
        <span key={index}>
          {step.link ? (
            <Link to={step.link} className={classes.breadcrumb}>
              {step.title}
            </Link>
          ) : (
            <React.Fragment>{step.title}</React.Fragment>
          )}

          {index < steps.length - 1 && ' / '}
        </span>
      ))}
    </Typography>
  );
};

export default Breadcrumb;
