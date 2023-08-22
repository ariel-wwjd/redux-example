import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  OutlinedInput,
} from '@mui/material';
import clsx from 'clsx';

import { SEARCH_LETTERS_QUANTITY } from '../../../app/constants';
import useStyles from './styles';

interface AttachItemsLayoutProps {
  searchPlaceholder: string;
  itemsSelected: boolean;
  allSelected: boolean;
  grid: JSX.Element;
  selectAllCallback: () => void;
  onChangeCallback: (...args: [string]) => void;
}

const AttachItemsLayout: React.FC<AttachItemsLayoutProps> = ({
  searchPlaceholder,
  itemsSelected,
  allSelected,
  grid,
  selectAllCallback,
  onChangeCallback,
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');

  const debouncedChangeHandler = useCallback(
    debounce(onChangeCallback, 1000),
    [],
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setInputValue(value);

    debouncedChangeHandler.cancel();

    if (value.length > SEARCH_LETTERS_QUANTITY) {
      debouncedChangeHandler(value);
    }
  };

  return (
    <div>
      <div className="mb-2">
        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            name="inputValue"
            placeholder={searchPlaceholder}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
        </FormControl>
      </div>
      <div className="mb-2">
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
      </div>
      <Grid container className={clsx('scrollbar pb-6', classes.content)}>
        {grid}
      </Grid>
    </div>
  );
};

export default AttachItemsLayout;
