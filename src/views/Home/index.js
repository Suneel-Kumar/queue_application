import React from 'react';
import '../Login/login.css'
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authAction from '../../redux/Action/authAction'

const Home = () => {

    let history = useHistory();
    const dispatch = useDispatch()

    const ShowCompanyMenu = () => {
        history.push('Company');
    }

    const User = () => {
        history.push('/User');
    }

    const receiveNotification = () => {
        Notification.requestPermission().then(function (permission) {
            // let response = permission;
            // dispatch(authAction.notificationAction(response));
        });
    }

    return (
        <div className="container">
            <div className="btn">
                {receiveNotification()}
                <Button color="info" size="lg" onClick={User}>Normal User</Button>
                {' '}&nbsp;&nbsp;
                <Button color="info" size="lg" onClick={ShowCompanyMenu}>Company</Button>
            </div>
        </div>
    )
}

export default Home;
