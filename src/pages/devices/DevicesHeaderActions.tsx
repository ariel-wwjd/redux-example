import React, { useState } from 'react';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import ImportDevices from './ImportDevices';

interface DevicesHeaderActionsProps {
  onImportSuccess: () => void;
}

const DevicesHeaderActions: React.FC<DevicesHeaderActionsProps> = ({
  onImportSuccess,
}) => {
  const [openImport, setOpenImport] = useState(false);

  const handleOpenImport = (): void => {
    setOpenImport(true);
  };

  const handleCloseImport = (): void => {
    setOpenImport(false);
  };

  const handleImportSucces = (): void => {
    handleCloseImport();
    onImportSuccess();
  };

  return (
    <>
      <Button
        variant="outlined"
        size="large"
        startIcon={<FileDownloadIcon />}
        onClick={handleOpenImport}
      >
        Import
      </Button>
      <Button
        variant="outlined"
        size="large"
        className="ml-4"
        startIcon={<FileUploadIcon />}
      >
        Export
      </Button>
      <ImportDevices
        openDrawer={openImport}
        handleCloseDrawer={handleCloseImport}
        handleImportSucces={handleImportSucces}
      />
    </>
  );
};

export default DevicesHeaderActions;
