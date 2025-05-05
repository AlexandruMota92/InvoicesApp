import { Box, Modal } from "@mui/material";

import "./CustomModal.css";

const style = {
  pt: 2,
  px: 4,
  pb: 3,
};

type CustomModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const CustomModal = (props: CustomModalProps) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className="modalBox" sx={{ ...style, width: 400 }}>
        <h2 className="parent-modal-title">{props.title}</h2>
        {props.children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
