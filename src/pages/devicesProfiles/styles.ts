import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.grey[100],
      borderBottom: `1px solid ${theme.palette.grey.A200}`,
    },
    subtitle: {
      color: theme.palette.grey[100],
    },
    tagsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    accountContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    tagContainer: {
      display: 'flex',
    },
    tagName: {
      color: theme.palette.grey[200],
    },
    tagValue: {
      color: theme.palette.grey[100],
    },
    tagIcon: {
      color: theme.palette.grey[200],
    },
    loadMoreContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    input: {
      height: '44px',
    },
  }),
);

export default useStyles;
