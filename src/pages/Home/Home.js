// import Page from 'molecules/Page';
import PropTypes from 'prop-types';
import { useState } from 'react';

import _noop from 'lodash/noop';

import Grid from '@mui/material/Grid'; // Grid version 1
import Paper from '@mui/material/Paper';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Typography from 'atoms/Typography';
import Products from 'organisms/products';
import Button from 'atoms/Button';
import Cart from 'organisms/cart/Cart';
import styles from './home.module.css';

function Home({ switchTheme }) {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsCartVisible(!open);
  };
  return (
    <Grid container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingBottom: '10rem'
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
              <Button variant="outlined" onClick={switchTheme}>{`Dark Mode`}</Button>
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
    </Grid>
  );
}

Home.propTypes = {
  switchTheme: PropTypes.func
};

Home.defaultProps = {
  switchTheme: _noop
};

export default Home;
