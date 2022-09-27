import _map from 'lodash/map';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    <div className={styles.container}>
      {_map(CAKES, ({ name, src, description, cost }, index) => {
        return (
          <Card
            key={`${name}${index}`}
            imageSrc={src}
            description={description}
            cost={cost}
            onAddToCart={onAddToCart(name, cost)}
            onDeleteFromCart={onDeleteFromCart(name, cost)}
            title={name}
            countInCart={getCurrentProductCount(name)}
          />
        );
      })}
    </div>
  );
}

Products.propTypes = {};

Products.defaultProps = {};

export default Products;
