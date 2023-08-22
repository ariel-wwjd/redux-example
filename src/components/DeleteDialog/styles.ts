import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.dark,
    },
  }),
);

export default useStyles;
