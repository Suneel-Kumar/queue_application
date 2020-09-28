import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Company from './views/Company';
import CompanyDetail from './views/Company/CompanyDetail';
import User from './views/User';
import ShowCompany from './views/User/Details'

const AppRoutes = ({ user }) => {

    const currentPath = window.location.pathname.length === 1 ? 'home' : window.location.pathname;

    const AuthChecker = (User, component) => {
        return User.displayName ? component : <Redirect to='/login' />
    }

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    {AuthChecker(user, <Home />)}
                </Route>
                <Route exact path="/Company">
                    {AuthChecker(user, <Company />)}
                </Route>
                <Route exact path="/Company/:companyId">
                    {AuthChecker(user, <CompanyDetail />)}
                </Route>
                <Route exact path="/User">
                    {AuthChecker(user, <User />)}
                </Route>
                <Route exact path="/User/:showCompany">
                    {AuthChecker(user, <ShowCompany />)}
                </Route>
                <Route exact path='/login'>
                    {user.displayName ? <Redirect to='/' /> : <Login />}
                </Route>
                {/* <Route path='/'>
                    {user.displayName ? <Redirect to={currentPath} /> : <Login />}
                </Route> */}
            </Switch>
        </div >
    )
}

export default AppRoutes;  