import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Chip } from '@mui/material';
import clsx from 'clsx';

import CircularProgressWithLabel from '../CircularProgressWithLabel';
import useStyles from './styles';

interface MetricsCardProps {
  title: string; // Main text of the card in the left part
  value: number; // Main value of the card in the left part
  percentage: number; // Percentage of value x total devices
  colorPallete: {
    // Colors that will be used to customize the card
    [key: string]: string;
  };
  extrainfo?: string; // Info inside the chip component in the left part
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  percentage,
  colorPallete,
  extrainfo,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [mainValue, _setMainValue] = useState<number>(value);
  const classes = useStyles({ backgroundColor: colorPallete.backgroundColor });

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= percentage ? percentage : prevProgress + 1,
      );
      // setMainValue((prevMainValue) =>
      //   prevMainValue >= value
      //     ? value
      //     : prevMainValue + Math.round(value / percentage),
      // );
    }, 50);
    return (): void => {
      clearInterval(timer);
    };
  }, [percentage]);

  return (
    <Paper elevation={0} className={clsx('p-6 br-4', classes.card)}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="caption">{title}</Typography>
          <Typography variant="h4">{mainValue}</Typography>
          {extrainfo && (
            <Chip
              label={<Typography variant="caption">{extrainfo}</Typography>}
              className={clsx('py-1 px-2 br-1', classes.chip)}
            />
          )}
        </Grid>
        <Grid item xs={6} className={classes.lastChild}>
          <CircularProgressWithLabel
            value={progress}
            progressMainColor={colorPallete.progressMainColor}
            progressSecondaryColor={colorPallete.progressSecondaryColor}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MetricsCard;
