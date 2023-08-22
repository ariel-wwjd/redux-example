import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  GatewayCommands,
  GatewayCommandsFilters,
  GatewayCommand,
} from '@edgeiq/edgeiq-api-js';

import TabsPage from '../../../components/TabsPage';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import { errorHighlight } from '../../../app/constants';
import timeHelpers from '../../../helpers/timeHelpers';

const columns: GridColDef[] = [
  { field: 'device_unique_id', headerName: 'Policy Name', flex: 1 },
  {
    field: 'created_at',
    headerName: 'Date created',
    flex: 0.5,
    renderCell: (params: GridRenderCellParams): ReactElement => (
      <span>{timeHelpers.getPlainDate(params.row.created_at)}</span>
    ),
  },
  {
    field: 'command_type',
    headerName: 'Type',
    flex: 0.3,
  },
  { field: 'issuer', headerName: 'Issuer', flex: 0.3 },
  {
    field: 'gateway_status',
    headerName: 'Gateway Status',
    flex: 0.3,
    renderCell: (params: GridRenderCellParams): ReactElement => (
      <span>{params.row.statuses[params.row.device_unique_id].status}</span>
    ),
  },
  { field: 'endpoint_status', headerName: 'Endpoint Status', flex: 0.3 },
];

const DeviceCommands: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [_open, setOpen] = useState<boolean>(false);
  //TODO: change to redux list
  const [commandsList, setCommandsList] = useState<GatewayCommand[]>();
  const editableDevice = useAppSelector(
    (state: RootState) => state.devices.newDevice,
  );

  useEffect(() => {
    if (editableDevice) {
      setLoading(true);

      const filters: GatewayCommandsFilters = {
        device_id: {
          operator: 'eq',
          value: editableDevice._id,
        },
      };

      GatewayCommands.list(filters)
        .then((resCommands) => {
          setCommandsList(resCommands.gatewayCommands);
        })
        .catch((err) => {
          dispatch(
            setAlert({
              type: 'error',
              highlight: errorHighlight,
              message: err.message,
            }),
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [editableDevice]);

  return (
    <Box>
      <TabsPage
        columns={columns}
        rows={commandsList}
        addButtonLabel="Add Command"
        onAddClick={(): void => setOpen(true)}
        tableTitle="Commands added"
        loading={loading}
      />
    </Box>
  );
};

export default DeviceCommands;
