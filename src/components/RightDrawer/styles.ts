import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    header: {
      display: 'flex',
      flexBasis: 'auto',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    content: {
      flexGrow: 1,
      maxHeight: 'calc(100vh - 88px)',
      overflow: 'auto',
    },
    footer: {
      display: 'flex',
      flexBasis: 'auto',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: `1px solid ${theme.palette.grey.A200}`,
    },
    closeDrawerIcon: {
      color: theme.palette.grey[100],
    },
    cardTitle: {
      color: theme.palette.grey[100],
      width: '200px',
    },
    tag: {
      color: theme.palette.grey[100],
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

export default useStyles;
