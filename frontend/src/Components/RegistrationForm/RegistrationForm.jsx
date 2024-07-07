import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationForm.css'; 

const RegistrationForm = () => {
    let navigate = useNavigate();

    const handleRestaurantClick = () => {
        navigate('/market/restaurant-registration');
    };

    const handleDistributorClick = () => {
        navigate('/market/distributor-registration');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register as:</h1>
            <button className={styles.button} onClick={handleRestaurantClick}>I am a Restaurant</button>
            <button className={styles.button} onClick={handleDistributorClick}>I am a Distributor</button>
        </div>
    );
};

export default RegistrationForm;
