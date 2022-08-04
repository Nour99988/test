import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

export default function Modal({ close, content, removeButton, setDel, setRemoveButton }) {
  const [basicModal, setBasicModal] = useState(true);

  const toggleShow = () => setBasicModal(basicModal);
  const closeModal = () => {
    close(false);
  };
  const handelDelete = () => {
    close(false);
    setDel(true);
    setRemoveButton(false);
    // del(true);
  };
  return (
    <>
      <MDBModal show={basicModal} tabIndex="-1" onClick={closeModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn className="btn-close" color="none" onClick={closeModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{content}</MDBModalBody>

            <MDBModalFooter>
              {removeButton === true && (
                <MDBBtn color="secondary" onClick={handelDelete}>
                  remove
                </MDBBtn>
              )}
              <MDBBtn color="secondary" style={{ marginLeft: "auto" }} onClick={closeModal}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
