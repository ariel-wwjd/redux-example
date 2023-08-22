import React, { MouseEvent } from 'react';
import { Box, Paper, Button } from '@mui/material';
import clsx from 'clsx';
import AddIcon from '@mui/icons-material/Add';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

import AttachTable from '../../components/AttachTable';

interface CardProps {
  columns: GridColDef[];
  rows?: GridRowsProp;
  addButtonLabel?: string;
  addButtonIcon?: boolean;
  onAddClick?: (event: MouseEvent) => void;
  createButtonLabel?: string;
  onCreateClick?: (event: MouseEvent) => void;
  tableTitle?: string;
  loading?: boolean;
}

const TabsPage: React.FC<CardProps> = ({
  columns,
  rows,
  addButtonLabel,
  addButtonIcon = true,
  onAddClick,
  createButtonLabel,
  onCreateClick,
  tableTitle,
  loading,
}) => {
  return (
    <Paper className={clsx('p-7 shadow br-1')}>
      <Box className="mb-7">
        {addButtonLabel && (
          <Button
            variant="contained"
            size="large"
            startIcon={addButtonIcon ? <AddIcon /> : ''}
            onClick={onAddClick}
          >
            {addButtonLabel}
          </Button>
        )}
        {createButtonLabel && (
          <Button
            variant="outlined"
            size="large"
            className="ml-4"
            onClick={onCreateClick}
          >
            {createButtonLabel}
          </Button>
        )}
      </Box>
      <AttachTable
        title={tableTitle}
        columns={columns}
        rows={rows}
        loading={loading}
      />
    </Paper>
  );
};

export default TabsPage;
