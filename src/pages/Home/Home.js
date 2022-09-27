// import Page from 'molecules/Page';
import PropTypes from 'prop-types';
import { useState } from 'react';

import _noop from 'lodash/noop';

// import Grid from '@mui/material/Grid'; // Grid version 1
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Typography from 'atoms/Typography';
import Button from 'atoms/Button';
import Products from 'organisms/products';
import Cart from 'organisms/cart/Cart';

import styles from './home.module.css';

function Home({ switchTheme }) {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const theme = useTheme();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsCartVisible(!open);
  };
  return (
    // <Grid container>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '10rem',
        backgroundColor: theme.palette.background.default
      }}>
      <Typography variant="h4" container="div" className={styles.homeHeading}>
        New Products
      </Typography>
      <Products />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', height: '4rem' }}
        elevation={3}>
        <div className={styles.bottomBar}>
          <div
            style={{
              display: 'flex'
            }}>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.primary',
                borderRadius: 1,
                p: 1
              }}>
              <Typography variant="subtitle1">{theme.palette.mode} mode</Typography>
              <IconButton sx={{ ml: 1 }} onClick={switchTheme} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </div>
          <div>
            <Button
              variant="outlined"
              onClick={() => setIsCartVisible(!isCartVisible)}
              startIcon={<ShoppingCartIcon />}>
              <Typography variant="body1">{`Cart`}</Typography>
            </Button>
          </div>
        </div>
      </Paper>
      <Cart open={isCartVisible} toggleDrawer={toggleDrawer} />
    </div>
    // </Grid>
  );
}

Home.propTypes = {
  switchTheme: PropTypes.func
};

Home.defaultProps = {
  switchTheme: _noop
};

export default Home;
