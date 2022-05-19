import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Styles from '../modal/modal.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-description"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description"sx={{display:'flex',justifyContent:'space-around'}}>
            {props.firstProp}
            {props.secondProp}
          </Typography>
          <div style={{display:'flex',justifyContent:'space-evenly'}}>   
          <span className={Styles.firstProp}> {props.firstPropDescription}</span>
         <span className={Styles.secondProp}> {props.secondPropDescription}</span>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
