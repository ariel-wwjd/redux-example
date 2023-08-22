import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

interface StyleProps {
  sticky: boolean;
  height: string;
}

const useStyles = makeStyles<Theme, StyleProps>((_theme: Theme) =>
  createStyles({
    container: (props) => ({
      position: props.sticky ? 'sticky' : 'relative',
      bottom: 0,
      zIndex: 100,
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      height: props.height,
    }),
  }),
);

export default useStyles;
