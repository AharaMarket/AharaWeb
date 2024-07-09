// Orders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css'; // Assuming you have a CSS file for styling

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5050/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Restaurant ID</th>
              <th>ProductName</th>
              <th>Quantity</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.restaurantId}</td>
                <td>{order.productrName}</td>
                <td>{order.quantity}</td>
                <td>{order.totalprice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
