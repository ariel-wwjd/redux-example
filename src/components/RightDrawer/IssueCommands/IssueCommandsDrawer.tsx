import React, { ChangeEvent, useEffect, useState } from 'react';
import { Command, Commands } from '@edgeiq/edgeiq-api-js';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { setAlert } from '../../../redux/reducers/alert.reducer';
import { setStateCommands } from '../../../redux/reducers/commands.reducer';
import {
  optionsPaginationsFilter,
  errorHighlight,
} from '../../../app/constants';
import CardsGrid from '../../CardsGrid';
import AttachItemsLayout from '../AttachItems/AttachItemsLayout';
import AttachItemCard from '../AttachItems/AttachItemCard';
import RightDrawer from '../RightDrawer';
import IssueCommandCard from './IssueCommandCard';
import { CircularProgress, Grid } from '@mui/material';

interface IssueCommandsDrawerProps {
  open: boolean;
  handleCloseDrawer: () => void;
  onChoosingCommands: (commands: Command[]) => void;
}

const IssueCommandsDrawer: React.FC<IssueCommandsDrawerProps> = ({
  open,
  handleCloseDrawer,
  onChoosingCommands,
}) => {
  const dispatch = useAppDispatch();
  const statePolicies = useAppSelector((state: RootState) => state.commands);

  const [commands, setCommands] = useState<Command[]>(statePolicies.commands);
  const [selectedCommands, setSelectedCommands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (commands.length === 0) {
      Commands.list({}, optionsPaginationsFilter)
        .then((result) => {
          setCommands(result.commands);
          dispatch(setStateCommands(result.commands));
        })
        .catch((error) => {
          dispatch(
            setAlert({
              type: 'error',
              highlight: errorHighlight,
              message: error.message,
            }),
          );
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (statePolicies.selectedCommands.length !== 0) {
      setSelectedCommands(
        statePolicies.selectedCommands.map((command) => command._id),
      );
    }
  }, [statePolicies.selectedCommands]);

  const handleOnChangeCallback = (_value: string): void => {
    // TODO: call commands with filter
  };

  const checkPolicyCallback =
    (policyId: string) =>
    (_event: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
      if (checked) {
        setSelectedCommands([...selectedCommands, policyId]);
      } else {
        setSelectedCommands(
          selectedCommands.filter((item) => item !== policyId),
        );
      }
    };

  const handleCommandsCallback = (): void => {
    onChoosingCommands(
      commands.filter((command) => selectedCommands.includes(command._id)),
    );
  };

  const handleSelectAll = (): void => {
    if (selectedCommands.length !== commands.length) {
      setSelectedCommands(commands.map((command) => command._id));
    } else {
      setSelectedCommands([]);
    }
  };

  return (
    <RightDrawer
      open={open}
      actionLabel="Attach"
      title="Select commands"
      disableAction={selectedCommands.length === 0}
      actionCallback={handleCommandsCallback}
      onCloseDrawer={handleCloseDrawer}
      content={
        <AttachItemsLayout
          allSelected={selectedCommands.length === commands.length}
          itemsSelected={selectedCommands.length !== 0}
          searchPlaceholder="Search commands"
          onChangeCallback={handleOnChangeCallback}
          selectAllCallback={handleSelectAll}
          grid={
            loading ? (
              <Grid container className="loading-container">
                <CircularProgress size={75} thickness={5} />
              </Grid>
            ) : (
              <CardsGrid
                twoColumns={true}
                containerPadding={false}
                cards={commands.map((command) => (
                  <AttachItemCard
                    content={
                      <IssueCommandCard key={command._id} command={command} />
                    }
                    checked={selectedCommands.includes(command._id)}
                    checkboxCallback={checkPolicyCallback}
                    id={command._id}
                  />
                ))}
              />
            )
          }
        />
      }
    />
  );
};

export default IssueCommandsDrawer;
