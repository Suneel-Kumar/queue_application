import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import companyMiddleware from '../../redux/Middleware/companyMiddleware';
import { useParams } from 'react-router-dom';

const ModalExample = (props) => {

    const { buttonLabel, className } = props;
    const { companyId } = useParams();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(companyMiddleware.getCustomers(companyId))
    }, [])

    const User = useSelector(({ companyReducer }) => companyReducer.User);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="info" onClick={toggle}>See Customer</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Customer</ModalHeader>
                <ModalBody>
                    {User.length ? User.map((user) => {
                        return <div style={{ width: "200px", height: "200px", display: 'flex' }} key={user.UId}>
                            <h4>{user.name}</h4>
                            <div style={{ float: "right" }}>
                                <img src={user.file} width="100px" height="100px" align="right" />
                            </div>
                        </div>
                    }) : null}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Ok</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;