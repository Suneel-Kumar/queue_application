import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import companyMiddleware from '../../redux/Middleware/companyMiddleware';
import firebase from '../../config/config'

const ModalExample = (props) => {

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [file, setfile] = useState('');
    const [tokenNum, settokenNum] = useState(0)
    const toggle = () => setModal(!modal);
    const { buttonLabel, className, companyId } = props;

    const Save = () => {
        const userInfo = { companyId, name, email, file, UId: Date.now(),  tokenNum}
        dispatch(companyMiddleware.UserInfo(userInfo));
        setModal(!modal);
    }

    useEffect(() => {
        tokenNumber()
    }, [])

    const tokenNumber = async () => {
        await firebase.firestore().collection("Company").doc(companyId).get().then((user) => {
            settokenNum(user.data().tokenNumber + 1);
        })
    }
    
    return (
        <div>
            <Button onClick={toggle}>Buy Token</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label className="font-weight-bold">Name</Label>
                        <Input type="text" value={name} placeholder="Name" onChange={(e) => setname(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Email</Label>
                        <Input type="email" value={email} onChange={(e) => setemail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="font-weight-bold">Image</Label>
                        <Input type="file" onChange={(e) => setfile(e.target.files[0])} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={Save}>Done</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;