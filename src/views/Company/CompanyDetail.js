import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import companyMiddleware from '../../redux/Middleware/companyMiddleware'
import './company.css';
import { useParams } from 'react-router-dom';
import ModalToken from './ModalToken';
import { Button } from 'reactstrap';

const CompanyDetail = () => {

    let { companyId } = useParams();
    const dispatch = useDispatch();

    const companyData = useSelector(({ companyReducer }) => companyReducer.companyDetail);
    let [counter, setcounter] = useState(0);

    useEffect(() => {
        dispatch(companyMiddleware.CompanyId(companyId));
        tokenReset();
    }, [])

    const tokenReset = () => {
        if (companyData.currentDate) {
            const date = new Date().getDate();
            if (companyData.currentDate !== date) {
                dispatch(companyMiddleware.tokenDispatch({ companyId, token: 0 }))
            }
            else{ return }
        }
        else { return }
    }


    const updateToken = () => {
        if (companyData.token > counter) {
            setcounter(counter + 1)
        } else {
            alert('Token Ended')
        }
        setTimeout(() => {
            if (counter == companyData.token) {
                clearInterval(counter)
            } else {
                counter = counter + 1
                setcounter(counter)
            }
        }, companyData.timeInmili)
    }

    return (
        <div className="box">
            <div className="img">
                <img src={companyData.certificate} />
            </div>
            <div className="right">
                <h2>Name : {companyData.name}</h2>
                <h2>Since : {companyData.since}</h2>
                <h2>Address : {companyData.address}</h2>
                <h2>Office Time : {companyData.time}</h2>
                <h2>Today's Token : {companyData.token ? companyData.token : 0}</h2>
                {companyData.token ? <div><h2> Current token : {counter}</h2><Button color="primary" onClick={updateToken}>Done</Button></div>
                    : <div className="btn"><ModalToken companyId={companyId} /></div>
                }
            </div>
        </div>
    )
}

export default CompanyDetail;