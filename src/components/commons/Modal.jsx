import React, {useState} from 'react';
import * as PropTypes from 'prop-types'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from "@mui/material/Divider";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from "@mui/material/IconButton";

const styles = (width = 600, height = 'auto') => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width,
    height,
    border: '1px solid #939393',
    boxShadow: 30,
    p: 4,
  };
};

export default function CustomModal(
  {
    visible,
    setVisible,
    title,
    children,
    width = 600,
    height = 'auto',
    heightBody = '400px',
    bodyOverflowY,
    styleContent = {},
    showCloseButton,
    ...otherProps
  }
) {
  const [open, setOpen] = useState(visible);

  const handleClose = () => setVisible(false);

  return (
    <div>
      <Modal
        open={visible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        {...otherProps}
      >
        <Box sx={styles(width, height)}>
          {showCloseButton&&<IconButton
            onClick={() => handleClose()}
            sx={{float: 'right', top: '-25px', right: '-22px'}}>
            <HighlightOffIcon/>
          </IconButton>}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Divider/>
          <Box sx={{mt: 2, height: heightBody, overflowY: bodyOverflowY, ...styleContent}} >
            {children}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

CustomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.object,
  title: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number,]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number,]),
  heightBody: PropTypes.oneOfType([PropTypes.string, PropTypes.number,]),
  bodyOverflowY: PropTypes.string,
  styleContent: PropTypes.object,
  showCloseButton: PropTypes.bool
};

CustomModal.defaultProps = {
  bodyOverflowY : "scroll",
  showCloseButton : true
}
