import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Typography from 'atoms/Typography';
import styles from './navItem.module.css';

function NavItem({ title, imgSrc, description, path }) {
  return (
    <Link to={path} className={styles.linkStyles}>
      <div className={styles.navItemContainer}>
        <div>
          <img height="100px" src={imgSrc} alt={title} />
        </div>
        <div className={styles.titleDesc}>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="subtitle1">{description}</Typography>
        </div>
      </div>
    </Link>
  );
}

NavItem.propTypes = {
  title: PropTypes.string,
  imgSrc: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string
};

NavItem.defaultProps = {
  title: '',
  imgSrc: '',
  description: '',
  path: ''
};

export default NavItem;
