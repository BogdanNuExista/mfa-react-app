import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, requireMfa = false, ...rest }) => {
    const { currentUser, isMfaVerified } = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                if (!currentUser) {
                    // Not logged in, redirect to login
                    return <Redirect to="/login" />;
                }
                
                if (requireMfa && !isMfaVerified) {
                    // Logged in but MFA required and not verified
                    return <Redirect to="/qr-auth" />;
                }
                
                // Passed all checks
                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;