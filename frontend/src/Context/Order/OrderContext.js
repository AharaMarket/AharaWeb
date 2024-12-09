// src/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    let [order, setOrder] = useState([]);
    let orders = new Set();

    const sendOrder = async (email, orderId, newOrder, vendorName) => {
        try {
            console.log(` userId: ${email} newOrder: ${newOrder}`)
            const response = await axios.post('http://localhost:5050/orders/add', { email, orderId, newOrder, vendorName });

            const parsedResponse = JSON.parse(JSON.stringify(response, null, 2));
            const { data } = parsedResponse;
            setOrder(data);
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const getOrders = async (email) => {
        try {
            const response = await axios.get('http://localhost:5050/orders/get', { params: { email: email } });
            response.data.forEach(obj => {
                orders.add(obj);
              });
              
            return response.data;
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const uploadOrderInvoices = async (email, orderInvoices) => {
        try {
            console.log(` userId: ${email} invoices: ${neworderInvoicesOrder}`)
            const response = await axios.post('http://localhost:5050/orders/addInvoices', { email, orderInvoices });

            const parsedResponse = JSON.parse(JSON.stringify(response, null, 2));
            const { data } = parsedResponse;
            setOrder(data);
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    }

    // const getMostRecentOrder = async (email) => {
    //     try {
    //         const response = await axios.get('http://localhost:5050/orders/getRecent', { params: { email: email } });
    //         order = response;
    //         return order;
    //     } catch (error) {
    //         console.error('Error updating cart item:', error);
    //     }
    // };

    return (
    <OrderContext.Provider value={{ sendOrder, getOrders, order }}>
        {children}
    </OrderContext.Provider>
    );
};
