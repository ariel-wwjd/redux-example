import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxContainer: {
      boxShadow: '0px 8px 16px 0px #7090B01F',
      backgroundColor: '#fff',
      borderRadius: 4,
    },
    filter: {
      fontSize: '14px',
    },
    rowBox: {
      display: 'flex',
    },
    integrationSubtitle: {
      color: theme.palette.grey[200],
      display: 'flex',
      alignItems: 'center',
    },
    addTagButton: {
      width: '180px',
    },
    fontBold: {
      fontWeight: 700,
    },
    actionsRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);

export default useStyles;
