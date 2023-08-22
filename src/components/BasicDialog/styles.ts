import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeIcon: {
      position: 'absolute',
      color: theme.palette.grey[100],
      top: 5,
      right: 5,
      '& svg': {
        height: '14px',
        width: '14px',
      },
    },
    content: {
      color: theme.palette.grey[200],
    },
  }),
);

export default useStyles;
