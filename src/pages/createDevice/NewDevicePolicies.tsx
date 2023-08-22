import React, { useState } from 'react';
import { Typography, Button, Tooltip, IconButton } from '@mui/material';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { Rule } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { AttachPoliciesDrawer } from '../../components/RightDrawer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSelectedPolicies } from '../../redux/reducers/policies.reducer';
import { RootState } from '../../redux/store';
import useStyles from './styles';

const NewDevicePolicies: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { selectedPolicies } = useAppSelector(
    (state: RootState) => state.policies,
  );

  const [open, setOpen] = useState(false);

  const handlePoliciesCallback = (policies: Rule[]): void => {
    dispatch(setSelectedPolicies(policies));
    handleCloseDrawer();
  };

  const handleOpenDrawer = (): void => {
    setOpen(true);
  };

  const handleCloseDrawer = (): void => {
    setOpen(false);
  };

  const handleDetachPolicy = (policyId: string) => (): void => {
    dispatch(
      setSelectedPolicies(
        selectedPolicies.filter((policy) => policy._id !== policyId),
      ),
    );
  };

  return (
    <>
      <Typography
        variant="button"
        component="div"
        className={clsx('mb-1', classes.configTitle)}
      >
        Select policies
      </Typography>
      <Typography
        variant="overline"
        component="div"
        className={clsx('mb-4', classes.configSubtitle)}
      >
        Select policies to attach to the device.
      </Typography>
      {selectedPolicies.length === 0 ? (
        <Typography
          variant="overline"
          component="div"
          className={clsx('mb-4', classes.configSubtitle)}
        >
          No policies selected.
        </Typography>
      ) : (
        <div className={clsx('scrollbar', classes.policiesContainer)}>
          {selectedPolicies.map((policy) => (
            <Typography
              noWrap
              key={policy._id}
              variant="button"
              component="div"
              className={clsx('py-2', classes.title, classes.policy)}
            >
              {policy.description}
              <Tooltip placement="top" title="Detach policy">
                <IconButton
                  aria-label="detach-policy"
                  onClick={handleDetachPolicy(policy._id)}
                >
                  <LinkOffIcon />
                </IconButton>
              </Tooltip>
            </Typography>
          ))}
        </div>
      )}
      <Button
        color="primary"
        size="large"
        variant="contained"
        type="button"
        onClick={handleOpenDrawer}
      >
        <Typography variant="button">Attach policies</Typography>
      </Button>
      <AttachPoliciesDrawer
        open={open}
        itemPolicies={true}
        handleCloseDrawer={handleCloseDrawer}
        onChoosingPolicies={handlePoliciesCallback}
      />
    </>
  );
};

export default NewDevicePolicies;
