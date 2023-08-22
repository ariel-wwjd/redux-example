import React, { ReactElement } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import clsx from 'clsx';

import { deviceTypeLabel } from '../../app/constants';
import ColoredBox from '../ColoredBox';
import { StatusTheme } from '../../models/common';

import useStyles from './styles';

interface ContentHeaderBasics {
  title: string; // Main title of the header
  image?: string; // Main image used at the side of the title
  tag?: string; // Tag used after the title
  tagTheme?: { [key: string]: StatusTheme }; // Color Theme of the tag
  subtitle?: string; // Text set below the title
  extraImage?: string; // Image set at the right part of the header, used most as the companies image
  extraTitle?: string; // Title set at the right part of the header, used most as the companies title
  extraSubtitle?: string; // Text set at the right part of the header, used most as the companies id
}

interface DeviceContentProps extends ContentHeaderBasics {
  contentType: 'device';
  profileName: string;
  profileType: string;
}

type ContentHeaderProps = DeviceContentProps;

const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  image,
  tag,
  tagTheme,
  subtitle,
  extraImage,
  extraTitle,
  extraSubtitle,
  contentType,
  profileName,
  profileType,
}) => {
  const classes = useStyles({ image, extraImage });

  const renderOverline = (): ReactElement | null => {
    switch (contentType) {
      case 'device':
        return (
          <Typography variant="overline">
            Profile:{' '}
            <span className={classes.overlineProfileName}>{profileName}</span>
            <DevicesIcon className={clsx('ml-2 mr-1', classes.overlineIcon)} />
            {deviceTypeLabel[profileType]}
          </Typography>
        );
      default:
        return null;
    }
  };

  const renderSubtitle = (): string => {
    switch (contentType) {
      case 'device':
        return `Unique Id: ${subtitle}`;
      default:
        return `Id: ${subtitle}`;
    }
  };

  return (
    <Grid item xs={12} className={clsx('px-8 pb-8', classes.container)}>
      <Box className={clsx(classes.imageBox)} />
      <Box className={clsx('px-6')}>
        <Box className={clsx('pb-5', classes.overline)}>{renderOverline()}</Box>

        <Box className={clsx(classes.titleContainer)}>
          <Typography variant="h3">{title}</Typography>
          {tag && tagTheme && (
            <ColoredBox
              className={clsx('ml-4', classes.tag)}
              type="heartbeat_status"
              value={tag}
              colorTheme={tagTheme[tag]}
            />
          )}
        </Box>

        {subtitle && (
          <Typography className={clsx(classes.subtitle)} variant="subtitle1">
            {renderSubtitle()}
          </Typography>
        )}
      </Box>

      <Box className={clsx('ml-a', classes.extraContainer)}>
        <Box className={clsx(classes.extraImage)} />
        <Box className={clsx('ml-2')}>
          <Typography variant="subtitle2">{extraTitle}</Typography>
          <Typography variant="overline">{extraSubtitle}</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default ContentHeader;
