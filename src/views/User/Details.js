import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import companyMiddleware from '../../redux/Middleware/companyMiddleware';
import MapComponent from '../../components/MapComponent';
import './user.css'
import { Button } from 'reactstrap';
import firebase from '../../config/config'
import { fireEvent } from '@testing-library/react';
import ModalBuyToken from './ModalBuyToken'

const Details = () => {

    const { showCompany } = useParams();
    const dispatch = useDispatch();
    let currentToken = 0;
    const company = useSelector(({ companyReducer }) => companyReducer.companyDetail);
    // const notification = useSelector(({ authReducer }) => authReducer.notification);

    useEffect(() => {
        dispatch(companyMiddleware.CompanyId(showCompany));
    }, [])

    const handleShow = () => {

    }

    useEffect(() => {
        firebaseGetCtoken();
    }, [])


    const firebaseGetCtoken = () => {
        firebase.firestore().collection("Company").doc(showCompany).onSnapshot((user) => {
            let token = user.data().CurrentToken + 1

            firebase.firestore().collection("Users").where("companyId", "==", +(showCompany)).get().then((customer) => {
                let list = [];
                customer.forEach(element => {
                    list.push(element.data())
                });
                console.log(list, "List");
                console.log(list[token]);
                if (list[token]) {
                    // console.log(list[token].UId)
                    if (list[token].UId) {
                        Notification.requestPermission().then(() => {
                            var title = "Notify";
                            // icon = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
                            var body = `${list[token].name} you have 10 min from your appointment`;
                            var notification = new Notification(title, { body });
                        })
                    }
                    else {
                        return alert("No Customer regarding");
                    }
                }
            })
        })
    }


    return (
        <div className="main" style={{margin : 'auto'}}>
            <div>
                <MapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, width: '80%', margin: '0 auto' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                // LagLat={company.lagitude}
                />
            </div>
            <div className="body">
                <h3>Name : {company.name}</h3>
                <h3>Since : {company.since}</h3>
                <h3>Office Time : {company.time}</h3>
                {company.token ? <div><h3>Total Token : {company.token}</h3><h3>Current Token : {company.CurrentToken}</h3></div> : null}
                {/* {company.Allow == false ? (
                    <Button disabled>
                        Tokens are Disallow for Today
                    </Button>
                ) : (
                        <Button onClick={handleShow}>
                            Buy Token
                        </Button>
                    )} */}
                <div><ModalBuyToken companyId={showCompany}/></div>
            </div>
        </div>
    )
}

export default Details;