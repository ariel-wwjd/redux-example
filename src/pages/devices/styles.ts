import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 700,
      color: theme.palette.grey[100],
      width: '170px',
    },
    subtitle: {
      color: theme.palette.grey[200],
    },
    tag: {
      color: theme.palette.grey[100],
      display: 'flex',
      alignItems: 'center',
    },
    statusContainer: {
      position: 'absolute',
      top: '24px',
      right: '24px',
    },
    loadMoreContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    importTemplateContainer: {
      display: 'flex',
      backgroundColor: theme.palette.info.dark,
    },
    infoIcon: {
      color: theme.palette.common.white,
    },
    link: {
      color: theme.palette.primary.main,
      fontWeight: 700,
      cursor: 'pointer',
    },
    dragContainer: {
      borderRadius: '4px',
      height: '160px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      border: '2px dashed #ECF1F7',
      marginTop: '24px',
      marginBottom: '24px',
    },
    fileContainer: {
      backgroundColor: theme.palette.grey.A100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    fileName: {
      display: 'flex',
      alignItems: 'center',
    },
    typeButton: {
      color: theme.palette.grey[200],
    },
    chosenTypeButton: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.grey.A100,
    },
  }),
);

export default useStyles;
