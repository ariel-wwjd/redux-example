import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      minHeight: '100vh',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '450px',
    },
    background: {
      backgroundColor: theme.palette.grey.A100,
      display: 'flex',
      flexDirection: 'column',
    },
    backgroundMobile: {
      minHeight: '35vh',
      backgroundPositionY: '70%',
    },
    contentContainerMobile: {
      minHeight: '60vh',
      margin: '0 20px',
      transform: 'translateY(-60px)',
    },
    contentMobile: {
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(15),
        paddingRight: theme.spacing(15),
      },
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    backIcon: {
      position: 'absolute',
      top: '20px',
      left: '8px',
      color: '#ffffff',
    },
    backButton: {
      paddingLeft: 0,
      marginBottom: '48px',
      color: theme.palette.grey[100],
    },
    carouselContainer: {
      maxWidth: '430px',
      alignSelf: 'center',
    },
    carouselItem: {
      maxWidth: '100%',
    },
    carouselImage: {
      maxWidth: '100%',
      marginBottom: '80px',
    },
    carouselTitle: {
      marginBottom: '16px',
    },
    carouselDescription: {
      marginBottom: '56px',
    },
    carouselDots: {
      display: 'flex',
      flexDirection: 'row',
    },
    carouselDot: {
      height: '4px',
      width: '24px',
      borderRadius: '24px',
      backgroundColor: theme.palette.grey[300],
      marginRight: '16px',
      cursor: 'pointer',

      '&:last-child': {
        marginRight: '0',
      },
    },
    chosenDot: {
      backgroundColor: theme.palette.primary.main,
      width: '56px',
    },
  }),
);

export default useStyles;
