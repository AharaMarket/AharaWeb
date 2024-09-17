import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../Context/User/UserContext'; // Adjust the import path if necessary
import { Typography, Container, Paper, CircularProgress, Button } from '@mui/material';

function Account() {
    const { user } = useContext(UserContext); // Access user from context
    const [userInfo, setUserInfo] = useState(null); // State to store user information
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        if (user) {
            console.log(user)
            // Fetch user account information when component mounts and user is logged in
            fetch(`http://localhost:5050/restaurants/account?email=${encodeURIComponent(user)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setUserInfo(data.data);
                    } else {
                        setError(new Error(data.message));
                    }
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        } else {
            // If user is not logged in or email is not available, handle accordingly
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error: {error.message}</Typography>;
    }

    if (!user) {
        return <Typography variant="h6">Please log in to view your account information.</Typography>;
    }

    return (
        <Container component={Paper} sx={{ padding: 3, marginTop: 2 }}>
            <Typography variant="h4" gutterBottom>
                Account Information
            </Typography>
            {userInfo ? (
                <div>
                    <Typography variant="h6">Name: {userInfo.name}</Typography>
                    <Typography variant="h6">Email: {userInfo.email}</Typography>
                    <Typography variant="h6">Restaurant: {userInfo.restaurantName}</Typography>
                    <br></br>
                    {/* Add more user info fields as needed */}
                </div>
            ) : (
                <Typography variant="h6">No account information available.</Typography>
            )}
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
                Go Back
            </Button>
        </Container>
    );
}

export default Account;
