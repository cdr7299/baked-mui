import PropTypes from 'prop-types';

const PropertyControlledComponent = ({ controllerProperty, children, fallback }) => {
  if (!controllerProperty) return fallback;

  return children;
};

PropertyControlledComponent.propTypes = {
  controllerProperty: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
    PropTypes.number
  ]),
  fallback: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

PropertyControlledComponent.defaultProps = {
  controllerProperty: false,
  fallback: null
};

export default PropertyControlledComponent;
