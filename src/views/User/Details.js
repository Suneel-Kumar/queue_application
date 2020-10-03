import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import companyMiddleware from '../../redux/Middleware/companyMiddleware';
import MapComponent from '../../components/MapComponent';
import './user.css'
import { Button } from 'reactstrap';

const Details = () => {

    const { showCompany } = useParams();
    const dispatch = useDispatch();
    const company = useSelector(({ companyReducer }) => companyReducer.companyDetail);
    // const notification = useSelector(({ authReducer }) => authReducer.notification);

    useEffect(() => {
        dispatch(companyMiddleware.CompanyId(showCompany));
    }, [])

    const handleShow = () => {

    }

    const SendNotification = () => {
        Notification.requestPermission().then(() => {
            var title = "Notify";
            // icon = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
            var body = "You just left 10 min";
            var notification = new Notification(title, { body });
        }).catch((rej) => {
            console.log(rej)
        })
        // if (notification) {
        // setTimeout(() => {
        //     if (notification == "granted") {
        //         console.log('Settimeout ka if block')
        var title = "Notify";
        // icon = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
        var body = "You just left 10 min";
        var notification = new Notification(title, { body });
        //     }
        //     else {
        //         return "nothing Happend";
        //     }
        // }, 50000);
        // }
    }

    // SendNotification();

    return (
        <div className="main">
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
                {company.Allow == false ? (
                    <Button disabled>
                        Tokens are Disallow for Today
                    </Button>
                ) : (
                        <Button onClick={handleShow}>
                            Buy Token
                        </Button>
                    )}
            </div>
        </div>
    )
}

export default Details;