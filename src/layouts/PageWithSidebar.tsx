import React, { useState } from 'react';
import { Box, Container, IconButton, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import MainLogo from 'assets/svg/MainLogo.svg';
import { AccountButtons, Sidebar, Footer } from 'components';
import Hamburger from 'hamburger-react'
import theme from 'theme';

const useStyles = makeStyles(({ palette }) => ({
  page: {
    backgroundColor: palette.background.default,
    width: 'calc(100% - 260px)',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 260
  },
  pageMobile: {
    width: '100vw',
    marginLeft: 0
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
    <Box bgcolor='background.default' overflow='auto'>
      <Grid container>
        { !mobile &&
          <Box position='fixed' left={0} width={260}>
            <Sidebar />
          </Box>
        }
        <Box
          id='test'
          className={cx(classes.page, mobile && classes.pageMobile)}
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
                      <Hamburger color={theme.palette.text.secondary} toggled={!mobileSidebarHidden} toggle={setMobileSidebarHidden} />
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

          { mobile &&
            <Box width={1} position='relative' style={{ marginBottom: 90 }} zIndex={100}>
              { !mobileSidebarHidden && <Box p={1}><AccountButtons mobile={true} /></Box> }
              { !mobileSidebarHidden && <Divider />}
              { !mobileSidebarHidden && <Box p={1}><Sidebar mobile={true} /></Box> }
            </Box>
          }

          { mobileSidebarHidden && 
            <Box py={1} px={3} width={1} mx='auto'>
              <Container style={mobile ? { display: 'flex', justifyContent: 'center', padding: '0', width: '100%' } : {}}>{children}</Container>
            </Box>
          }

          <Box position='absolute' width={1} bottom={0}>
            <Footer />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default PageWithSidebar;
