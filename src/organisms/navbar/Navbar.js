import _map from 'lodash/map';

import NavItem from './components/navItem';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { NAV_ITEMS } from './navbar.constants';

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: '#dbbb92d5',
  padding: '4rem 6rem',
  boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('md')]: {
    padding: '2rem 4rem'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '1rem 2rem'
  }
}));

function Navbar() {
  return (
    <StyledGridContainer container spacing={0} rowSpacing={1} disableEqualOverflow>
      {_map(NAV_ITEMS, ({ title, imgSrc, description, path }) => {
        return (
          <Grid xs={12} md={4} lg={4}>
            <NavItem
              key={title}
              title={title}
              imgSrc={imgSrc}
              description={description}
              path={path}
            />
          </Grid>
        );
      })}
    </StyledGridContainer>
  );
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
