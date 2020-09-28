import React, { useState, useEffect } from 'react';
import './user.css';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import companyMiddleware from '../../redux/Middleware/companyMiddleware';
import ModalBuyToken from './ModalBuyToken'

const User = () => {

    let history = useHistory();
    const dispatch = useDispatch();
    const [input, setinput] = useState('');
    useEffect(() => {
        dispatch(companyMiddleware.AllCompanies());
    }, []);

    const Search = useSelector(({ companyReducer }) => companyReducer.Search);
    const companys = useSelector(({ companyReducer }) => companyReducer.companys);

    // function formatTimeShow(h_24) {
    //     var h = h_24 % 12;
    //     return (h < 10 ? '0' : '') + h + ':00';
    // }

    const SearchText = () => {
        dispatch(companyMiddleware.searchCompany(input))
    }

    const seeDetails = id => {
        // dispatch(companyMiddleware.SeeCompanyDetail(id));
        history.push(`/User/${id}`);
    }

    return (
        <div>
            <div style={{ marginBottom: '40px' }}>
                <FormGroup row className="d-flex justify-content-center mb-20">
                    <Label sm={1} size="lg" className="font-weight-bold">Search</Label>
                    <Input type="search" name="search" value={input} placeholder="Search ..." bsSize="lg" className="col-md-4" onChange={(e) => setinput(e.target.value)} />
                    <Button onClick={SearchText}>Search</Button>
                </FormGroup>
            </div>
            {input.length == 0 ? companys.map((item) => {
                const { certificate, name, address, time, uid, token } = item;
                return (
                    <div key={uid}>
                        <div className="cards" >
                            <div className="img">
                                <img src={certificate} title="Company Image" />
                            </div>
                            <div className="tilte">
                                <h2>Name : {name}</h2>
                                <h3>Address : {address}</h3>
                                <h3>Timing : {time}</h3>
                                {token ? <div>
                                    <h3>Token : {token}</h3>
                                    <div className="description" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <ModalBuyToken id={uid} />
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button onClick={() => seeDetails(uid)}>See Details</Button>
                                        </div>
                                    </div>
                                </div> : <div><Button disabled>Buy Token</Button> &nbsp;
                                <Button onClick={() => seeDetails(uid)}>See Details</Button></div>}
                            </div>
                        </div>
                    </div>
                )
            }) : Search.map((item) => {
                const { certificate, name, address, time, uid, token } = item;
                return (
                    <div key={uid}>
                        <div className="cards" >
                            <div className="img">
                                <img src={certificate} title="Company Image" />
                            </div>
                            <div className="tilte">
                                <h2>Name : {name}</h2>
                                <h3>Address : {address}</h3>
                                <h3>Timing : {time}</h3>
                                {token ? <div>
                                    <h3>Token : {token}</h3>
                                    <div className="description" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <ModalBuyToken id={uid} />
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button onClick={() => seeDetails(uid)}>See Details</Button>
                                        </div>
                                    </div>
                                </div> : <Button disabled>Buy Token</Button>}
                                <Button onClick={() => seeDetails(uid)}>See Details</Button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default User;