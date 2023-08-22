import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

interface StyleProps {
  image?: string;
  extraImage?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      backgroundColor: '#fff',
    },
    imageBox: (props) => ({
      backgroundImage: `url(${props.image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '90px',
      width: '90px',
      borderRadius: 4,
    }),
    overline: {
      display: 'flex',
    },
    overlineIcon: {
      height: '16px',
      width: '16px',
      verticalAlign: 'bottom',
    },
    overlineProfileName: {
      color: theme.palette.primary.main,
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tag: {
      height: '18px',
    },
    subtitle: {
      color: theme.palette.grey[200],
    },
    extraContainer: {
      alignSelf: 'end',
      display: 'flex',
    },
    extraImage: (props) => ({
      backgroundImage: `url(${props.extraImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '40px',
      width: '40px',
      borderRadius: 4,
    }),
  }),
);

export default useStyles;
