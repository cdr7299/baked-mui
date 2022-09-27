import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Typography from 'atoms/Typography';
import styles from './navItem.module.css';

function NavItem({ title, imgSrc, description, path }) {
  const theme = useTheme();

  return (
    <Link
      style={{
        color: theme.palette.secondary.main
      }}
      to={path}
      className={styles.linkStyles}>
      <div
        style={{
          backgroundColor: theme.palette.background.default
        }}
        className={styles.navItemContainer}>
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
