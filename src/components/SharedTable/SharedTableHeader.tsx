import React from 'react';
import {
  TableRow,
  TableHead,
  TableSortLabel,
  TableCell,
  Checkbox,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import clsx from 'clsx';

import useStyles from './styles';
import { TableColumn } from '.';

interface TableHeaderProps {
  columns: TableColumn[];
  sortBy: string;
  sortDirection: 'desc' | 'asc';
  itemsSelected: boolean;
  allSelected: boolean;
  hasActionColumn?: boolean;
  onRequestSort: (property: string) => void;
  selectAllCallback: () => void;
}

const SharedTableHeader: React.FC<TableHeaderProps> = ({
  columns,
  sortBy,
  sortDirection,
  itemsSelected,
  allSelected,
  hasActionColumn,
  onRequestSort,
  selectAllCallback,
}) => {
  const classes = useStyles();

  const createSortHandler = (property: string) => (): void => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={allSelected}
            indeterminate={itemsSelected && !allSelected}
            onChange={selectAllCallback}
            inputProps={{
              'aria-label': allSelected ? 'Deselect All' : 'Select All',
            }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            sortDirection={sortDirection}
            className={clsx({
              [classes.stickyCell]: column.stickyColumn,
              [classes.stickyHeader]: column.stickyColumn,
            })}
          >
            {column.sortId ? (
              <TableSortLabel
                active={sortBy === column.sortId}
                onClick={createSortHandler(column.sortId ?? '')}
                IconComponent={ArrowDropDownIcon}
                direction={sortDirection}
                hideSortIcon={false}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
        {hasActionColumn && <TableCell padding="checkbox" />}
      </TableRow>
    </TableHead>
  );
};

export default SharedTableHeader;
