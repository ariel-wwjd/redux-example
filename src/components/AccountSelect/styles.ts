import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    notFilter: {
      height: '72px',
    },
    filter: {
      height: '44px',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
    },
    filterLogo: {
      width: '32px',
      height: '32px',
    },
    logoImage: {
      maxWidth: '100%',
      borderRadius: '50%',
    },
    nameLogo: {
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

export default useStyles;
