import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Chip,
  createFilterOptions,
  FilterOptionsState,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  CancelOutlined as CancelIcon,
} from '@mui/icons-material';
import clsx from 'clsx';

import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import useStyles from './styles';

const filter = createFilterOptions<string>();

interface DeviceTagsProps {
  deviceTags: string[];
  onChangeDeviceTags: (prop: string, tags: string[]) => void;
  canReset?: boolean;
}

const DeviceTags: React.FC<DeviceTagsProps> = ({
  deviceTags,
  onChangeDeviceTags,
  // canReset = false,
}) => {
  const classes = useStyles();
  const { userCompany } = useAppSelector((state: RootState) => state.user);
  const [value, setValue] = React.useState<string | null>(null);

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (userCompany) {
      setTags(userCompany.device_tags ?? []);
    }
  }, [userCompany]);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: string | null,
  ): void => {
    setValue(newValue);
  };

  const filterOptions = (
    options: string[],
    params: FilterOptionsState<string>,
  ): string[] => {
    const filtered = filter(options, params);

    const { inputValue } = params;
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option);
    if (inputValue !== '' && !isExisting) {
      filtered.push(inputValue);
    }

    return filtered;
  };

  const renderOption = (
    props: React.HtmlHTMLAttributes<HTMLElement>,
    option: string,
  ): React.ReactNode => <li {...props}>{option}</li>;

  const renderInput = (
    params: AutocompleteRenderInputParams,
  ): React.ReactNode => <TextField {...params} placeholder="Add a tag..." />;

  // Adds the value of the autocomplete to the deviceTags
  const addTag = (): void => {
    if (value) {
      // Making sure the same value doesn't exist on the device and then add it.
      const newTags = deviceTags.filter((tag) => tag !== value).concat(value);
      onChangeDeviceTags('tags', newTags);
      setTags(tags.filter((tag) => tag !== value));
      setValue(null);
    }
  };

  const removeTag = (tagToDelete: string) => (): void => {
    const newTags = deviceTags.filter((tag) => tag !== tagToDelete);
    onChangeDeviceTags('tags', newTags);
    setTags(tags.concat(tagToDelete));
  };

  return (
    <div className={classes.container}>
      <div className={clsx('mb-6', classes.inputContainer)}>
        <Autocomplete
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          freeSolo
          value={value}
          options={tags}
          className="mr-2"
          sx={{ width: 200 }}
          onChange={handleChange}
          filterOptions={filterOptions}
          renderInput={renderInput}
          renderOption={renderOption}
          getOptionLabel={(option): string => option}
        />
        <Button
          variant="outlined"
          size="large"
          startIcon={<AddIcon />}
          onClick={addTag}
        >
          <Typography variant="button">Add Tag</Typography>
        </Button>
      </div>
      <div>
        {deviceTags.map((tag) => (
          <Chip
            key={tag}
            className={clsx('br-5 mr-4', classes.chip)}
            label={
              <Typography variant="caption" component="span" color="white">
                {tag}
              </Typography>
            }
            onDelete={removeTag(tag)}
            deleteIcon={<CancelIcon className={classes.chipIcon} />}
          />
        ))}
      </div>
    </div>
  );
};

export default DeviceTags;
