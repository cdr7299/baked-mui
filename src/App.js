import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from 'organisms/navbar';
import Home from 'pages/Home';

import { lightTheme } from './mui.theme';
import { ColorModeContext } from './colorMode.context';

function App() {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home location={location} switchTheme={colorMode.toggleColorMode} />}
          />
          <Route path="/about"></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
