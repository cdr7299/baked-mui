import _map from 'lodash/map';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';

import Card from 'molecules/ProductCard';
import { CAKES } from 'mockData/cakes';
import { addToCart, selectCartItems, deleteFromCart } from '../cart/cartSlice';

import styles from './products.module.css';

function Products() {
  const dispatch = useDispatch();
  const getCurrentProductCount = (name) => {
    const allData = useSelector(selectCartItems);
    return allData[name]?.currentCount;
  };

  const onAddToCart = useCallback((name, cost) => () => {
    dispatch(addToCart({ name, cost }));
    return;
  });

  const onDeleteFromCart = useCallback((name, cost) => () => {
    dispatch(deleteFromCart({ name, cost }));
    return;
  });

  return (
    <Grid
      className={styles.container}
      container
      columnSpacing={3}
      rowSpacing={4}
      disableEqualOverflow>
      {_map(CAKES, ({ name, src, description, cost }, index) => {
        return (
          <Grid key={`${name}${index}`} xs={12} sm={6} md={6} lg={4}>
            <Card
              imageSrc={src}
              description={description}
              cost={cost}
              onAddToCart={onAddToCart(name, cost)}
              onDeleteFromCart={onDeleteFromCart(name, cost)}
              title={name}
              countInCart={getCurrentProductCount(name)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

Products.propTypes = {};

Products.defaultProps = {};

export default Products;
