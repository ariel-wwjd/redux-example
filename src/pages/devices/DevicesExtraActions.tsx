import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Command } from '@edgeiq/edgeiq-api-js';

import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { IssueCommandsDrawer } from '../../components/RightDrawer';
import IssueTransferDrawer from './IssueTransfer/IssueTransfer';

interface DevicesExtraActionsProps {
  selectedDevices: string[];
}

const DevicesExtraActions: React.FC<DevicesExtraActionsProps> = ({
  selectedDevices,
}) => {
  const devicesState = useAppSelector((state: RootState) => state.devices);

  const [openCommands, setOpenCommands] = useState(false);
  const [_openWorkflows, setOpenWorkflows] = useState(false);
  const [openTransfers, setOpenTransfers] = useState(false);

  const handleOpen = (type: string) => (): void => {
    if (type === 'command') {
      setOpenCommands(true);
    }
    if (type === 'workflow') {
      setOpenWorkflows(true);
    }
    if (type === 'transfer') {
      setOpenTransfers(true);
    }
  };

  const handleCloseCommands = (): void => {
    setOpenCommands(false);
  };

  const handleCloseTransfers = (): void => {
    setOpenTransfers(false);
  };

  const handleCommandsCallback = (_commands: Command[]): void => {
    handleCloseCommands();
  };

  return devicesState.devicesGenre === 'active' ? (
    <>
      <Button variant="contained" size="medium" onClick={handleOpen('command')}>
        Issue Command
      </Button>
      <Button
        variant="contained"
        size="medium"
        className="ml-4"
        onClick={handleOpen('workflow')}
      >
        Issue Workflow
      </Button>
      <IssueCommandsDrawer
        open={openCommands}
        handleCloseDrawer={handleCloseCommands}
        onChoosingCommands={handleCommandsCallback}
      />
    </>
  ) : devicesState.devicesGenre === 'escrow' ? (
    <>
      <Button
        variant="contained"
        size="medium"
        className="ml-4"
        onClick={handleOpen('transfer')}
      >
        Issue Transfer
      </Button>
      <IssueTransferDrawer
        open={openTransfers}
        escrowDevices={devicesState.escrowDevices.filter((escrowDevice) =>
          selectedDevices.includes(escrowDevice._id),
        )}
        handleCloseDrawer={handleCloseTransfers}
      />
    </>
  ) : (
    <></>
  );
};

export default DevicesExtraActions;
