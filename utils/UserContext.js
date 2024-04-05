import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const signedUser = Boolean(user);

    // Logic to set and unset user, possibly from authentication service

    return (
        <UserContext.Provider value={{ user, signedUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;