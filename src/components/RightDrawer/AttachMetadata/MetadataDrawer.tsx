import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import isEqual from 'lodash.isequal';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

import RightDrawer from '../RightDrawer';

interface MetadataListProps {
  [key: string]: string | unknown;
}

interface MetadataDrawerProps {
  open: boolean;
  metadata: MetadataListProps[];
  handleCloseDrawer: () => void;
  onMetadataAdd: (metadata: MetadataListProps[]) => void;
}

const MetadataDrawer: React.FC<MetadataDrawerProps> = ({
  open,
  metadata,
  handleCloseDrawer,
  onMetadataAdd,
}) => {
  const originalDevice = useAppSelector(
    (state: RootState) => state.devices.device,
  );
  const [metadataItems, setMetadataItems] =
    useState<MetadataListProps[]>(metadata);

  const handleAddMetadataCallback = (): void => {
    onMetadataAdd(metadataItems);
  };

  const handleChange =
    (index: number, key: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const auxArray = [...metadataItems];
      auxArray[index][key] = event.target.value;

      setMetadataItems(auxArray);
    };

  const addNewMetadata = (): void => {
    setMetadataItems([...metadataItems, { key: '', value: '' }]);
  };

  const handleCloseClick = (): void => {
    setMetadataItems(metadata);
    handleCloseDrawer();
  };

  const handleRemove = (index: number): void => {
    const auxArray = [...metadataItems];
    auxArray.splice(index, 1);

    setMetadataItems(auxArray);
  };

  return (
    <RightDrawer
      open={open}
      actionLabel="Update Metadata"
      title="Update Metadata"
      disableAction={isEqual(originalDevice?.metadata, metadata)}
      actionCallback={handleAddMetadataCallback}
      onCloseDrawer={handleCloseClick}
      content={
        <Box>
          {metadataItems.map((item, index) => (
            <Grid
              key={index}
              container
              direction="row"
              spacing={2}
              className="mt-2"
              alignItems="center"
            >
              <Grid item xs={5}>
                <Typography variant="subtitle2" className="custom-label">
                  Key Pair
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    name="name"
                    placeholder="Key"
                    type="text"
                    required={true}
                    value={item.key}
                    onChange={handleChange(index, 'key')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="subtitle2" className="custom-label">
                  Value
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    name="location"
                    placeholder="Value"
                    type="text"
                    required={true}
                    value={item.value}
                    onChange={handleChange(index, 'value')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={2} className="mt-6">
                <IconButton onClick={(): void => handleRemove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            size="medium"
            className="mt-4"
            onClick={addNewMetadata}
            startIcon={<AddIcon />}
          >
            Add new
          </Button>
        </Box>
      }
    />
  );
};

export default MetadataDrawer;
