import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  BottomNavigationAction,
} from '@material-ui/core';
import { SwitchTab, LineChart, RadialChart } from 'components';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';


import { PageWithSidebar } from 'layouts';

const Vault: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <PageWithSidebar>
      <Grid container direction='column'>
        <Box>
          <SwitchTab
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels={true}
          >
            <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
            <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
            <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
          </SwitchTab>
          <LineChart
            color='#BF47C3'
            data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
            categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            width={500}
            height={200}
          />
          <LineChart
            color='#14A887'
            data={[2345, 3423, 3323, 2643, 3234, 6432, 1234, 2345, 3423, 3323, 2643, 3234, 6432, 1234]}
            categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            width={500}
            height={200}
          />
          <RadialChart
            color='#1EFF78'
            secondaryColor='#5294FF'
            width={300}
            data={[67]}
          >
            <UniswapIcon />
            Pool size in Uni
            <Typography component='h5' variant='body2' color='textSecondary'>
              211305
            </Typography>
          </RadialChart>
          <RadialChart
            color='#EB4A97'
            secondaryColor='#8C43F6'
            width={300}
            data={[67]}
          >
            <DaiIcon />
            Pool size in Dai
            <Typography component='h5' variant='body2' color='textSecondary'>
              211305
            </Typography>
          </RadialChart>
        </Box>
      </Grid>
    </PageWithSidebar>
  );
};

export default Vault;
