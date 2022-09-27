import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Typography from 'atoms/Typography';
import styles from './navItem.module.css';
import { Box } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: ' center',
  backgroundColor: theme.palette.background.default,
  padding: '1.6rem',
  boxShadow: ' 4px 12px 15px - 10px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'space-around',
    textAlign: 'center'
  },
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap'
  }
}));

function NavItem({ title, imgSrc, description, path }) {
  const theme = useTheme();
  return (
    <Link
      style={{
        color: theme.palette.secondary.main
      }}
      to={path}
      className={styles.linkStyles}>
      <StyledBox>
        <img height="80px" src={imgSrc} alt={title} />
        <div className={styles.titleDesc}>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="subtitle1">{description}</Typography>
        </div>
      </StyledBox>
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
