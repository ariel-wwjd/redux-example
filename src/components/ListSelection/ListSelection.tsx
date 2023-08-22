import React, { ReactElement, useRef, useState } from 'react';
import {
  Grid,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MapIcon from '@mui/icons-material/Map';
import ReorderIcon from '@mui/icons-material/Reorder';
import DeleteIcon from '@mui/icons-material/Delete';
import clsx from 'clsx';

import { SortingOption } from '../../models/common';
import useStyles from './styles';

interface ListSelectionProps {
  sortingOptions: SortingOption[];
  viewsOptions: string[]; // Available options: 'list', 'grid', 'map'
  selectedSorting: SortingOption;
  selectedView: string;
  itemsSelected: boolean;
  allSelected: boolean;
  selectedActions?: ReactElement;
  deleteAction?: boolean;
  xPadding?: boolean;
  sortingCallback: (option: SortingOption) => void;
  selectAllCallback: () => void;
  selectViewCallback: (view: string) => void;
  deleteCallback?: () => void;
}

const ListSelection: React.FC<ListSelectionProps> = ({
  sortingOptions,
  viewsOptions,
  selectedSorting,
  selectedView,
  itemsSelected,
  allSelected,
  selectedActions,
  deleteAction = true,
  xPadding = true,
  sortingCallback,
  selectAllCallback,
  selectViewCallback,
  deleteCallback,
}) => {
  const classes = useStyles();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [openSortingMenu, setOpenSortingMenu] = useState(false);

  const handleOpenSortingMenu = (): void => {
    setOpenSortingMenu(true);
  };

  const handleCloseSortingMenu = (): void => {
    setOpenSortingMenu(false);
  };

  const hanldeMenuItem = (sortingOption: SortingOption) => (): void => {
    handleCloseSortingMenu();
    sortingCallback(sortingOption);
  };

  const handleViewSelected = (view: string) => (): void => {
    selectViewCallback(view);
  };

  const handleDeleteAction = (): void => {
    if (deleteCallback && itemsSelected) {
      deleteCallback();
    }
  };

  const renderSelectAllCheckbox = (): JSX.Element => (
    <FormControlLabel
      control={
        <Checkbox
          checked={allSelected}
          indeterminate={itemsSelected && !allSelected}
          onClick={selectAllCallback}
        />
      }
      label={allSelected ? 'Deselect All' : 'Select All'}
    />
  );

  return (
    <Grid
      item
      xs={12}
      className={clsx('py-6', classes.container, {
        ['px-8']: xPadding,
      })}
    >
      {!itemsSelected ? (
        <>
          <div className={classes.sortingContainer}>
            {selectedView === 'grid' && renderSelectAllCheckbox()}
            <Typography variant="overline" className={classes.sortLabel}>
              Sort by:
            </Typography>
            <Button
              ref={anchorRef}
              color="inherit"
              variant="text"
              type="button"
              endIcon={
                !openSortingMenu ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )
              }
              onClick={handleOpenSortingMenu}
            >
              <Typography
                variant="overline"
                className={clsx('ml-2', classes.selectedSorting)}
              >
                {selectedSorting.label}
              </Typography>
            </Button>
            <Menu
              anchorEl={anchorRef.current}
              open={openSortingMenu}
              onClose={handleCloseSortingMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              className={classes.sortingMenu}
            >
              {sortingOptions.map((sortionOption, index) => (
                <MenuItem
                  dense
                  key={index}
                  selected={sortionOption.value === selectedSorting.value}
                  onClick={hanldeMenuItem(sortionOption)}
                >
                  <Typography variant="button">
                    {sortionOption.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div>
            {viewsOptions.map((viewOption, index) => (
              <IconButton onClick={handleViewSelected(viewOption)} key={index}>
                {viewOption === 'map' && (
                  <MapIcon
                    color={selectedView === viewOption ? 'primary' : 'inherit'}
                  />
                )}
                {viewOption === 'list' && (
                  <ReorderIcon
                    color={selectedView === viewOption ? 'primary' : 'inherit'}
                  />
                )}
                {viewOption === 'grid' && (
                  <ViewModuleIcon
                    color={selectedView === viewOption ? 'primary' : 'inherit'}
                  />
                )}
              </IconButton>
            ))}
          </div>
        </>
      ) : (
        <div>
          {selectedView === 'grid' && renderSelectAllCheckbox()}
          {selectedActions}
          {deleteAction && (
            <Button
              className="ml-4"
              variant="outlined"
              size="medium"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteAction}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </Grid>
  );
};

export default ListSelection;
