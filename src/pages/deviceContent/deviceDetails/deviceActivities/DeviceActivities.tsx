import React, { ReactElement, useState } from 'react';
import {
  Typography,
  Grid,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import clsx from 'clsx';

import TimelineCard from '../../../../components/TimelineCard';
import {
  activityColorThemeMap,
  activityFilterOptions,
} from '../../../../app/constants';
import useStyles from './styles';

interface DeviceActivitiesProps {
  onReportFiltersChange: (value: string) => void; // Triggers when the activity filter change
}

//TODO: Check avaiable routes at the API sdk
const deviceActivities = [
  {
    title: 'Activity example 1',
    type: 'error',
    date: 'Sep 8, 2021 @ 9:15am GMT',
  },
  {
    title: 'Activity example 2',
    type: 'alert',
    date: 'Sep 8, 2021 @ 9:15am GMT',
  },
  {
    title: 'Activity example 3',
    type: 'update',
    date: 'Sep 8, 2021 @ 9:15am GMT',
  },
];

const DeviceDetails: React.FC<DeviceActivitiesProps> = ({
  onReportFiltersChange,
}) => {
  const classes = useStyles();
  const [reportFilterValue, setReportFilterValue] = useState<string>('');

  const handleChangeReportFilter = (event: SelectChangeEvent): void => {
    setReportFilterValue(event.target.value);
    onReportFiltersChange(event.target.value);
  };

  return (
    <Grid
      item
      xs={3}
      className={clsx('p-7 ml-6 shadow br-1', classes.boxContainer)}
    >
      <Typography className={clsx('mb-4')} variant="h5">
        Device Activity
      </Typography>
      <Select
        displayEmpty
        value={reportFilterValue}
        onChange={handleChangeReportFilter}
        className={clsx('mb-4', classes.filter)}
      >
        <MenuItem className="m-4 p-2" dense value="">
          Filters
        </MenuItem>
        {activityFilterOptions.map(
          (filterOption, index): ReactElement => (
            <MenuItem
              dense
              key={index}
              value={filterOption.value}
              className="m-4 p-2"
            >
              {filterOption.label}
            </MenuItem>
          ),
        )}
      </Select>

      {deviceActivities.map((activity, index) => (
        <TimelineCard
          key={index}
          title={activity.title}
          tag={activity.type}
          tagTheme={activityColorThemeMap}
          caption={activity.date}
          extraLabel="View Details"
        />
      ))}
    </Grid>
  );
};

export default DeviceDetails;
