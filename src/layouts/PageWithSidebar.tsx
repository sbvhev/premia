import React, { useState } from 'react';
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
    width: 'calc(100% - 210px)',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
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
  const classes = useStyles();

  return (
    <Box bgcolor='background.default' overflow='auto'>
      <Grid container>
        {!mobile && (
          <Box position='fixed' left={0} width={210}>
            <Sidebar />
          </Box>
        )}
        <Box className={cx(classes.page, mobile && classes.pageMobile)}>
          {!hideAccountButtons && (
            <Box
              position='fixed'
              width={mobile ? 1 : 'calc(100% - 210px)'}
              zIndex={10}
              bgcolor={!mobile ? palette.background.default : palette.background.paper}
              p={mobile ? 1 : 3} px={mobile ? 1 : 3}
              className={cx(mobile && classes.border)}
              height={mobile ? "60px" : '96px'}
            >
              <Grid container justify='space-between' alignItems='center'>
                {mobile && (
                  <Box display="flex" alignItems="center" marginLeft="8px">
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
                      onClick={() =>
                        setMobileSidebarHidden(!mobileSidebarHidden)
                      }
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
          )}

          { mobile && !mobileSidebarHidden &&
            <Box
              width={1}
              position='relative'
              mt="60px" mb={mobile ? 8 : 7}
              style={{ backgroundColor: palette.background.paper}}
            >
              <Box p={!mobile ? 1 : 0}>
                <AccountButtons mobile />
              </Box>
              <Divider />
              <Box p={1}>
                <Sidebar mobile />
              </Box>
              <Divider />
              <Box p={1.5}>
                <ThemeSwitch />
              </Box>
              <Box
                borderBottom={`1px solid ${palette.divider}`}
                boxShadow={darkMode ? '' : '0px 2px 5px rgba(0, 0, 0, 0.0746353)'}
              />
            </Box>
          }

          {mobileSidebarHidden && (
            <Box
              px={mobile ? 0 : 3}
              width={1}
              mx='auto'
              mt={!mobile ? 14 : 10}
              mb={mobile ? 10 : 7}
              overflow="auto"
            >
              <Container>{children}</Container>
            </Box>
          )}

          <Box
            position='fixed'
            width={mobile ? 1 : 'calc(100% - 260px)'}
            bottom={0}
            zIndex={10}
            bgcolor='background.default'
          >
            <Footer />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default PageWithSidebar;
