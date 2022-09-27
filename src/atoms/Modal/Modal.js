import PropTypes from 'prop-types';

import _noop from 'lodash/noop';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import PropertyControlledComponent from 'molecules/propertyControlledComponent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

function TransitionsModal({ open, handleClose, renderModalBody }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <PropertyControlledComponent controllerProperty={renderModalBody}>
              {renderModalBody}
            </PropertyControlledComponent>
            <PropertyControlledComponent controllerProperty={!renderModalBody}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </PropertyControlledComponent>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

TransitionsModal.propTypes = {
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  renderModalBody: PropTypes.node
};

TransitionsModal.defaultProps = {
  open: false,
  handleOpen: _noop,
  handleClose: _noop,
  renderModalBody: null
};

export default TransitionsModal;
