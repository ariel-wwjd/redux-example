import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tag: {
      height: '18px',
    },
    caption: {
      color: theme.palette.grey[200],
    },
  }),
);

export default useStyles;
