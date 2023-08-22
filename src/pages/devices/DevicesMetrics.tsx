import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Stats } from '@edgeiq/edgeiq-api-js';

import MetricsCard from '../../components/MetricsCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setAlert } from '../../redux/reducers/alert.reducer';
import { RootState } from '../../redux/store';
import { errorHighlight } from '../../app/constants';
import parseFilters from '../../helpers/parseFilters';

interface MetricsLabelsProps {
  [key: string]: string;
}

interface MetricsColorProps {
  [key: string]: {
    [key: string]: string;
  };
}

interface MetricsDataProps {
  type: string;
  label: string;
  quantity: number;
  percetange: number;
  dailyGrowth: string;
  color: {
    [key: string]: string;
  };
}

//TODO: Create a file with utils?
const metricsLabels: MetricsLabelsProps = {
  as_expected: 'ONLINE',
  not_responsive: 'IDLE',
  inconsistent: 'OFFLINE',
  never_reported: 'NEVER REPORTED',
};

//TODO: Create a file with utils?
const metricsColor: MetricsColorProps = {
  as_expected: {
    backgroundColor: '#E6F8F3',
    progressMainColor: '#609884',
    progressSecondaryColor: '#CEE3DE',
  },
  not_responsive: {
    backgroundColor: '#FBF1D9',
    progressMainColor: '#EDB31E',
    progressSecondaryColor: '#FFE298',
  },
  inconsistent: {
    backgroundColor: '#FAECEB',
    progressMainColor: '#DE4F48',
    progressSecondaryColor: '#FFD4D2',
  },
  never_reported: {
    backgroundColor: '#ECF1F6',
    progressMainColor: '#2B4259',
    progressSecondaryColor: '#C6CFD8',
  },
};

const DevicesMetrics: React.FC<Record<string, unknown>> = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);

  const [metricsData, setMetricsData] = useState<MetricsDataProps[] | []>([]);

  const handleMetrics = (metrics: Record<string, number>): void => {
    const metricsArray = [];
    const totalDevices = Object.values(metrics).reduce((a, b) => a + b);

    for (const index in metrics) {
      metricsArray.push({
        type: index,
        label: metricsLabels[index],
        quantity: metrics[index],
        percetange: Math.round((100 * metrics[index]) / totalDevices),
        dailyGrowth: '+12',
        color: metricsColor[index],
      });
    }

    setMetricsData(metricsArray);
  };

  const dispatchError = (errorMessage: string): void => {
    dispatch(
      setAlert({
        type: 'error',
        highlight: errorHighlight,
        message: errorMessage,
      }),
    );
  };

  useEffect(() => {
    Stats.devicesByHeartbeat(parseFilters(filters.devices.filters ?? {}))
      .then(({ as_expected, inconsistent, not_responsive, never_reported }) => {
        handleMetrics({
          as_expected,
          inconsistent,
          not_responsive,
          never_reported,
        });
      })
      .catch((error) => {
        dispatchError(error.message);
      });
  }, [filters.devices.filters]);

  return (
    <Grid item xs={12} className="px-8 pt-6">
      <Grid container spacing={2}>
        {metricsData.map((metrics, key) => (
          <Grid item xs={3} key={key}>
            <MetricsCard
              key={key}
              title={metrics.label}
              value={metrics.quantity}
              percentage={metrics.percetange}
              colorPallete={metrics.color}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default DevicesMetrics;
