import PropTypes from 'prop-types';

import Divider from '@mui/material/Divider';

import AddToCardButton from 'molecules/AddToCardButton';
import PropertyControlledComponent from 'molecules/propertyControlledComponent';
import Typography from 'atoms/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { getCostOfItem } from '../cart.utils';
import styles from './cartItem.module.css';

const CartItem = ({
  name,
  currentCount,
  cost,
  onAddToCart,
  onDeleteFromCart,
  getCurrentProductCount
}) => {
  return (
    <PropertyControlledComponent key={name} controllerProperty={currentCount}>
      <Grid container spacing={2} className={styles.container}>
        <Grid xs={4} sm={6} md={8}>
          <Typography variant="subtitle1" primary={name}>
            {name}
          </Typography>
        </Grid>
        <Grid xs={4} sm={4} md={2}>
          <AddToCardButton
            onAddToCart={onAddToCart(name, cost)}
            onDeleteFromCart={onDeleteFromCart(name, cost)}
            countInCart={getCurrentProductCount(name)}
            name={name}
            cost={cost}
            currentCount={currentCount}
          />
        </Grid>
        <Grid xs={4} sm={2} md={2}>
          <Typography variant="subtitle1" align="right" primary={name}>
            {getCostOfItem(currentCount, cost)}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </PropertyControlledComponent>
  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  currentCount: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
  getCurrentProductCount: PropTypes.func.isRequired
};

export default CartItem;
