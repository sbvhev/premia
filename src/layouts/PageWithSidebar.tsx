import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton, Grid, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hamburger from 'hamburger-react';
import cx from 'classnames';
import { useDarkModeManager } from 'state/user/hooks';
import MainLogoBlack from 'assets/svg/MainLogoBlack.svg';
import MainLogo from 'assets/svg/MainLogo.svg';
import { AccountButtons, Sidebar, Footer, ThemeSwitch } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  page: {
    backgroundColor: palette.background.default,
    width: 'calc(100vw - 210px)',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    overflowX: 'hidden',
    flexDirection: 'column',
    marginLeft: 210,
  },
  pageMobile: {
    backgroundColor: palette.background.paper,
    width: '100vw',
    marginLeft: 0,
  },
  border: {
    borderBottom: `1px solid ${palette.divider}`,
  },
}));

export interface PageWithSidebarProps {
  children: any;
  hideAccountButtons?: boolean;
}

const PageWithSidebar: React.FC<PageWithSidebarProps> = ({
  children,
  hideAccountButtons = false,
}) => {
  const [mobileSidebarHidden, setMobileSidebarHidden] = useState(true);
  const theme = useTheme();
  const { palette } = theme;
  const [darkMode] = useDarkModeManager();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();

  const hideMobileMenu = () => {
    setMobileSidebarHidden(true);
  };

  useEffect(() => {
    if (!mobile && !mobileSidebarHidden) {
      setMobileSidebarHidden(true);
    }
  }, [mobile, mobileSidebarHidden]);

  return (
    <Box bgcolor='background.default'>
      <Grid container>
        {!mobile && (
          <Box position='fixed' left={0} width={210}>
            <Sidebar />
          </Box>
        )}

        <Box
          className={cx(classes.page, mobile && classes.pageMobile)}
          id='test1'
        >
          <Box
            position='fixed'
            width={mobile ? 1 : 'calc(100vw - 210px)'}
            zIndex={10}
            bgcolor={
              !mobile ? palette.background.default : palette.background.paper
            }
            p={mobile ? 1 : 3}
            px={mobile ? 1 : tablet ? 0 : 3}
            className={cx(mobile && classes.border)}
            height={mobile ? '60px' : '96px'}
          >
            <Grid container justify='space-between' alignItems='center'>
              {mobile && (
                <Box display='flex' alignItems='center' marginLeft='8px'>
                  <img
                    src={darkMode ? MainLogo : MainLogoBlack}
                    alt='main logo'
                  />
                </Box>
              )}
              <Grid style={{ height: '48px' }}>
                {mobile && (
                  <IconButton
                    style={{ height: '48px' }}
                    onClick={() => setMobileSidebarHidden(!mobileSidebarHidden)}
                  >
                    <Hamburger
                      color={theme.palette.text.secondary}
                      toggled={!mobileSidebarHidden}
                      toggle={setMobileSidebarHidden}
                    />
                  </IconButton>
                )}
              </Grid>
              {!mobile && (
                <Grid item>
                  <AccountButtons />
                </Grid>
              )}
            </Grid>
          </Box>

          {mobile && !mobileSidebarHidden && (
            <Box
              width={mobile ? 1 : 'calc(100vw - 210px)'}
              position='relative'
              mt='60px'
              mb={mobile ? 0 : 7}
              height='555px'
              maxHeight='calc(100vh - 160px)'
              style={{ backgroundColor: palette.background.paper }}
            >
              <Box p={!mobile ? 1 : 0}>
                <AccountButtons mobile />
              </Box>
              <Divider />
              <Box p={1}>
                <Sidebar mobile onHide={hideMobileMenu} />
              </Box>
              <Divider />
              <Box p={1.5}>
                <ThemeSwitch />
              </Box>
              <Box
                borderBottom={`1px solid ${palette.divider}`}
                boxShadow={
                  darkMode ? '' : '0px 2px 5px rgba(0, 0, 0, 0.0746353)'
                }
              />
            </Box>
          )}

          {mobileSidebarHidden && (
            <>
              <Box
                px={tablet ? 0 : 3}
                width={mobile ? 1 : 'calc(100vw - 210px'}
                mx='auto'
                mt={!mobile ? 14 : 10}
                mb={mobile ? 10 : 7}
                // overflow='scroll'
              >
                <Container>{children}</Container>
              </Box>
              {!mobile ? (
                <Box
                  position='fixed'
                  width='calc(100vw - 210px)'
                  bottom={0}
                  zIndex={14}
                  bgcolor={palette.background.default}
                >
                  <Footer />
                </Box>
              ) : (
                <Box
                  position='fixed'
                  width='100%'
                  bgcolor={palette.background.default}
                  bottom={0}
                  zIndex={14}
                >
                  <Footer />
                </Box>
              )}
            </>
          )}

          {mobile && !mobileSidebarHidden && (
            <Box position='fixed' width='100%' bottom={0} zIndex={14}>
              <Footer />
            </Box>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default PageWithSidebar;
