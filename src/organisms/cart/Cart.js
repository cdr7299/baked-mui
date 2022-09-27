import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import _values from 'lodash/values';
import _map from 'lodash/map';
import _noop from 'lodash/noop';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Typography from 'atoms/Typography';
import Modal from 'atoms/Modal';
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

  const [modalVisible, setModalVisible] = useState(false);

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

  const onDiscardAllItemsFromCart = useCallback(
    () => () => {
      dispatch(clearCart());
      setModalVisible(false);
      return;
    },
    [modalVisible]
  );

  const checkoutCurrentCart = useCallback(() => {
    console.log('Current Payload', cartItems);
  }, [cartItems]);

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
  }, [cartItems, onAddToCart, onDeleteFromCart, getCurrentProductCount]);

  const renderModalBody = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          height: '8rem',
          justifyContent: 'space-between'
        }}>
        <Typography variant="body1">Are you sure you want to clear all items from cart?</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '50%' }}>
          <Button variant="contained" onClick={onDiscardAllItemsFromCart()}>
            Yes
          </Button>
          <Button variant="outlined" onClick={() => setModalVisible(false)}>
            No
          </Button>
        </div>
      </div>
    );
  };

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
          <Button variant="contained" onClick={checkoutCurrentCart}>
            <Typography variant="button">Checkout</Typography>
          </Button>
          <Button variant="contained" onClick={() => setModalVisible(true)}>
            <Typography variant="button">Clear Cart</Typography>
          </Button>
        </div>
        <Modal
          open={modalVisible}
          onClose={() => setModalVisible(!modalVisible)}
          renderModalBody={renderModalBody()}
        />
      </>
    );
  }, [cartItems, modalVisible]);

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
