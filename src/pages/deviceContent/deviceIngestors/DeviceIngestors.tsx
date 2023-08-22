import React, { useEffect, useState, ReactElement } from 'react';
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Devices, Ingestor } from '@edgeiq/edgeiq-api-js';

import TabsPage from '../../../components/TabsPage';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import { errorHighlight } from '../../../app/constants';

const columns: GridColDef[] = [
  {
    field: 'description',
    headerName: 'Ingestor Name',
    flex: 1,
    renderCell: (params: GridRenderCellParams): ReactElement => (
      <strong>{params.row.description}</strong>
    ),
  },
  { field: 'listener', headerName: 'Listener Type', flex: 0.5 },
  {
    field: 'handler',
    headerName: 'Handler Type',
    flex: 0.3,
  },
  { field: 'translator', headerName: 'Translator', flex: 0.3 },
];

const DeviceIngestors: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [_open, setOpen] = useState<boolean>(false);
  //TODO: change to redux list
  const [ingestorsList, setIngestorsList] = useState<Ingestor[]>();
  const editableDevice = useAppSelector(
    (state: RootState) => state.devices.newDevice,
  );

  useEffect(() => {
    if (editableDevice) {
      setLoading(true);

      Devices.getIngestors(editableDevice._id)
        .then((resDeviceIngestors) => {
          setIngestorsList(resDeviceIngestors);
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
        rows={ingestorsList}
        addButtonLabel="Add Ingestor"
        onAddClick={(): void => setOpen(true)}
        createButtonLabel="Create Ingestor"
        tableTitle="Ingestors attached"
        loading={loading}
      />
    </Box>
  );
};

export default DeviceIngestors;
