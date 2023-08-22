import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

import { StatusTheme } from '../../models/common';

interface StyleProps {
  status: StatusTheme;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: (props: StyleProps): string =>
        theme.palette[props.status].main,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'fit-content',
    },
    label: {
      textTransform: 'uppercase',
      color: (props: StyleProps): string => theme.palette[props.status].dark,
    },
  }),
);

export default useStyles;
