// withAuthentication.js
import React from 'react';
import { useUser } from './UserContext';

const withAuthentication = (WrappedComponent) => {
    return (props) => {
        const { signedUser } = useUser();

        if (!signedUser) {
            // Redirect to login or show a message
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuthentication;