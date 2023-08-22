import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import clsx from 'clsx';

import useStyles from './styles';

interface SideTabsProps {
  tabs: {
    [key: string]: JSX.Element;
  };
  defaultTab: string;
}

const SideTabs: React.FC<SideTabsProps> = ({ tabs, defaultTab }) => {
  const classes = useStyles();
  const [chosenTab, setChosenTab] = useState<string>(defaultTab);

  const handleChooseConfig =
    (tab: string) =>
    (_event: React.MouseEvent<HTMLButtonElement>): void => {
      setChosenTab(tab);
    };

  return (
    <div className={clsx('mt-8', classes.container)}>
      <div className={clsx('pr-9', classes.optionsContainer)}>
        {Object.keys(tabs).map((label, index) => (
          <Button
            key={index}
            variant="text"
            disableElevation
            onClick={handleChooseConfig(label)}
            className={clsx('p-2 mb-6', classes.button, {
              [classes.buttonChosen]: chosenTab === label,
            })}
          >
            <Typography variant="caption" className={classes.buttonText}>
              {label}
            </Typography>
          </Button>
        ))}
      </div>
      <div className={clsx('pl-9', classes.contentContainer)}>
        {tabs[chosenTab]}
      </div>
    </div>
  );
};

export default SideTabs;
