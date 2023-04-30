import { useState } from 'react';

export default function useUser() {
    const getUser = () => {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
            return;
        }
        const userToken = JSON.parse(tokenString);
        return userToken;
    };

    const [user, setUser] = useState(getUser());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setUser(userToken.token);
    };

    return {
        saveToken: saveToken,
        user
    }
}