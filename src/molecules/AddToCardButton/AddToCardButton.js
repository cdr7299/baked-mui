import PropTypes from 'prop-types';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Divider from '@mui/material/Divider';

import Typography from 'atoms/Typography';

import styles from './addToCart.module.css';

function AddToCardButton({ name, onAddToCart, onDeleteFromCart, currentCount }) {
  return (
    <div className={styles.addedStateButton}>
      <IconButton onClick={() => onAddToCart(name)} color="primary">
        <AddIcon />
      </IconButton>
      <Divider orientation="vertical" flexItem />
      <Typography variant="body1" color="primary">
        {currentCount}
      </Typography>
      <Divider orientation="vertical" flexItem />

      <IconButton onClick={() => onDeleteFromCart(name)} color="primary">
        <RemoveIcon />
      </IconButton>
    </div>
  );
}

AddToCardButton.propTypes = {
  name: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
  currentCount: PropTypes.number.isRequired
};

export default AddToCardButton;
