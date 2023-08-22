import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#fff',
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      borderRight: `1px solid ${theme.palette.grey.A200}`,
    },
    button: {
      height: '30px',
      color: theme.palette.grey[100],
      justifyContent: 'start',
      '&:hover': {
        backgroundColor: theme.palette.grey.A200,
      },
    },
    buttonChosen: {
      backgroundColor: theme.palette.grey.A200,
      color: theme.palette.primary.main,
    },
    buttonText: {
      fontWeight: 700,
      textTransform: 'uppercase',
    },
  }),
);

export default useStyles;
