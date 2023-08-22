import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      backgroundColor: theme.palette.common.white,
      height: 'calc(100vh - 374px)',
    },
    stickyCell: {
      position: 'sticky',
      zIndex: 100,
      left: 0,
      backgroundColor: theme.palette.common.white,
    },
    stickyHeader: {
      zIndex: 200,
    },
    boldLink: {
      fontWeight: 'bold',
    },
    tableText: {
      color: theme.palette.grey[100],
    },
    link: {
      cursor: 'pointer',
      fontWeight: 700,
    },
    linkDot: {
      color: theme.palette.primary.main,
      verticalAlign: 'middle',
      marginRight: '3px',
      marginBottom: '2px',
      fontSize: '12px',
    },
    centeredCell: {
      textAlign: 'center',
    },
    nested: {
      backgroundColor: theme.palette.grey.A100,
    },
    nestedTable: {
      width: '96%',
      margin: '0 auto',
    },
  }),
);

export default useStyles;
