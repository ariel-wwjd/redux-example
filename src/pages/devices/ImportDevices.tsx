import React, { useEffect, useState } from 'react';
import { Typography, Link, IconButton } from '@mui/material';
import {
  Info as InfoIcon,
  InsertDriveFile as InsertDriveFileIcon,
  FileDownloadDone as FileDownloadDoneIcon,
  CancelOutlined as CancelIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { Devices } from '@edgeiq/edgeiq-api-js';
import clsx from 'clsx';

import { useAppDispatch } from '../../redux/hooks';
import { setAlert } from '../../redux/reducers/alert.reducer';
import { RightDrawer } from '../../components/RightDrawer';
import {
  devicesDocsURL,
  devicesTemplateURL,
  errorHighlight,
} from '../../app/constants';
import useStyles from './styles';

interface ImportDevicesProps {
  openDrawer: boolean;
  handleCloseDrawer: () => void;
  handleImportSucces: () => void;
}

const ImportDevices: React.FC<ImportDevicesProps> = ({
  openDrawer,
  handleCloseDrawer,
  handleImportSucces,
}) => {
  // TODO: get devicesGenre (active or escrow) if it is possible to upload csv for escrow devices
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [stateFiles, setStateFiles] = useState<File[]>([]);
  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    accept: 'text/csv',
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
  });

  useEffect(() => {
    setStateFiles(acceptedFiles);
  }, [acceptedFiles]);

  const handleSubmitCallback = (): void => {
    setLoading(true);
    Devices.csvBulkUpload(stateFiles[0])
      .then((_result) => {
        dispatch(
          setAlert({
            type: 'success',
            highlight: 'File uploaded correctly',
          }),
        );
        handleImportSucces();
        onRemoveFile();
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
      .finally(() => {
        setLoading(false);
      });
  };

  const downloadCsvTemplate = (): void => {
    const link = document.createElement('a');
    link.download = devicesTemplateURL;
    link.href = devicesTemplateURL;
    link.click();
  };

  const readDocumenation = (): void => {
    const link = document.createElement('a');
    link.href = devicesDocsURL;
    link.target = '_blank';
    link.click();
  };

  const onRemoveFile = (): void => {
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    setStateFiles([]);
  };

  return (
    <RightDrawer
      open={openDrawer}
      actionLabel="Submit"
      title="Import Devices"
      disableAction={stateFiles.length === 0}
      actionLoading={loading}
      actionCallback={handleSubmitCallback}
      onCloseDrawer={handleCloseDrawer}
      content={
        <div>
          <div
            className={clsx('br-1 p-4 mb-6', classes.importTemplateContainer)}
          >
            <InfoIcon className={clsx('mr-4', classes.infoIcon)} />
            <div>
              <Typography
                component="div"
                variant="button"
                fontWeight={700}
                className="mb-1"
                color={'#fff'}
              >
                CSV template
              </Typography>
              <Typography component="div" variant="button" color={'#fff'}>
                You can
                <Link
                  className={clsx('ml-1 mr-1', classes.link)}
                  onClick={downloadCsvTemplate}
                  underline="none"
                >
                  download a CSV
                </Link>
                file as a template to edit and upload devices.
              </Typography>
              <Typography component="div" variant="button" color={'#fff'}>
                You can also
                <Link
                  className={clsx('ml-1 mr-1', classes.link)}
                  onClick={readDocumenation}
                  underline="none"
                >
                  read the CSV upload documenation
                </Link>
                .
              </Typography>
            </div>
          </div>
          <Typography variant="subtitle2">Upload CSV file</Typography>
          <div>
            <section className="container">
              <div {...getRootProps()} className={classes.dragContainer}>
                <input {...getInputProps()} />
                <div>
                  <InsertDriveFileIcon color="primary" />
                </div>
                <Typography variant="button" component="div">
                  Drag & Drop or{' '}
                  <Link
                    className={clsx('ml-1', classes.link)}
                    onClick={open}
                    underline="none"
                  >
                    Upload from browse
                  </Link>
                </Typography>
              </div>
              <div>
                <Typography variant="button">Uploaded file</Typography>
                {stateFiles.map((file) => (
                  <div
                    key={file.name}
                    className={clsx('mt-4 p-4 br-1', classes.fileContainer)}
                  >
                    <div className={classes.fileName}>
                      <FileDownloadDoneIcon className="mr-2" />
                      {file.name}
                    </div>
                    <IconButton aria-label="delete-file" onClick={onRemoveFile}>
                      <CancelIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      }
    />
  );
};

export default ImportDevices;
