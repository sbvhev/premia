import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import FireIcon from 'assets/svg/FireIcon.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from 'theme'

export interface SwitchProps {
  items: any[];
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const CustomTabs: React.FC<SwitchProps> = ({ items, value, onChange }) => {
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Tabs orientation={ mobile ? 'vertical' : 'horizontal' } value={value} onChange={onChange}>
      {
        items.map((val, index) => (
          <Tab key={index} icon={
            <>
              <img src={val.image} alt={val.label} />
              {
                val.highlight &&
                  <img src={FireIcon} alt='Highlight' />
              }
            </>
          } label={val.label} />
        ))
      }
    </Tabs>
  );
};

export default CustomTabs;
