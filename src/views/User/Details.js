import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import companyMiddleware from '../../redux/Middleware/companyMiddleware';
import MapComponent from '../../components/MapComponent';
import './user.css'
import { Button } from 'reactstrap';
import firebase from '../../config/config'
import ModalBuyToken from './ModalBuyToken'

const Details = () => {

    const { showCompany } = useParams();
    const dispatch = useDispatch();
    const company = useSelector(({ companyReducer }) => companyReducer.companyDetail);

    useEffect(() => {
        dispatch(companyMiddleware.CompanyId(showCompany));
        // ttandToken();
    }, [company.CurrentToken])

    useEffect(() => {
        firebaseGetCtoken()
    }, [company.CurrentToken])

    // const ttandToken = async () => {
    //     let eTokenTime = 0;
    //     let totaltoken = 0;
    //     await firebase.firestore().collection("Company").doc(showCompany).get().then((company) => {
    //         eTokenTime = company.data().timeET*1000;
    //         totaltoken = company.data().token;
    //         if(eTokenTime && totaltoken){
    //            const interval = setInterval(() => {
    //                 alert()
    //             }, eTokenTime);
    //         }
    //     })
    // }

    const firebaseGetCtoken = async () => {
        await firebase.firestore().collection("Company").doc(showCompany).get().then((user) => {
            let token = user.data().CurrentToken + 1;
            firebase.firestore().collection("Users").where("companyId", "==", showCompany).onSnapshot((customer) => {
                let list = [];
                customer.forEach(element => {
                    list.push(element.data())
                });
                if (list[token]) {
                    Notification.requestPermission().then(() => {
                        var title = "Notify";
                        // icon = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
                        var body = `${list[token].name} you have 10 min from your appointment`;
                        var notification = new Notification(title, { body });
                    })
                }
                else {
                    return console.log("No Customer");
                }
            })
        })
    }

    return (
        <div className="main" style={{ margin: 'auto' }}>
            <div>
                <MapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, width: '80%', margin: '0 auto' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
            <div className="body">
                <h3>Name : {company.name}</h3>
                <h3>Since : {company.since}</h3>
                <h3>Office Time : {company.time}</h3>
                {company.token ? <div><h3>Total Token : {company.token}</h3><h3>Current Token : {company.CurrentToken}</h3>
                    <div><ModalBuyToken companyId={showCompany} /></div>
                </div> : null}
            </div>
        </div>
    )
}

export default Details;