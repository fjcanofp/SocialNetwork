import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../Services/AuthService';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            AuthService.getUserInfo() ?
                <Component {...props} />
            : <Redirect to="/SignIn" />
        )} />
    );
};

export default PrivateRoute;