import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import clsx from 'clsx';

import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { PermissionAction } from '../../models/common';

interface ActionsButtonProps {
  model: string;
  action: PermissionAction;
  label?: string;
  link?: string;
  actionIcon?: ReactElement;
  margin?: boolean;
  actionCallback?: () => void;
}

const ActionButton: React.FC<ActionsButtonProps> = ({
  model,
  action,
  label,
  link,
  actionIcon,
  margin = true,
  actionCallback,
}) => {
  const navigate = useNavigate();
  const stateUser = useAppSelector((state: RootState) => state.user);

  const handleActionClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();

    if (link) {
      navigate(`/${link}`);
    }

    if (actionCallback) {
      actionCallback();
    }
  };

  return stateUser &&
    stateUser.permissions &&
    stateUser.permissions[model] &&
    stateUser.permissions[model][action] ? (
    <Button
      variant="contained"
      size="large"
      startIcon={
        actionIcon ? actionIcon : action === 'create' ? <AddIcon /> : <></>
      }
      onClick={handleActionClick}
      className={clsx({
        ['ml-4']: margin,
      })}
    >
      {label}
    </Button>
  ) : (
    <></>
  );
};

export default ActionButton;
