import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    card: {
      position: 'relative',
      display: 'flex',
      '&:hover': {
        '& .checkboxContainer': {
          display: 'block',
        },
      },
    },
    cardContent: {
      flexGrow: 1,
      maxWidth: '100%',
    },
    hoverCard: {
      cursor: 'pointer',
    },
    checkboxContainer: {
      display: 'none',
      '&.checked': {
        display: 'block',
      },
    },
  }),
);

export default useStyles;
