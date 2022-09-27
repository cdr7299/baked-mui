import { createTheme } from '@mui/material/styles';
import './fonts/Pacifico-Regular.ttf';

const lightTheme = createTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", "Pacifico" sans-serif`
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#cc0000;'
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00'
    },

    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
});

export { lightTheme };
