import { useState } from 'react';

export default function useRoles() {
    const getRoles = () => {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
            return;
        }
        const userToken = JSON.parse(tokenString);
        return userToken && userToken.roles;
    };

    const [roles, setRoles] = useState(getRoles());

    const saveRoles = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setRoles(userToken.token);
    };

    return {
        saveRoles: saveRoles,
        roles
    }
}