import React, { ReactElement, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import clsx from 'clsx';

import useStyles from './styles';

interface SideTabsProps {
  tabs: {
    [key: string]: JSX.Element;
  };
  defaultTab: string;
  tabsLabel: {
    [key: string]: string;
  };
  padding?: boolean;
}

const VerticalTabs: React.FC<SideTabsProps> = ({
  tabs,
  defaultTab,
  tabsLabel,
  padding = true,
}) => {
  const classes = useStyles();
  const [chosenTab, setChosenTab] = useState<string>(defaultTab);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: string,
  ): void => {
    setChosenTab(newValue);
  };

  return (
    <Box>
      <Box
        className={clsx(classes.container, {
          ['px-8']: padding,
        })}
      >
        <Tabs
          value={chosenTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {Object.keys(tabs).map(
            (label, index): ReactElement => (
              <Tab key={index} label={tabsLabel[label]} value={label} />
            ),
          )}
        </Tabs>
      </Box>
      <Box className="px-8 py-8">{tabs[chosenTab]}</Box>
    </Box>
  );
};

export default VerticalTabs;
