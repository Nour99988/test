import React,{useState} from "react";
import { MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

export default function Modal ({close,content}) {
    const [basicModal, setBasicModal] = useState(true);

    const toggleShow = () => setBasicModal(basicModal);
    return (
        <>
            
            <MDBModal show={basicModal} tabIndex='-1'>
                <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                    <MDBBtn className='btn-close' color='none' onClick={() => close(false)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>{content}</MDBModalBody>

                    <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={() => close(false)}>
                        Close
                    </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}