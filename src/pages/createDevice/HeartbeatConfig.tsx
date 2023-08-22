import React, { useEffect, useState } from 'react';
import {
  Typography,
  FormControl,
  OutlinedInput,
  Grid,
  // Checkbox,
} from '@mui/material';
import clsx from 'clsx';

import timeHelpers from '../../helpers/timeHelpers';
import useStyles from './styles';

interface HeartbeatConfigProps {
  heartbeatPeriod?: number;
  heartbeatValues?: string[];
  onChangePeriod: (prop: string, period: number) => void;
  onChangeValues: (prop: string, values: string[]) => void;
}

const HeartbeatConfig: React.FC<HeartbeatConfigProps> = ({
  heartbeatPeriod,
  // heartbeatValues,
  onChangePeriod,
  // onChangeValues,
}) => {
  const classes = useStyles();

  const [period, setPeriod] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    if (heartbeatPeriod) {
      setPeriod(timeHelpers.getTimesFromSecs(heartbeatPeriod));
    }
  }, [heartbeatPeriod]);

  const handleChange =
    (prop: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      let minutes = 0;
      let hours = 0;
      let days = 0;
      if (prop === 'minutes') {
        minutes = parseInt(event.target.value) * 60;
      }
      if (prop === 'seconds') {
        hours = parseInt(event.target.value) * 3600;
      }
      if (prop === 'days') {
        days = parseInt(event.target.value);
      }
      onChangePeriod('heartbeat_period', days + minutes + hours);
    };

  return (
    <>
      <Typography
        variant="button"
        component="div"
        className={clsx('mb-1', classes.configTitle)}
      >
        Select frecuency
      </Typography>
      <Typography
        variant="overline"
        component="div"
        className={clsx('mb-4', classes.configSubtitle)}
      >
        Expect a report at least every
      </Typography>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="subtitle2" className="custom-label">
            Days
          </Typography>
          <FormControl variant="outlined" className={classes.heartbeatInput}>
            <OutlinedInput
              name="days"
              placeholder="Days"
              type="number"
              value={period.hours}
              onChange={handleChange('days')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2" className="custom-label">
            Hours
          </Typography>
          <FormControl
            variant="outlined"
            className={clsx('ml-1', classes.heartbeatInput)}
          >
            <OutlinedInput
              name="hours"
              placeholder="hours"
              type="number"
              value={period.minutes}
              onChange={handleChange('hours')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2" className="custom-label">
            Minutes
          </Typography>
          <FormControl
            variant="outlined"
            className={clsx('ml-1', classes.heartbeatInput)}
          >
            <OutlinedInput
              name="minutes"
              placeholder="minutes"
              type="number"
              value={period.minutes}
              onChange={handleChange('minutes')}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default HeartbeatConfig;
