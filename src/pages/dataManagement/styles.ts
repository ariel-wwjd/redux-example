import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 700,
      color: theme.palette.grey[100],
    },
    tag: {
      color: theme.palette.grey[100],
      display: 'flex',
      alignItems: 'center',
    },
    loadMoreContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

export default useStyles;
