import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    publishContainer: {
      height: '100%',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      fontWeight: 700,
    },
    button: {
      color: theme.palette.grey[200],
    },
    chosenButton: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.grey.A100,
    },
    configTitle: {
      color: theme.palette.grey[100],
    },
    configSubtitle: {
      color: theme.palette.grey[200],
      display: 'flex',
      alignItems: 'center',
    },
    infoIcon: {
      color: theme.palette.grey[200],
    },
    link: {
      color: theme.palette.primary.main,
      fontWeight: 700,
      cursor: 'pointer',
    },
    heartbeatInput: {
      width: '100px',
    },
    input: {
      width: '350px',
    },
    policiesContainer: {
      // The height of 4 policies
      height: '228px',
      overflow: 'auto',
    },
    policy: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: `1px solid ${theme.palette.grey.A200}`,
    },
  }),
);

export default useStyles;
