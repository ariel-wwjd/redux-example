import React, { useState, useEffect, ReactElement } from 'react';
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Devices, Device } from '@edgeiq/edgeiq-api-js';

import TabsPage from '../../../components/TabsPage';
import { RootState } from '../../../redux/store';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import MetadataDrawer from '../../../components/RightDrawer/AttachMetadata/MetadataDrawer';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import { errorHighlight } from '../../../app/constants';
import { setActualDevice } from '../../../redux/reducers/devices.reducer';

const columns: GridColDef[] = [
  {
    field: 'key',
    headerName: 'Key',
    flex: 0.5,
    renderCell: (params: GridRenderCellParams): ReactElement => (
      <strong>{params.row.key}</strong>
    ),
  },
  { field: 'value', headerName: 'Value', flex: 0.5 },
];

interface MetadataListProps {
  [key: string]: string | unknown;
}

const DeviceMetadata: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [metadataList, setMetadataList] = useState<MetadataListProps[]>();
  const editableDevice = useAppSelector(
    (state: RootState) => state.devices.newDevice,
  );

  useEffect(() => {
    const auxArray = [];

    if (editableDevice?.metadata) {
      for (const [key, value] of Object.entries(editableDevice?.metadata)) {
        auxArray.push({ key, value });
      }
    }
    setMetadataList(auxArray);
  }, [editableDevice]);

  const handleAddMetadata = (metadata: MetadataListProps[]): void => {
    const metadataObj = metadata.length
      ? metadata.reduce(
          (prevMetadata, nextMetadata) => ({
            ...prevMetadata,
            [nextMetadata.key as string]: nextMetadata.value,
          }),
          { [metadata[0].key as string]: metadata[0].value },
        )
      : {};

    setOpen(false);
    setLoading(true);

    // TODO: Verify why the API doesn't accept remove metadata
    Devices.update({ ...editableDevice, metadata: metadataObj } as Device)
      .then((response) => {
        dispatch(setActualDevice(response));
        dispatch(
          setAlert({
            type: 'success',
            highlight: 'Metadata updated',
            message: 'Device metadata successfully updated.',
          }),
        );
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
  };

  return (
    <Box>
      <TabsPage
        columns={columns}
        rows={metadataList}
        addButtonLabel="Update Metadata"
        addButtonIcon={false}
        onAddClick={(): void => setOpen(true)}
        tableTitle="Metadata Added"
        loading={loading}
      />
      {metadataList && (
        <MetadataDrawer
          open={open}
          metadata={metadataList}
          handleCloseDrawer={(): void => setOpen(false)}
          onMetadataAdd={handleAddMetadata}
        />
      )}
    </Box>
  );
};

export default DeviceMetadata;
