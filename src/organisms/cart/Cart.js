import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import _values from 'lodash/values';
import _map from 'lodash/map';
import _noop from 'lodash/noop';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import Typography from 'atoms/Typography';
import PropertyControlledComponent from 'molecules/propertyControlledComponent';

import { addToCart, selectCartItems, deleteFromCart } from './cartSlice';
import styles from './cart.module.css';

export default function Cart({ open, toggleDrawer }) {
  const dispatch = useDispatch();

  const onAddToCart = (name, cost) => () => {
    console.log(name, cost);
    dispatch(addToCart({ name, cost }));
    return;
  };

  const onDeleteFromCart = (name, cost) => () => {
    dispatch(deleteFromCart({ name, cost }));
    return;
  };

  const getCartItems = useCallback(() => {
    const cartItems = useSelector(selectCartItems);
    const cartItemsArray = _values(cartItems);
    return (
      <List>
        {_map(cartItemsArray, ({ name, currentCount, cost }) => (
          <PropertyControlledComponent controllerProperty={currentCount}>
            <ListItem key={name} disablePadding>
              <div className={styles.cartListContainer}>
                <ListItemText primary={name} />
                <div className={styles.addedStateButton}>
                  <IconButton onClick={onAddToCart(name, cost)} color="primary">
                    <AddIcon />
                  </IconButton>
                  <Typography variant="body1" color="primary">
                    {currentCount}
                  </Typography>
                  <IconButton onClick={onDeleteFromCart(name, cost)} color="primary">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
              <Divider />
            </ListItem>
          </PropertyControlledComponent>
        ))}
      </List>
    );
  });

  const getCartActions = useCallback(() => {
    return (
      <Button>
        <Typography variant="button">Checkout</Typography>
      </Button>
    );
  }, []);

  return (
    <div>
      <SwipeableDrawer
        anchor={'bottom'}
        onClose={toggleDrawer(open)}
        onOpen={toggleDrawer(open)}
        open={open}>
        {getCartItems()}
        {getCartActions()}
      </SwipeableDrawer>
    </div>
  );
}

Cart.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func
};

Cart.defaultProps = {
  open: false,
  toggleDrawer: _noop
};
