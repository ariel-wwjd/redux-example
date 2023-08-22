import React from 'react';
import { Grid } from '@mui/material';
import clsx from 'clsx';

import SearchInput from '../SearchInput';
import { SearchInputProps } from '../SearchInput/SearchInput';
import useStyles from './styles';

interface SearchBoxProps extends SearchInputProps {
  content: React.ReactElement;
  hasSearchInput: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  content,
  hasSearchInput,
  type,
  labelField,
  options,
  loading,
  totalCount,
  optionIcon,
  onChangeCallback,
  onSelectCallback,
  onSearchCallback,
  onClearCallback,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={clsx('px-8 shadow', classes.container)}>
      <div className={clsx('py-6', classes.content)}>
        {content}
        {hasSearchInput && (
          <SearchInput
            type={type}
            labelField={labelField}
            options={options}
            loading={loading}
            totalCount={totalCount}
            optionIcon={optionIcon}
            onChangeCallback={onChangeCallback}
            onSelectCallback={onSelectCallback}
            onSearchCallback={onSearchCallback}
            onClearCallback={onClearCallback}
          />
        )}
      </div>
    </Grid>
  );
};

export default SearchBox;
