import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    boxContainer: {
      backgroundColor: '#fff',
    },
    filter: {
      fontSize: '14px',
    },
  }),
);

export default useStyles;
