import { Theme, circularProgressClasses } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

interface StyleProps {
  progressMainColor?: string;
  progressSecondaryColor?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    box: {
      position: 'relative',
      display: 'inline-flex',
    },
    backgroundProgress: (props) => ({
      color: props.progressSecondaryColor
        ? props.progressSecondaryColor
        : theme.palette.grey[200],
    }),
    mainProgress: (props) => ({
      color: props.progressMainColor
        ? props.progressMainColor
        : theme.palette.primary.main,
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
      [`& .${circularProgressClasses.circle}`]: {
        strokeLinecap: 'round',
      },
    }),
    percentageBox: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

export default useStyles;
