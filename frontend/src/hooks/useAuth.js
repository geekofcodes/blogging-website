import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
    // Check if the user token exists in local storage
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Set to true if token exists
    }, []);

    return { isAuthenticated };
};

export default useAuth;
