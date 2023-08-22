import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

import useStyles from './styles';

interface CircularProgressWithLabelProps {
  value: number; // Main value in the center of the progress
  progressMainColor?: string; // Color that will fill the progress bar
  progressSecondaryColor?: string; // Color that fills the fixed part of the progress bar
}

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({
  value,
  progressMainColor,
  progressSecondaryColor,
}) => {
  const classes = useStyles({ progressMainColor, progressSecondaryColor });

  return (
    <Box className={classes.box}>
      <CircularProgress
        className={classes.backgroundProgress}
        variant="determinate"
        size={78}
        thickness={4}
        value={100}
      />
      <CircularProgress
        className={classes.mainProgress}
        variant="determinate"
        size={78}
        thickness={4}
        value={value}
      />
      <Box className={classes.percentageBox}>
        <Typography
          variant="h5"
          component="div"
          color={progressMainColor}
        >{`${value}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
