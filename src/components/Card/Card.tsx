import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Paper } from '@mui/material';
import clsx from 'clsx';

import useStyles from './styles';

interface CardProps {
  content: JSX.Element;
  checked: boolean;
  id: string;
  baseLink?: string;
  checkboxCallback: (
    id: string,
  ) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const Card: React.FC<CardProps> = ({
  content,
  checked,
  id,
  baseLink,
  checkboxCallback,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (baseLink) {
      navigate(`${baseLink}/${id}`);
    }
  };

  return (
    <Paper
      className={clsx('shadow p-6', classes.card, {
        [classes.hoverCard]: baseLink !== undefined || baseLink !== '',
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
      <div className={classes.cardContent} onClick={handleClick}>
        {content}
      </div>
    </Paper>
  );
};

export default Card;
