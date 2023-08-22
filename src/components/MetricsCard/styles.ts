import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

interface StyleProps {
  backgroundColor?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    card: (props) => ({
      backgroundColor: props.backgroundColor,
      height: '126px',
    }),
    lastChild: {
      textAlign: 'end',
    },
    chip: {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.common.white,
    },
  }),
);

export default useStyles;
