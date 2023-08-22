import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { StatusTheme } from '../../models/common';

interface Props {
  status: StatusTheme;
}

const useStyles = makeStyles<Theme, Props>((theme) =>
  createStyles({
    snackBar: {
      [theme.breakpoints.up('md')]: {
        right: '64px',
      },
    },
    contentContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    alertContainer: {
      backgroundColor: (props: Props): string =>
        theme.palette[props.status].light,
    },
    toastContainer: {
      backgroundColor: theme.palette.common.white,
    },
    content: {
      display: 'flex',
      alignItems: 'center',
    },
    message: {
      color: theme.palette.grey[100],
    },
    highlight: {
      color: (props: Props): string => theme.palette[props.status].dark,
      fontWeight: 700,
    },
    icon: {
      color: (props: Props): string => theme.palette[props.status].dark,
    },
    clearIconBtn: {
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
      },
    },
    clearIcon: {
      color: theme.palette.grey[100],
    },
  }),
);

export default useStyles;
