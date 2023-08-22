import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deviceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.grey.A100,
    },
  }),
);

export default useStyles;
