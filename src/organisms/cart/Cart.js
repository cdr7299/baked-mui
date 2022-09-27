import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import _values from 'lodash/values';
import _map from 'lodash/map';
import _noop from 'lodash/noop';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Typography from 'atoms/Typography';
import PropertyControlledComponent from 'molecules/propertyControlledComponent';
import AddToCardButton from 'molecules/AddToCardButton';

import { addToCart, selectCartItems, deleteFromCart, clearCart } from './cartSlice';
import styles from './cart.module.css';
import {
  checkIfCartIsEmpty,
  getCostOfItem,
  getTotalCartItems,
  getTotalCartValue
} from './cart.utils';

export default function Cart({ open, toggleDrawer }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const getCurrentProductCount = (name) => {
    return cartItems[name]?.currentCount;
  };

  const onAddToCart = useCallback((name, cost) => () => {
    dispatch(addToCart({ name, cost }));
    return;
  });

  const onDeleteFromCart = useCallback((name, cost) => () => {
    dispatch(deleteFromCart({ name, cost }));
    return;
  });

  const onDiscardAllItemsFromCart = useCallback(() => () => {
    dispatch(clearCart({ name: 'all' }));
    return;
  });

  const getCartItems = useCallback(() => {
    const cartItemsArray = _values(cartItems);
    if (checkIfCartIsEmpty(cartItems)) {
      return (
        <div className={styles.emptyCart}>
          <Typography variant="subtitle1" component="div">
            Cart is empty, please add some items!
          </Typography>
        </div>
      );
    }
    return (
      <div className={styles.cartListContainer}>
        {_map(cartItemsArray, ({ name, currentCount, cost }) => (
          <PropertyControlledComponent key={name} controllerProperty={currentCount}>
            <div className={styles.cartListItemContainer}>
              <Typography variant="subtitle1" className={styles.cartItemName} primary={name}>
                {name}
              </Typography>
              <AddToCardButton
                onAddToCart={onAddToCart(name, cost)}
                onDeleteFromCart={onDeleteFromCart(name, cost)}
                countInCart={getCurrentProductCount(name)}
                name={name}
                cost={cost}
                currentCount={currentCount}
              />
              <Typography
                variant="subtitle1"
                align="right"
                className={styles.cartItemCost}
                primary={name}>
                {getCostOfItem(currentCount, cost)}
              </Typography>
            </div>
            <Divider />
          </PropertyControlledComponent>
        ))}
      </div>
    );
  });

  const getCartActions = useCallback(() => {
    return (
      <>
        <div className={styles.cartListItemContainer}>
          <Typography variant="subtitle1" className={styles.cartItemName}>
            Price to pay at checkout
          </Typography>
          <Typography align="right" variant="subtitle1" className={styles.cartItemName}>
            {getTotalCartItems(cartItems)}
          </Typography>

          <Typography variant="subtitle1" align="right" className={styles.cartItemCost}>
            {getTotalCartValue(cartItems)}
          </Typography>
        </div>
        <div className={styles.cartActions}>
          <Button variant="contained">
            <Typography variant="button">Checkout</Typography>
          </Button>
          <Button variant="contained">
            <Typography variant="button" onClick={onDiscardAllItemsFromCart()}>
              Clear Cart
            </Typography>
          </Button>
        </div>
      </>
    );
  }, [cartItems]);

  return (
    <SwipeableDrawer
      anchor={'bottom'}
      onClose={toggleDrawer(open)}
      onOpen={toggleDrawer(open)}
      open={open}>
      <div className={styles.cartBody}>
        {getCartItems()}
        <PropertyControlledComponent controllerProperty={!checkIfCartIsEmpty(cartItems)}>
          {getCartActions()}
        </PropertyControlledComponent>
      </div>
    </SwipeableDrawer>
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
