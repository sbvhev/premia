import React, { useState } from 'react';
import { Box, Container, Hidden, IconButton } from '@material-ui/core';
import { Menu, MenuOpen } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { AccountButtons, Sidebar } from 'components';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  page: {
    backgroundColor: palette.background.default,
    width: '100%',
    height: '100vh',
    overflowY: 'scroll',
    marginBottom: '4rem',

    [breakpoints.down('xs')]: ({
      mobileSidebarHidden,
    }: {
      mobileSidebarHidden: boolean;
    }) => ({
      width: mobileSidebarHidden ? '100%' : 'calc(100% - 80px)',
    }),

    [breakpoints.up('sm')]: {
      width: 'calc(100% - 80px)',
    },

    [breakpoints.up('md')]: {
      width: 'calc(100% - 260px)',
    },
  },
  pageMobile: {
    backgroundColor: palette.background.default,
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    marginBottom: '36px',
    
    [breakpoints.up('sm')]: {
      width: 'calc(100% - 80px)',
    },
  },
}));

export interface PageWithSidebarProps {
  children: any;
  hideAccountButtons?: boolean;
  mobile?: boolean;
}

const PageWithSidebar: React.FC<PageWithSidebarProps> = ({
  children,
  hideAccountButtons = false,
  mobile,
}) => {
  const [mobileSidebarHidden, setMobileSidebarHidden] = useState(true);
  const classes = useStyles({ mobileSidebarHidden });

  return (
    <Box bgcolor='background.default' overflow='scroll'>
      <Hidden smDown>
        <Box width={260} position='fixed'>
          <Sidebar />
        </Box>
      </Hidden>

      <Hidden mdUp>
        <Box
          width={80}
          position='fixed'
          zIndex={mobileSidebarHidden ? -1 : 100}
        >
          <Sidebar />
        </Box>
      </Hidden>

      <Hidden smUp>
        <Box
          width={40}
          position={mobileSidebarHidden ? 'fixed' : 'absolute'}
          top='16px'
          left='16px'
          zIndex={100}
        >
          <IconButton
            onClick={() => setMobileSidebarHidden(!mobileSidebarHidden)}
          >
            {mobileSidebarHidden ? <Menu color='action' /> : <MenuOpen />}
          </IconButton>
        </Box>
      </Hidden>

      <Box
        id='test'
        className={mobile ? classes.pageMobile : classes.page}
        position='fixed'
        top={0}
        left={{
          ...(mobileSidebarHidden ? { xs: 0, sm: 80 } : { xs: 80 }),
          md: 260,
        }}
      >
        {!hideAccountButtons && (
          <Box
            width={!mobile ? 450 : 460}
            position='fixed'
            top={0}
            right={0}
            mt={mobile ? 2 : 7}
            zIndex={10}
            marginRight={1}
          >
            <AccountButtons />
          </Box>
        )}

        <Box py={7} px={1} width={1} mx='auto' style={mobile ? { width: '100%', padding: '0 16px', marginBottom: '42px' } : {}}>
          <Container style={mobile ? { display: 'flex', justifyContent: 'center', padding: '0', width: '100%' } : {}}>{children}</Container>
        </Box>
      </Box>
    </Box>
  );
};

export default PageWithSidebar;
