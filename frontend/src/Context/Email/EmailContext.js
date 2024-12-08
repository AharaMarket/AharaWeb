import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {

    const sendEmail = async (email, orderId, newOrder, vendorName) => {
        const response = await axios.post('http://localhost:5050/email/send', { email, orderId, newOrder, vendorName });
        console.log(response.data);
    }

    
    return (
        <EmailContext.Provider value={{ sendEmail }}>
            {children}
        </EmailContext.Provider>
        );
}