import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import companyMiddleware from '../../redux/Middleware/companyMiddleware';
import MyMapComponent from '../../components/index'

function ModalComp(props) {

    const dispatch = useDispatch();
    const { uid } = useSelector(({ authReducer }) => authReducer.user)

    const [modal, setModal] = useState(false);
    const { buttonLabel, className } = props;
    const [name, setname] = useState('');
    const [since, setsince] = useState(0);
    const [certificate, setcertificate] = useState('');
    // const [certificate, setcertificate] = useState([]);
    const [time, settime] = useState('');
    const [address, setaddress] = useState('');
    const [Map, setMap] = useState('');
    const [lagitude, setlagitude] = useState({})

    const getMapData = (res, { lt, ln }) => {
        setlagitude({ lt, ln })
        setMap(res.response.venues)
    }

    const SaveData = () => {
        const CompanyInfo = { uid: Date.now(), userId: uid, name, since, certificate, time, address, lagitude }
        dispatch(companyMiddleware.addCompany(CompanyInfo));
        setModal(!modal);
    }

    const toggle = () => {
        setModal(!modal);
    }

    return (
        <div>
            <Button color="info" style={{ borderRadius: '50%' }} onClick={toggle}>+</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Company Form</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label className="font-weight-bold">Company Name</Label>
                            <Input type="text" value={name} placeholder="Name" onChange={(e) => setname(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="font-weight-bold">Since</Label>
                            <Input type="text" value={since} onChange={(e) => setsince(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="font-weight-bold">Certificates</Label>
                            <Input type="file" multiple onChange={(e) => setcertificate(e.target.files[0])} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="font-weight-bold">Timings</Label>
                            <Input type="text" onChange={e => settime(e.target.value)} />
                        </FormGroup>
                        <FormGroup>

                            {/* setaddress(e.options[e.selectedIndex].value) */}
                            <Label className="font-weight-bold">Select Address</Label>
                            {Map ? <Input type="select" name="select" onChange={(e) => setaddress(e.target.value)}> {Map.map((address, index) => <option key={index}>{address.name}</option>)}</Input> : null}
                            <br />
                            <MyMapComponent
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px`, width: '100%' }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                getMapData={getMapData}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={SaveData}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalComp;