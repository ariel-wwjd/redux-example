import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.common.white,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    content: {
      borderTop: `1px solid ${theme.palette.grey.A200}`,
    },
  }),
);

export default useStyles;
