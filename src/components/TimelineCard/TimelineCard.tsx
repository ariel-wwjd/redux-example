import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import clsx from 'clsx';

import { StatusTheme } from '../../models/common';
import ColoredBox from '../ColoredBox';
import useStyles from './styles';

interface CardProps {
  title?: string; // Main text of the card
  tag?: string; // Tag set above the title
  tagTheme?: { [key: string]: StatusTheme }; // Color Theme of the tag
  caption?: string; // Text set below the title
  extraLabel?: string; // Extra actios label
  extraCallback?: () => void; // Triggers when the extra button is clicked
}

const TimelineCard: React.FC<CardProps> = ({
  title,
  tag,
  tagTheme,
  caption,
  extraLabel,
  extraCallback,
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx('py-4')}>
      {tag && tagTheme && (
        <ColoredBox
          className={clsx('mb-2', classes.tag)}
          type="activity"
          value={tag}
          colorTheme={tagTheme[tag]}
        />
      )}
      <Typography variant="subtitle1">{title}</Typography>
      <Typography className={clsx(classes.caption)} variant="overline">
        {caption}
      </Typography>
      {extraLabel && (
        <Box>
          <Button
            color="primary"
            variant="text"
            type="button"
            onClick={extraCallback}
            className={clsx('p-0')}
          >
            <Typography variant="overline">
              {extraLabel.toUpperCase()}
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TimelineCard;
