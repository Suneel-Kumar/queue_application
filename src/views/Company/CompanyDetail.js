import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import companyMiddleware from '../../redux/Middleware/companyMiddleware'
import './company.css';
import { useParams } from 'react-router-dom';
import ModalToken from './ModalToken';
import { Button } from 'reactstrap';
import CustomerModal from './CustomerModal';

const CompanyDetail = () => {
    let { companyId } = useParams();
    const dispatch = useDispatch();

    const companyData = useSelector(({ companyReducer }) => companyReducer.companyDetail);

    const [counter, setcounter] = useState(0);

    const updateToken = () => {
        if (+(companyData.token) > companyData.CurrentToken) {
            let token = companyData.CurrentToken + 1;
            setcounter(token);
        } else {
            alert('Token Ended')
        }
        // setTimeout(() => {
        //     if (counter == companyData.token) {
        //         clearInterval(counter)
        //     } else {
        //         counter = counter + 1
        //         setcounter(counter)
        //     }
        // }, companyData.timeInmili)
    }

    const tokenReset = () => {
        if (companyData.currentDate) {
            const date = new Date().getDate();
            if (companyData.currentDate !== date) {
                dispatch(companyMiddleware.tokenDispatch({ companyId, token: 0 }))
            }
            else { return }
        }
        else { return }
    }

    useEffect(() => {
        dispatch(companyMiddleware.CompanyId(companyId));
        tokenReset();
    }, [])


    useEffect(() => {
        dispatch(companyMiddleware.updateTokenInFirebase(counter, companyId))
        dispatch(companyMiddleware.CompanyId(companyId));
    }, [counter])

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         if (companyData) {
    //             console.log(companyData.token, "*****", companyData.CurrentToken)
    //         }
    //         // if (+(companyData.token) > companyData.CurrentToken) {
    //         //     let token = companyData.CurrentToken + 1;
    //         //     setcounter(token);
    //         // } else {
    //         //     alert('Token Ended')
    //         // }
    //     }, 5000);
    //     return () => {
    //         clearInterval(timer)
    //     }
    // }, [])

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
                {companyData.token ? <div><h2> Current token : {companyData.CurrentToken}</h2><Button color="primary" onClick={updateToken}>Done</Button></div>
                    : <div className="btn"><ModalToken companyId={companyId} /></div>
                }
                <div className="btn">
                    <CustomerModal />
                </div>
            </div>
        </div>
    )
}

export default CompanyDetail;