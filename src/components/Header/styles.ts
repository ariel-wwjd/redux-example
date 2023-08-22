import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.common.white,
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    actionContainer: {
      textAlign: 'end',
    },
    backButton: {
      color: theme.palette.grey[100],
    },
  }),
);

export default useStyles;
