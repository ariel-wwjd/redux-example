import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    tableContainer: {
      height: 400,
      width: '100%',
    },
    table: {
      border: 'none',
    },
  }),
);

export default useStyles;
