import { useState } from 'react';
import PropTypes from 'prop-types';

import _noop from 'lodash/noop';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import Button from 'atoms/Button';
import PropertyControlledComponent from 'molecules/propertyControlledComponent';
import AddToCardButton from 'molecules/AddToCardButton';

import styles from './productCard.module.css';

function ProductCard({
  title,
  imageSrc,
  description,
  containerClassName,
  countInCart,
  cost,
  onAddToCart,
  onDeleteFromCart
}) {
  const [cardProps, setCardProps] = useState({
    raised: false,
    shadow: 1
  });
  return (
    <Card
      classes={{ root: cardProps.raised ? styles.cardHovered : '' }}
      className={`${styles.defaultContainer} ${containerClassName}`}
      onMouseOut={() => setCardProps({ raised: false, shadow: 1 })}
      onMouseOver={() => setCardProps({ raised: true, shadow: 2 })}
      raised={cardProps.raised}
      zdepth={cardProps.shadow}>
      <CardMedia component="img" height="200" image={imageSrc} />
      <CardContent className={styles.cardBody}>
        <Typography gutterBottom variant="h5" component="div" className={styles.cardText}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className={styles.cardText}
          color="text.secondary">
          {description}
        </Typography>
        <Typography className={styles.cost} variant="h5">
          {`$ ${cost}`}
        </Typography>
      </CardContent>
      <div className={styles.cardActions}>
        <PropertyControlledComponent controllerProperty={!countInCart}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAddToCart}>{`Add to cart`}</Button>
        </PropertyControlledComponent>
        <PropertyControlledComponent controllerProperty={countInCart}>
          <AddToCardButton
            onAddToCart={onAddToCart}
            onDeleteFromCart={onDeleteFromCart}
            name={title}
            cost={cost}
            currentCount={countInCart}
          />
        </PropertyControlledComponent>
      </div>
    </Card>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
  containerClassName: PropTypes.string,
  countInCart: PropTypes.number,
  cost: PropTypes.number,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func
};

ProductCard.defaultProps = {
  title: '',
  description: '',
  imageSrc: '',
  countInCart: 0,
  cost: '',
  onAddToCart: _noop,
  onDeleteFromCart: _noop
};
