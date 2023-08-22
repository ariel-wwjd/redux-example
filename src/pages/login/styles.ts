import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontWeight: 700,
    },
    linkButton: {
      width: 'fit-content',
      alignSelf: 'flex-end',
    },
    submitButton: {
      // [theme.breakpoints.up('md')]: {
      //   padding: '6px 40px',
      // },
    },
  }),
);

export default useStyles;
