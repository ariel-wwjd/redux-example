import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    container: {
      marginBottom: '24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    input: {
      paddingRight: 0,
    },
    optionLabel: {
      marginLeft: '8px',
    },
    paperContainer: {
      padding: 0,
    },
    showMore: {
      display: 'flex',
      backgroundColor: '#F6F8FB',
      cursor: 'pointer',
      padding: '8px',
      margin: '0 16px 10px 16px',
      borderRadius: '4px',
    },
    clearButton: {
      color: '#1E1F21',
      marginBottom: '8px',
    },
    searchButton: {
      height: '32px',
      boxShadow: 'none',
      marginLeft: '8px',
      padding: '8px 16px',
      marginBottom: '8px',
    },
  }),
);

export default useStyles;
