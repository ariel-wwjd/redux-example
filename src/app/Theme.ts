import { createTheme, Theme } from '@mui/material';

import { mainBoxShadow } from './constants';

// This is the default Theme. the EIQ theme
export const AppTheme = createTheme({
  palette: {
    primary: {
      main: '#40A0DB',
      contrastText: '#fff',
    },
    secondary: {
      main: '#475569',
    },
    success: {
      dark: '#609884',
      main: '#CEE3DE',
      light: '#E6F8F3',
    },
    warning: {
      dark: '#EDB31E',
      main: '#FFE298',
      light: '#FFF4D7',
    },
    // Danger
    error: {
      dark: '#DE4F48',
      main: '#FFD4D2',
      light: '#FAECEB',
    },
    // Equal
    info: {
      dark: '#2B4259',
      main: '#C6CFD8',
      light: '#ECF1F6',
    },
    grey: {
      '50': '#1F3849',
      '100': '#1E1F21',
      '200': '#6E7176',
      '300': '#B9B9B9',
      '400': '#E4E3E3',
      '500': '#F5F5F5',
      '600': '#ECF1F6',
      '800': '#07131C',
      A100: '#F6F8FB',
      A200: '#ECF1F7',
      A400: '#BDD3E9',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'arial, sans-serif',
      textTransform: 'none',
    },
    // Heading L
    h3: {
      fontSize: '28px',
      lineHeight: '34px',
      fontWeight: 700,
    },
    // Heading M
    h4: {
      fontSize: '24px',
      lineHeight: '30px',
      fontWeight: 700,
    },
    // Heading S
    h5: {
      fontSize: '20px',
      lineHeight: '26px',
      fontWeight: 700,
    },
    // Dialog title
    h6: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 700,
    },
    // Body L
    subtitle1: {
      fontSize: '16px',
      lineHeight: '24px',
    },
    // Body M
    button: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    // Body S - Label S
    overline: {
      fontSize: '12px',
      lineHeight: '16px',
    },
    // Label M
    subtitle2: {
      fontSize: '14px',
      lineHeight: '16px',
    },
    // Label XS
    caption: {
      fontSize: '10px',
      lineHeight: '14px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        containedSizeLarge: {
          height: '44px',
        },
        containedSizeMedium: {
          height: '32px',
        },
        outlinedSizeLarge: {
          fontSize: '14px',
          height: '44px',
        },
        outlinedSizeMedium: {
          height: '32px',
        },
        text: {
          padding: '12px 16px',
        },
      },
    },
  },
});

/**
 * And here once the user loggs in we know the branding of
 * the company he/she belongs to.
 * So we use the default theme changing the primary color
 */
export const CustomTheme = (primary_color?: string): Theme => {
  const theme = createTheme({
    ...AppTheme,
  });
  theme.palette.primary.main = primary_color
    ? primary_color
    : theme.palette.primary.main;

  theme.components = {
    ...theme.components,
    MuiButton: {
      styleOverrides: {
        ...theme.components?.MuiButton?.styleOverrides,
        contained: {
          fontSize: '14px',
          '&.Mui-disabled': {
            backgroundColor: theme.palette.grey[400],
            color: theme.palette.grey[300],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '44px',
          padding: '0 !important',
        },
        input: {
          height: '20px',
          padding: '12px',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          padding: '12px !important',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: '16px',
          paddingBottom: '16px',
        },
        button: {
          margin: '0',
          marginLeft: '24px',
          padding: '12px 16px',
          width: 'calc(100% - 40px)',
          color: theme.palette.common.white,
          '&.Mui-selected': {
            backgroundColor: theme.palette.grey[50],
            color: theme.palette.primary.main,
            borderRadius: '4px',
            '& .MuiListItemIcon-root': {
              color: theme.palette.primary.main,
            },
          },
          '&.Mui-selected:hover': {
            backgroundColor: theme.palette.grey[50],
            color: theme.palette.primary.main,
            borderRadius: '4px',
            '& .MuiListItemIcon-root': {
              color: theme.palette.primary.main,
            },
          },
          '&:hover': {
            backgroundColor: theme.palette.grey[50],
            color: theme.palette.primary.main,
            borderRadius: '4px',
            '& .MuiListItemIcon-root': {
              color: theme.palette.primary.main,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          maxHeight: '290px',
          border: `1px solid ${theme.palette.grey.A400}`,
          borderRadius: '4px',
          boxShadow: mainBoxShadow,
          padding: 0,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            WebkitAppearance: 'none',
            width: '7px',
            height: '7px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '4px',
            backgroundColor: '#206F9F',
            WebkitBoxShadow: '0 0 1px rgba(255, 255, 255, 0.5)',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        dense: {
          height: '36px',
          borderRadius: '4px',
          margin: '16px',
          padding: '8px',
          '&:hover': {
            backgroundColor: theme.palette.grey.A100,
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.grey.A200,
            color: theme.palette.primary.main,
          },
          '& .MuiCheckbox-root': {
            paddingLeft: 0,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paperAnchorRight: {
          width: '650px',
        },
      },
    },
  };

  return theme;
};
