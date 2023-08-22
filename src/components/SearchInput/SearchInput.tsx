import React, { ReactElement, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  InputAdornment,
  Button,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { SEARCH_LETTERS_QUANTITY } from '../../app/constants';
import useStyles from './styles';

export interface SearchInputProps {
  type?: string; // Type of object that will be search
  options: {
    // eslint-disable-next-line
    [key: string]: any;
  }[]; // Dataset of options that will be displayed in the popover
  placeholder?: string; // Initial string that will be displayed as the input placeholder
  loading?: boolean; // Loading status for the component
  optionIcon?: ReactElement; // Icon that is displayed by the option label
  labelField: string; // Index of the object that will contain the label that will be displayed in the option
  totalCount?: number; // Total count of the remaining results of the dataset
  onChangeCallback: (...args: [string]) => void; // Triggers whenever the input is changed by the keyboard
  // eslint-disable-next-line
  onSelectCallback: (...args: [any]) => void; // Triggers when the user selects an option
  onSearchCallback: (...args: [string]) => void; // Triggers when the user click on the search button or show more button
  onClearCallback?: () => void; // Triggers when the user click on the clear button
}

const SearchInput: React.FC<SearchInputProps> = ({
  type,
  options,
  placeholder,
  loading = false,
  optionIcon,
  labelField,
  totalCount,
  onChangeCallback,
  onSelectCallback,
  onSearchCallback,
  onClearCallback,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const classes = useStyles();

  const debouncedChangeHandler = useCallback(
    debounce(onChangeCallback, 1000),
    [],
  );

  const handleInputChange = (value: string): void => {
    setInputValue(value);

    debouncedChangeHandler.cancel();

    if (value.length > SEARCH_LETTERS_QUANTITY) {
      debouncedChangeHandler(value);
    }
  };

  const handleOnClear = (): void => {
    setInputValue('');
    if (onClearCallback) {
      onClearCallback();
    }
  };

  // eslint-disable-next-line
  const handleSelectClick = (option: any) => {
    setInputValue(option[labelField]);
    onSelectCallback(option);
    setOpen(false);
  };

  const handleSearchClick = (): void => {
    onSearchCallback(inputValue);
    setOpen(false);
  };

  return (
    <Autocomplete
      className={classes.container}
      open={open}
      onOpen={(): void => {
        setOpen(true);
      }}
      onClose={(): void => {
        setOpen(false);
      }}
      openOnFocus
      getOptionLabel={(option): string =>
        labelField ? option[labelField] : option.label
      }
      options={options}
      loading={loading}
      inputValue={inputValue}
      groupBy={(): string => (type ? `${type} suggestions` : 'Suggestions')}
      clearOnBlur={false}
      onInputChange={(event, newInputValue): void => {
        handleInputChange(newInputValue);
      }}
      renderOption={(props, option): ReactElement => (
        <Box
          component="li"
          {...props}
          onClick={(): void => handleSelectClick(option)}
        >
          {optionIcon}
          <Typography className={classes.optionLabel} variant="subtitle2">
            {labelField ? option[labelField] : option.label}
          </Typography>
        </Box>
      )}
      // eslint-disable-next-line
      PaperComponent={(props): any => {
        return (
          <Paper className={classes.paperContainer} {...props}>
            {props.children}
            {options.length > 0 && (
              <Box className={classes.showMore} onClick={handleSearchClick}>
                <SearchIcon />
                <Typography className={classes.optionLabel} variant="subtitle2">
                  {`Show more (${totalCount} results)`}
                </Typography>
              </Box>
            )}
          </Paper>
        );
      }}
      renderInput={(params): ReactElement => (
        <TextField
          {...params}
          placeholder={placeholder || 'Search items'}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            className: classes.input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {!loading ? (
                  <>
                    <Button
                      className={classes.clearButton}
                      variant="text"
                      onClick={handleOnClear}
                    >
                      Clear
                    </Button>
                    <Button
                      className={classes.searchButton}
                      variant="contained"
                      onClick={handleSearchClick}
                    >
                      Search
                    </Button>
                  </>
                ) : null}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchInput;
