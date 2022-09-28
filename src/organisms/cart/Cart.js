import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import _values from 'lodash/values';
import _map from 'lodash/map';
import _noop from 'lodash/noop';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import Typography from 'atoms/Typography';
import Modal from 'atoms/Modal';
import PropertyControlledComponent from 'molecules/propertyControlledComponent';

import { addToCart, selectCartItems, deleteFromCart, clearCart } from './cartSlice';
import styles from './cart.module.css';
import { checkIfCartIsEmpty, getTotalCartItems, getTotalCartValue } from './cart.utils';
import CartItem from './components/CartItem';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: ' center',
  padding: '1.6rem',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  },
  [theme.breakpoints.up('sm')]: {
    width: '50%'
  },
  [theme.breakpoints.up('lg')]: {
    width: '30%'
  }
}));

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
          <CartItem
            key={name}
            name={name}
            currentCount={currentCount}
            cost={cost}
            onAddToCart={onAddToCart}
            onDeleteFromCart={onDeleteFromCart}
            getCurrentProductCount={getCurrentProductCount}
          />
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
        <Grid container className={styles.cartSummary}>
          <Grid xs={4} sm={6} md={8}>
            <Typography variant="subtitle1">Price to pay at checkout</Typography>
          </Grid>
          <Grid xs={4} sm={4} md={2}>
            <Typography align="center" variant="subtitle1">
              {getTotalCartItems(cartItems)}
            </Typography>
          </Grid>
          <Grid xs={4} sm={2} md={2}>
            <Typography variant="subtitle1" align="right">
              {getTotalCartValue(cartItems)}
            </Typography>
          </Grid>
        </Grid>
        <StyledBox>
          <Button variant="contained" onClick={checkoutCurrentCart}>
            <Typography variant="button">Checkout</Typography>
          </Button>
          <Button variant="contained" onClick={() => setModalVisible(true)}>
            <Typography variant="button">Clear Cart</Typography>
          </Button>
        </StyledBox>
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
