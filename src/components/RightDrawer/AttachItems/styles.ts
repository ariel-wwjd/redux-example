import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      maxHeight: 'calc(100vh - 291px)',
      overflow: 'auto',
    },
    card: {
      backgroundColor: theme.palette.grey[500],
      border: `1px solid ${theme.palette.grey.A200}`,
      position: 'relative',
      display: 'flex',
      '&:hover': {
        '& .checkboxContainer': {
          display: 'block',
        },
      },
    },
    checkedCard: {
      border: `1px solid ${theme.palette.primary.main}`,
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
