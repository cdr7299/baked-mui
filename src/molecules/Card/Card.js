import PropTypes from 'prop-types';

import _noop from 'lodash/noop';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import Button from 'atoms/Button';
import PropertyControlledComponent from 'molecules/propertyControlledComponent';

import styles from './card.module.css';

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
  return (
    <Card variant="outlined" className={`${styles.defaultContainer} ${containerClassName}`}>
      <CardMedia component="img" height="220" image={imageSrc} />
      <CardContent className={styles.cardBody}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography>{cost}</Typography>
      </CardContent>
      <div className={styles.cardActions}>
        <PropertyControlledComponent controllerProperty={!countInCart}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAddToCart}>{`Add to cart`}</Button>
        </PropertyControlledComponent>
        <PropertyControlledComponent controllerProperty={countInCart}>
          <div className={styles.addedStateButton}>
            <IconButton onClick={onAddToCart} color="primary">
              <AddIcon />
            </IconButton>
            <Typography variant="body1" color="primary">
              {countInCart}
            </Typography>
            <IconButton onClick={onDeleteFromCart} color="primary">
              <DeleteIcon />
            </IconButton>
          </div>
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
  cost: PropTypes.string,
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
