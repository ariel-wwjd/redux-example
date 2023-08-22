import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    cardContainer: {
      backgroundColor: theme.palette.common.white,
    },
    avatarName: {
      color: theme.palette.grey[200],
    },
    name: {
    },
    email: {
      fontWeight: 400,
      color: theme.palette.grey[200],
    },
    role: {
      textTransform: 'uppercase',
      color: theme.palette.grey[100],
      backgroundColor: theme.palette.grey[300],
      display: 'inline-flex',
    },
    account: {
      display: 'flex',
      alignItems: 'center',
    }
  })
)

export default useStyles;
