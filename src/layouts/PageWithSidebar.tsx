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
    width: '100vw',
    marginLeft: 0,
    height: '100vh',
  },
  border: {
    borderBottom: (props: any) => (props.darkMode || !props.mobileSidebarHidden) && `1px solid ${palette.divider}`,
    boxShadow: (props: any) => props.darkMode ? 'none' : !props.mobileSidebarHidden ? '0px 1.73333px 25.1333px rgba(0, 0, 0, 0.0103512)' : '0px 2px 5px rgba(0, 0, 0, 0.0746353)'
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
  const classes = useStyles({ darkMode, mobileSidebarHidden });

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
        >
          <Box
            position='fixed'
            width={mobile ? 1 : 'calc(100vw - 210px)'}
            zIndex={10}
            bgcolor={
              !mobile ? 'transparent' : palette.background.paper
            }
            pt={mobile ? 1 : 3}
            px={mobile ? 0 : 3}
            className={cx(mobile && classes.border)}
            height={mobile ? '60px' : '72px'}
          >
            <Box width="100%" display="flex" justifyContent="center">
              <Box
                display="flex"
                width="100%"
                maxWidth="1280px"
                justifyContent={!mobile ? 'flex-end' : 'space-between'}
                alignItems='center'
                pr={!mobile ? 3 : 0}
              >
                {mobile && (
                  <Box display='flex' alignItems='center' justifyContent="space-between" width="100%">
                    <Box marginLeft="22px" marginTop="2px">
                      <img
                        src={darkMode ? MainLogo : MainLogoBlack}
                        alt='main logo'
                        style={{ height: '28px'}}
                      />
                    </Box>
                    <Grid style={{ height: '48px', marginRight: '6px'}}>
                      <IconButton
                        style={{ height: '48px', padding: 0 }}
                        onClick={() => setMobileSidebarHidden(!mobileSidebarHidden)}
                      >
                        <Hamburger
                          size={20}
                          color={theme.palette.text.secondary}
                          toggled={!mobileSidebarHidden}
                          toggle={setMobileSidebarHidden}
                        />
                      </IconButton>
                    </Grid>
                  </Box>
                )}
                {!mobile && (
                  <Box display="flex" justifySelf="flex-end" id="test" style={{ backgroundColor: 'transparent'}}>
                    <AccountButtons />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {mobile && !mobileSidebarHidden && (
            <Box
              width={mobile ? 1 : 'calc(100vw - 210px)'}
              position='relative'
              mt='60px'
              mb={mobile ? 0 : 7}
              height={1}
              maxHeight='calc(100vh - 160px)'
              style={{ backgroundColor: palette.background.paper }}
            >
              <Box p={!mobile ? 1 : 0}>
                <AccountButtons mobile />
              </Box>
              <Divider />
              <Box p={1} pl={1.25}>
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
                px={mobile ? 0 : 3}
                width={mobile ? 1 : 'calc(100vw - 210px)'}
                // mx='auto'
                mt={!mobile ? 11 : 10}
                mb={mobile ? 0 : 12}
              >
                <Container>{children}</Container>
                {mobile && (
                  <Box width='100%' zIndex={14}>
                    <Footer />
                  </Box>
                )}
              </Box>
              {!mobile && (
                <Box
                  position='fixed'
                  width='calc(100vw - 210px)'
                  bottom={0}
                  zIndex={14}
                  bgcolor={palette.background.default}
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
