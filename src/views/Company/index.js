import React, { useEffect } from 'react';
import '../Login/login.css';
import { useDispatch, useSelector } from 'react-redux';
import companyMiddleware from '../../redux/Middleware/companyMiddleware';
import { useHistory } from 'react-router-dom'
import { Table, Button } from 'reactstrap';
import ModalComp from './Modal';

const Company = () => {

    let history = useHistory();
    const dispatch = useDispatch();

    let company = useSelector(({ companyReducer }) => companyReducer.companys);
    let { uid } = useSelector(({ authReducer }) => authReducer.user);
    
    useEffect(() => {
        dispatch(companyMiddleware.getCompany(uid))
    }, [])


    if (!company) {
        return <div style={{ margin: '0 auto' }}>Loading....</div>
    }

    return (

        <div>
            <div className="company">
                <h2>Companies</h2>
            </div>
            <div className="table">
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Company Name</th>
                            <th>Since</th>
                            <th>Timing</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {company.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.since}</td>
                                <td>{user.time}</td>
                                <td>{user.address}</td>
                                <td><Button onClick={() => history.push(`/Company/${user.uid}`)}>View detail</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="lftBtn">
                <ModalComp />
            </div>
        </div>
    )
}

export default Company;