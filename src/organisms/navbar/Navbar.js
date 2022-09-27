import _map from 'lodash/map';

import NavItem from './components/navItem';

import { NAV_ITEMS } from './navbar.constants';
import styles from './navbar.module.css';

function Navbar() {
  return (
    <div className={styles.navContainer}>
      {_map(NAV_ITEMS, ({ title, imgSrc, description, path }) => {
        return (
          <NavItem
            key={title}
            title={title}
            imgSrc={imgSrc}
            description={description}
            path={path}
          />
        );
      })}
    </div>
  );
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
