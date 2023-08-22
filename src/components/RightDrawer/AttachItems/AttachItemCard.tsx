import React, { ChangeEvent } from 'react';
import { Checkbox, Paper } from '@mui/material';
import clsx from 'clsx';

import useStyles from './styles';

interface AttachItemCardProps {
  content: JSX.Element;
  checked: boolean;
  id: string;
  checkboxCallback: (
    id: string,
  ) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const AttachItemCard: React.FC<AttachItemCardProps> = ({
  content,
  checked,
  id,
  checkboxCallback,
}) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={0}
      className={clsx('p-4 br-1', classes.card, {
        [classes.checkedCard]: checked,
      })}
    >
      <div
        className={clsx('checkboxContainer mr-1', classes.checkboxContainer, {
          ['checked']: checked,
        })}
      >
        <Checkbox
          className="p-0"
          checked={checked}
          onChange={checkboxCallback(id)}
        />
      </div>
      <div>{content}</div>
    </Paper>
  );
};

export default AttachItemCard;
