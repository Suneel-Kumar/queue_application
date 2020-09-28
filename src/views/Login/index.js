import React from 'react';
import './login.css'
import { useDispatch } from 'react-redux';
import authMiddleware from '../../redux/Middleware/authMiddleware';
import { Button, Form, Label, FormGroup, Input } from 'reactstrap';
import { FacebookLoginButton } from 'react-social-login-buttons';

const Login = () => {
    const dispatch = useDispatch();

    const loginWithFB = () => {
        dispatch(authMiddleware.signInWithFB());
    }

    return (
        <div className="box" style={{ maxWidth : '500px'}}>
            <Form className="login-form" >
                <h2 className="text-center text-primary font-weight-bold">Sign In</h2>
                <FormGroup autoComplete="true">
                    <Label className="font-weight-bold">Email</Label>
                    <Input type="email" placeholder="Enter Email" />
                </FormGroup>
                <FormGroup>
                    <Label className="font-weight-bold">Password</Label>
                    <Input type="password" placeholder="Enter Password" />
                </FormGroup>
                <Button className="btn-md btn-dark btn-block" >Login</Button>
                <div className="text-center p-3">Or Continue With Your Social account</div>
            </Form>
            <FacebookLoginButton onClick={loginWithFB} />

        </div>
    )
}

export default Login;
