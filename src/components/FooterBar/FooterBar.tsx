import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';

import useStyles from './styles';

interface FooterBarProps {
  sticky?: boolean; // Prop that set the bar to be sticked to the bottom part (default: true)
  height?: string; // Height of the bar (default: 76px)
  initialElements?: ReactElement; // Components that will render in the left side of the bar
  endElements?: ReactElement; // Components that will render in the right side of the bar
}

const FooterBar: React.FC<FooterBarProps> = ({
  sticky = true,
  height = '76px',
  initialElements,
  endElements,
}) => {
  const classes = useStyles({ sticky, height });

  return (
    <Box className={clsx('p-4 shadow', classes.container)}>
      {initialElements}

      {endElements}
    </Box>
  );
};

export default FooterBar;
