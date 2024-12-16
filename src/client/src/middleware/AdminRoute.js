import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const [isAllowed, setIsAllowed] = useState(null); // Null indicates loading state
    const token = localStorage.getItem('authToken');
    useEffect(() => {
        const checkRole = async () => {
            try {
                const response = await fetch('/check/role', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify({ token }),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setIsAllowed(data.role_id == 1); // Adjust the condition based on your backend response
                } else {
                    setIsAllowed(false);
                }
            } catch (error) {
                console.error('Error verifying role:', error);
                setIsAllowed(false); // Handle errors by denying access
            }
        };

        checkRole();
    }, [token]);

    // Show a loading state while the role is being verified
    if (isAllowed === null) {
        return <div>Loading...</div>; // Optional: You can add a spinner or skeleton loader here
    }

    // Navigate to login or another page if not allowed
    if (!isAllowed) {
        return <Navigate to="/user" />;
    }

    return <Outlet />;
};

export default AdminRoute;