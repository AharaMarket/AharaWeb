// src/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5050/carts/user?email=${email}`);
      setCart(response.data.cart.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addItemToCart = async (email, productSpecification, quantity) => {
    try {
      const response = await axios.post('http://localhost:5050/carts/add', { email, productSpecification, quantity });
      setCart(response.data.cart.items);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const updateCartItem = async (email, productSpecification, quantity) => {
    try {
      const response = await axios.post('http://localhost:5050/carts/update', { email, productSpecification, quantity });
      setCart(response.data.cart.items);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeItemFromCart = async (email, productSpecification) => {
    try {
      const response = await axios.post('http://localhost:5050/carts/remove', { email, productSpecification });
      setCart(response.data.cart.items);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addItemToCart, updateCartItem, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
