import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const drawerWidthDesktop = 285;
const drawerWidthMobile = 315;
const _mobileHeaderHeight = 56;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootContainer: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidthDesktop,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      boxSizing: 'border-box',
      width: drawerWidthDesktop,
    },
    drawerPaperMobile: {
      boxSizing: 'border-box',
      width: drawerWidthMobile,
    },
    drawerInnerContainer: {
      backgroundColor: '#102636',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      [theme.breakpoints.up('sm')]: {
        minHeight: 'calc(100vh)',
      },
      [theme.breakpoints.down('sm')]: {
        minHeight: 'calc(100vh)',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    companyLogo: {
      maxWidth: '150px',
      maxHeight: '50px',
    },
    drawerList: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: '30px',
    },
    content: {
      width: '100%',
      backgroundColor: theme.palette.grey.A100,
      overflow: 'auto',
      height: '100vh',
    },
    notSafariContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexGrow: 1,
    },
    listContent: {
      [theme.breakpoints.up('lg')]: {
        paddingTop: '60px',
      },
    },
    nestedList: {
      marginLeft: '20px',
    },
    linkWithSublinks: {
      '&.Mui-selected': {
        backgroundColor: 'transparent',
      },
    },
    userMenuButton: {
      maxWidth: '235px',
      display: 'flex',
      position: 'relative',
      '&:hover': {
        backgroundColor: theme.palette.grey[800],
        borderRadius: '8px',
      },
    },
    userMenuButtonFocused: {
      backgroundColor: theme.palette.grey[800],
    },
    userMenuAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userMenuName: {
      width: '125px',
    },
    userMenu: {
      '& .MuiPaper-root': {
        backgroundColor: theme.palette.grey[800],
        width: '382px',
        marginTop: '-8px',
        marginLeft: '8px',
        borderRadius: '8px',

        '& .MuiList-root': {
          width: '382px',
          padding: '8px 0',
          boxShadow: 'none',
          border: 'none',
        },
      },
    },
  }),
);

export default useStyles;
