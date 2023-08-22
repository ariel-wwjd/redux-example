import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    inputContainer: {
      display: 'flex',
    },
    button: {},
    chipsContainer: {},
    chip: {
      backgroundColor: theme.palette.info.dark,
      height: '24px',
    },
    chipIcon: {
      color: `${theme.palette.common.white} !important`,
      fontSize: '18px !important',
    },
  }),
);

export default useStyles;
