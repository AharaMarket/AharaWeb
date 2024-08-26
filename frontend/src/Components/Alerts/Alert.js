// src/Alert.js
import React from 'react';
import './Alert.css';

const Alert = ({ message, type, onClose }) => {
    if (!message) return null;

    return (
        <div className={`alert alert-${type}`}>
            {message}
            <button onClick={onClose} className="close-btn">X</button>
        </div>
    );
};

export default Alert;
