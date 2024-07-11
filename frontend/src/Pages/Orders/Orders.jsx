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
    <h1>All Products</h1>
    {orders.length === 0 ? (
      <p>No orders found.</p>
    ) : (
      <div>
        <div className="table-header">
          <div className="cell">Order ID</div>
          <div className="cell">Restaurant ID</div>
          <div className="cell">Product Name</div>
          <div className="cell">Quantity</div>
          <div className="cell">Total Amount</div>
        </div>
        <div className="table-body">
          {orders.map((order) => (
            <div key={order._id} className="row">
              <div className="cell">{order.orderId}</div>
              <div className="cell">{order.restaurantId}</div>
              <div className="cell">{order.productrName}</div>
              <div className="cell">{order.quantity}</div>
              <div className="cell">{order.totalprice}</div>
            </div>
          ))}
        </div>
      </div>
    )}
    </div>
    // <div className="orders-container">
    //   <h1> All Products</h1>
    //   {orders.length === 0 ? (
    //     <p>No orders found.</p>
    //   ) : (
    //     <table className="orders-table">
    //       <thead> 
    //         <tr> 
    //           <th>Order ID</th>
    //           <th>Restaurant ID</th>
    //           <th>ProductName</th>
    //           <th>Quantity</th>
    //           <th>Total Amount</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {orders.map((order) => (
    //           <tr key={order._id}>
    //             <td>{order.orderId}</td>
    //             <td>{order.restaurantId}</td>
    //             <td>{order.productrName}</td>
    //             <td>{order.quantity}</td>
    //             <td>{order.totalprice}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
  );
};

export default Orders;
