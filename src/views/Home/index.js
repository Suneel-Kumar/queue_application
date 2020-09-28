import React from 'react';
import '../Login/login.css'
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom'

const Home = () => {

    let history = useHistory();

    const ShowCompanyMenu = () => {
        history.push('Company');
    }

    const User = () => {
        history.push('/User');
    }

    return (
        <div className="container">
            <div className="btn">
                <Button color="info" size="lg" onClick={User}>Normal User</Button>
                {' '}&nbsp;&nbsp;
                <Button color="info" size="lg" onClick={ShowCompanyMenu}>Company</Button>
            </div>
        </div>
    )
}

export default Home;
