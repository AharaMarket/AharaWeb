// src/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    let [order, setOrder] = useState(null);
    let orders = new Set();

    const sendOrder = async (email, orderId, newOrder) => {
        try {
            console.log(` userId: ${email} newOrder: ${newOrder}`)
            const response = await axios.post('http://localhost:5050/orders/add', { email, orderId, newOrder });
            console.log("response: " + response.data);

            order = response.data;
            await setOrder(response.data);
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

    return (
    <OrderContext.Provider value={{ sendOrder, getOrders, order }}>
        {children}
    </OrderContext.Provider>
    );
};
