import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import companyMiddleware from '../../redux/Middleware/companyMiddleware'

const ModalExample = (props) => {

    const dispatch = useDispatch()
    const { buttonLabel, className, companyId } = props;
    const [modal, setModal] = useState(false);
    const [token, settoken] = useState(0);
    const [timeET, settimeET] = useState(0);
    const toggle = () => setModal(!modal);

    function getData() {
        // const timeInmili = timeET * 60000;
        const currentDate = new Date().getDate();
        const obj = { companyId, token, timeET, currentDate, tokenNumber : 0 }
        dispatch(companyMiddleware.companyTokenAdd(obj))
        setModal(!modal);
    }

    return (
        <div>
            <Button color="secondary" onClick={toggle} >Add Token</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Company Modal</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="exampleEmail">Add Token</Label>
                        <Input type="text" name="token" placeholder="Add Tokens" onChange={(e) => settoken(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Time for each token in minutes</Label>
                        <Input type="text" name="time" onChange={(e) => settimeET(e.target.value)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={getData}>Done</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;