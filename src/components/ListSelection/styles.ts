import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

// import { mainBoxShadow } from '../../app/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.grey.A100,
      position: 'sticky',
      top: '158px',
      zIndex: 100,
    },
    sortingContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    sortLabel: {
      color: theme.palette.grey[200],
    },
    selectedSorting: {
      color: theme.palette.grey[100],
    },
    sortingMenu: {
      '& .MuiList-root': {
        width: '230px',
      },
    },
  }),
);

export default useStyles;
