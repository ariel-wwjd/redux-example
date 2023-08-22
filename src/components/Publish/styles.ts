import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
    },
    label: {
      color: theme.palette.grey[200],
    },
    button: {
      width: '100%',
    },
  }),
);

export default useStyles;
