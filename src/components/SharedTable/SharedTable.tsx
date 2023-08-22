import React, { ChangeEvent } from 'react';
import { Grid, TableContainer, Table } from '@mui/material';
import clsx from 'clsx';

import SharedTableHeader from './SharedTableHeader';
import SharedTableBody from './SharedTableBody';
import useStyles from './styles';
import { TableColumn, TableItemType, TableSubItemsType } from '.';

interface TableProps {
  columns: TableColumn[];
  rows: TableItemType[];
  sortBy: string;
  sortDirection: 'desc' | 'asc';
  allSelected: boolean;
  loading: boolean;
  selectedItemsIds: string[];
  xPadding?: boolean;
  hasActionColumn?: boolean;
  subRows?: TableSubItemsType;
  onRequestSort: (property: string) => void;
  selectAllCallback: () => void;
  checkboxCallback: (
    id: string,
  ) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  hasNestedTable?: (item: TableItemType) => boolean;
  getRowSubItems?: (item: TableItemType) => void;
}

const SharedTable: React.FC<TableProps> = ({
  columns,
  rows,
  sortBy,
  sortDirection,
  allSelected,
  loading,
  selectedItemsIds,
  xPadding = true,
  hasActionColumn = false,
  subRows,
  onRequestSort,
  selectAllCallback,
  checkboxCallback,
  hasNestedTable,
  getRowSubItems,
}) => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      className={clsx('mb-9', {
        ['px-8']: xPadding,
      })}
    >
      <TableContainer
        component="div"
        className={clsx('shadow scrollbar br-1', classes.tableContainer)}
      >
        <Table
          stickyHeader
          aria-label="custom pagination table"
          className={clsx('p-6')}
        >
          <SharedTableHeader
            columns={columns}
            sortBy={sortBy}
            sortDirection={sortDirection}
            itemsSelected={selectedItemsIds.length !== 0}
            allSelected={allSelected}
            hasActionColumn={hasActionColumn}
            onRequestSort={onRequestSort}
            selectAllCallback={selectAllCallback}
          />
          <SharedTableBody
            columns={columns}
            rows={rows}
            loading={loading}
            selectedItemsIds={selectedItemsIds}
            hasActionColumn={hasActionColumn}
            subRows={subRows}
            checkboxCallback={checkboxCallback}
            hasNestedTable={hasNestedTable}
            getRowSubItems={getRowSubItems}
          />
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default SharedTable;
