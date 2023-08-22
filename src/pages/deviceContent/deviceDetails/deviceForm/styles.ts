import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    filter: {
      fontSize: '14px',
    },
    rowBox: {
      display: 'flex',
    },
    unitInput: {
      width: '180px',
    },
  }),
);

export default useStyles;
