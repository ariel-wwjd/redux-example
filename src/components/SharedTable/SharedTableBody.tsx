import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography,
  Link,
  Checkbox,
  Collapse,
  Table,
  TableHead,
  IconButton,
} from '@mui/material';
import {
  KeyboardArrowDown as DownIcon,
  FiberManualRecord as DotIcon,
} from '@mui/icons-material';
import clsx from 'clsx';

import useStyles from './styles';
import { TableColumn, TableItemType, TableSubItemsType } from '.';

interface TableBodyProps {
  columns: TableColumn[];
  rows: TableItemType[];
  loading: boolean;
  selectedItemsIds: string[];
  hasActionColumn?: boolean;
  subRows?: TableSubItemsType;
  checkboxCallback: (
    id: string,
  ) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  hasNestedTable?: (item: TableItemType) => boolean;
  getRowSubItems?: (item: TableItemType) => void;
}

const SharedTableBody: React.FC<TableBodyProps> = ({
  columns,
  rows,
  loading,
  selectedItemsIds,
  hasActionColumn,
  subRows,
  checkboxCallback,
  hasNestedTable,
  getRowSubItems,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [idsWithSubrows, setIdsWithSubrows] = useState<string[]>([]);
  const [idsOpenedSubrows, setIdsOpenedSubrows] = useState<string[]>([]);

  useEffect(() => {
    if (hasNestedTable) {
      const ids: string[] = [];
      rows.forEach((row) => {
        if (hasNestedTable(row)) {
          ids.push(row._id);
        }
      });
      setIdsWithSubrows(ids);
    }
  }, [rows]);

  const goToLinkAction = (path: string) => (): void => {
    navigate(path);
  };

  const handleRowClick = (item: TableItemType) => (): void => {
    if (idsWithSubrows.includes(item._id)) {
      if (idsOpenedSubrows.includes(item._id)) {
        setIdsOpenedSubrows(idsOpenedSubrows.filter((id) => id !== item._id));
      } else {
        setIdsOpenedSubrows([...idsOpenedSubrows, item._id]);
      }
      if (getRowSubItems) {
        getRowSubItems(item);
      }
    }
  };

  const renderColumns = (
    row: TableItemType,
    parentRowId = '',
  ): ReactElement => (
    <>
      {columns.map((column: TableColumn) => (
        <TableCell
          key={`cell-${column.id}-${row._id}-${parentRowId}`}
          className={clsx({
            [classes.stickyCell]: column.stickyColumn,
          })}
        >
          {column.type === 'text' && column.cellValue && (
            <Typography variant="button" className={classes.tableText}>
              {column.cellValue(row)}
            </Typography>
          )}
          {column.type === 'link' && column.link && (
            <Link onClick={goToLinkAction(column.link(row))} underline="none">
              {column.linkDot && column.linkDot(row) && (
                <DotIcon className={classes.linkDot} />
              )}
              <Typography
                variant="button"
                className={clsx(classes.link, classes.tableText, {
                  [classes.boldLink]: column.isBold
                    ? column.isBold(row)
                    : false,
                })}
              >
                {column.cellValue && column.cellValue(row)}
              </Typography>
            </Link>
          )}
          {column.type === 'custom' && column.parser && column.parser(row)}
        </TableCell>
      ))}
    </>
  );

  return (
    <TableBody>
      {!loading &&
        rows.map((row: TableItemType, index) => (
          <React.Fragment key={`row-${row._id}`}>
            <TableRow
              className={clsx({
                [classes.nested]:
                  idsOpenedSubrows.includes(row._id) &&
                  idsWithSubrows.includes(row._id),
              })}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedItemsIds.includes(row._id)}
                  onChange={checkboxCallback(row._id)}
                  inputProps={{
                    'aria-labelledby': `table-checkbox-${index}`,
                  }}
                />
              </TableCell>
              {renderColumns(row)}
              {hasActionColumn && (
                <TableCell padding="checkbox">
                  {idsWithSubrows.includes(row._id) && (
                    <IconButton
                      aria-label="open-nested-list"
                      onClick={handleRowClick(row)}
                      size="small"
                    >
                      <DownIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
            {idsWithSubrows.includes(row._id) && (
              <TableRow
                className={clsx({
                  [classes.nested]: idsOpenedSubrows.includes(row._id),
                })}
              >
                <TableCell
                  colSpan={columns.length + 2}
                  style={{ border: 'none' }}
                  className={clsx('p-0', {
                    [classes.centeredCell]: !subRows || !subRows[row._id],
                  })}
                >
                  <Collapse
                    in={idsOpenedSubrows.includes(row._id)}
                    timeout="auto"
                    unmountOnExit
                  >
                    {subRows && subRows[row._id] ? (
                      <Table className={classes.nestedTable}>
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            {columns.map((column: TableColumn) => (
                              <TableCell
                                key={`subcolumn-${row._id}-${column.id}`}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                            <TableCell padding="checkbox" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {subRows[row._id].map((subRow) => (
                            <TableRow key={`subrow-${row._id}-${subRow._id}`}>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={selectedItemsIds.includes(
                                    subRow._id,
                                  )}
                                  onChange={checkboxCallback(subRow._id)}
                                  inputProps={{
                                    'aria-labelledby': `table-checkbox-${index}`,
                                  }}
                                />
                              </TableCell>
                              {renderColumns(subRow, row._id)}
                              <TableCell padding="checkbox" />
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <CircularProgress size={50} thickness={5} />
                    )}
                  </Collapse>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      {loading && (
        <TableRow>
          <TableCell colSpan={columns.length} className={classes.centeredCell}>
            <CircularProgress size={50} thickness={5} />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default SharedTableBody;
