import React, { useState } from 'react';
import { Box, Container, IconButton, Grid } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import MainLogo from 'assets/svg/MainLogo.svg';
import { AccountButtons, Sidebar, Footer } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  page: {
    backgroundColor: palette.background.default,
    height: '100vh',
    overflowY: 'scroll',
    marginBottom: '4rem',
    width: 'calc(100% - 249px)',
  },
  pageMobile: {
    backgroundColor: palette.background.default,
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    marginBottom: '36px'
  },
  border: {
    borderBottom: `1px solid ${palette.divider}`
  }
}));

export interface PageWithSidebarProps {
  children: any;
  hideAccountButtons?: boolean;
  mobile?: boolean;
}

const PageWithSidebar: React.FC<PageWithSidebarProps> = ({
  children,
  hideAccountButtons = false,
  mobile = false,
}) => {
  const [mobileSidebarHidden, setMobileSidebarHidden] = useState(true);
  const classes = useStyles();

  return (
    <Box bgcolor='background.default' overflow='scroll'>
      <Box width={260} position='fixed' zIndex={100}>
        { (!mobile || !mobileSidebarHidden) && <Sidebar /> }
      </Box>

      <Box
        id='test'
        className={mobile ? classes.pageMobile : classes.page}
        position='fixed'
        top={0}
        left={mobile ? 0 : 260}
      >
        {!hideAccountButtons && (
          <Box p={mobile ? 1 : 3} px={mobile ? 2 : 3} className={cx(mobile && classes.border)}>
            <Grid container justify='space-between' alignItems='center'>
              {
                mobile &&
                  <Grid item>
                    <img src={MainLogo} alt='main logo' />
                  </Grid>
              }
              <Grid item>
                {mobile && 
                  <IconButton
                    onClick={() => setMobileSidebarHidden(!mobileSidebarHidden)}
                  >
                    <Menu color='action' />
                  </IconButton>
                }
              </Grid>
              {
                !mobile &&
                  <Grid item>
                    <AccountButtons />
                  </Grid>
              }
            </Grid>
          </Box>
        )}

        <Box py={1} px={3} width={1} mx='auto'>
          <Container style={mobile ? { display: 'flex', justifyContent: 'center', padding: '0', width: '100%' } : {}}>{children}</Container>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default PageWithSidebar;
