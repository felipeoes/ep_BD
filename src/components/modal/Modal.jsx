import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import {
  ModalContainer,
  ModalContentContainer,
  ModalHeader,
  ModalHeaderTab,
  ModalHeaderTabContainer,
  ModalHeaderTabDivider,
  ModalHeaderTabTitle,
  ModalTitle,
} from "./styles";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.42);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};

const ServicesModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  var ModalContent = props.ModalContent;

  useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);
    },
  }));

  useEffect(() => {
    props.setModalFunction(() => handleOpen);
  }, []);

  function handleOpen() {
    setOpen(true);
  }

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>{props.headerTitle}</ModalTitle>
            <ModalHeaderTabContainer>
              <ModalHeaderTab>
                {/* <ModalHeaderTabTitle>Informações</ModalHeaderTabTitle>
                <ModalHeaderTabDivider /> */}
              </ModalHeaderTab>
              <ModalHeaderTab>
                <ModalHeaderTabTitle>Informações</ModalHeaderTabTitle>
                <ModalHeaderTabDivider />
              </ModalHeaderTab>
            </ModalHeaderTabContainer>
          </ModalHeader>
          <ModalContentContainer>
            <ModalContent handleOnClose={handleClose} />
          </ModalContentContainer>
        </ModalContainer>
      </StyledModal>
    </div>
  );
});

export default ServicesModal;
// import React, { useState } from "react";
// import { Modal, ButtonToolbar, Button, Loader } from "rsuite";

// export default function ServicesModal() {
//   const [open, setOpen] = useState(false);
//   const [rows, setRows] = useState(0);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleEntered = () => {
//     setTimeout(() => setRows(80), 2000);
//   };

//   return (
//     <div className="modal-container">
//       <ButtonToolbar>
//         <Button onClick={handleOpen}>Open</Button>
//       </ButtonToolbar>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         onEntered={handleEntered}
//         onExited={() => {
//           setRows(0);
//         }}
//       >
//         <Modal.Header>
//           <Modal.Title>Modal Title</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {rows ? (
//             <p>{rows}</p>
//           ) : (
//             <div style={{ textAlign: "center" }}>
//               <Loader size="md" />
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={handleClose} appearance="primary">
//             Ok
//           </Button>
//           <Button onClick={handleClose} appearance="subtle">
//             Cancel
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
