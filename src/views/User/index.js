import React, { useState, useEffect } from 'react';
import './user.css';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormGroup, Label, Input, Button } from 'reactstrap';
import companyMiddleware from '../../redux/Middleware/companyMiddleware';
import ModalBuyToken from './ModalBuyToken'

const User = () => {

    let history = useHistory();
    const dispatch = useDispatch();
    const [input, setinput] = useState('');
    const [limit, setlimit] = useState(5);

    useEffect(() => {
        dispatch(companyMiddleware.AllCompanies(limit));
        document.addEventListener('scroll', trackScrolling);
        return () => {
            document.removeEventListener('scroll', trackScrolling)
        }
    }, [limit])


    useEffect(() => {
        document.addEventListener('scroll', trackScrolling)
        return () => {
            document.removeEventListener('scroll', trackScrolling)
        }
    }, [])

    const Search = useSelector(({ companyReducer }) => companyReducer.Search);
    const companys = useSelector(({ companyReducer }) => companyReducer.companys);

    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const trackScrolling = () => {
        const wrappedElement = document.getElementById("header");
        if (isBottom(wrappedElement)) {
            setlimit(limit + 2);
            document.removeEventListener('scroll', trackScrolling);
        }
    };

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
        <div >
            <div style={{ marginBottom: '40px' }} >
                <FormGroup row className="d-flex justify-content-center mb-20">
                    <Label sm={1} size="lg" className="font-weight-bold">Search</Label>
                    <Input type="search" name="search" value={input} placeholder="Search ..." bsSize="lg" className="col-md-4" onChange={(e) => setinput(e.target.value)} />
                    <Button onClick={SearchText}>Search</Button>
                </FormGroup>
            </div>
            <div id="header">
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
                                        <Button onClick={() => seeDetails(uid)}>See Details</Button>
                                    </div> : <Button onClick={() => seeDetails(uid)}>See Details</Button>}
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
                                        <Button onClick={() => seeDetails(uid)}>See Details</Button>
                                    </div> : <Button onClick={() => seeDetails(uid)}>See Details</Button>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default User;