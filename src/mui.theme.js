/* eslint-disable prettier/prettier */
import { grey, brown } from '@mui/material/colors';

const getDesignTokens = (mode) => ({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", "Pacifico" sans-serif`,
    h4: {
      '@media (max-width:1024px)': {
        fontSize: '1.4rem',
      },
    }
  },
  palette: {
    mode,
    primary: {
      main: '#cc0000',
      ...(mode === 'dark' && {
        main: brown[700],
      }),
    },
    secondary: {
      ...brown,
      ...(mode === 'dark' && {
        main: brown[200],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: grey[700],
        paper: grey[600],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
          primary: grey[800],
          secondary: grey[700],
        }
        : {
          primary: brown[100],
          secondary: brown[700],
        }),
    },
    tonalOffset: 0.2,
    contrastThreshold: 2
  },

});

export default getDesignTokens;
