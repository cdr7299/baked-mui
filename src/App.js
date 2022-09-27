import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from 'organisms/navbar';
import Home from 'pages/Home';

import { ColorModeContext } from './colorMode.context';
import getDesignTokens from './mui.theme';
import Recipies from 'pages/Recipies';
import CakeClass from 'pages/CakeClass';

function App() {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home switchTheme={colorMode.toggleColorMode} />} />
        <Route
          exact
          path="/recipies"
          element={<Recipies switchTheme={colorMode.toggleColorMode} />}
        />
        <Route
          exact
          path="/class"
          element={<CakeClass switchTheme={colorMode.toggleColorMode} />}
        />
        <Route path="/about"></Route>
      </Routes>
    </Router>
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

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
