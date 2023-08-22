import React from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import clsx from 'clsx';

import useStyles from './styles';

interface BasicDialogProps {
  title?: string;
  columns: GridColDef[];
  rows?: GridRowsProp;
  loading?: boolean;
}

const AttachTable: React.FC<BasicDialogProps> = ({
  title,
  columns,
  rows,
  loading,
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography className="mb-7" variant="h5">
        {title}
      </Typography>

      <Box className={clsx(classes.tableContainer)}>
        <DataGrid
          className={clsx(classes.table)}
          rows={rows ? rows : []}
          columns={columns}
          pageSize={5}
          getRowId={(row): string => row._id || row.key}
          autoPageSize={true}
          disableSelectionOnClick
          disableColumnMenu
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default AttachTable;
