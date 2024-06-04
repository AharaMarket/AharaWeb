// AdminHomepage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import your CSS file
import Box from '../../Components/Dashboard/Box'

const Dashboard = () => {
  const boxes = [
    { label: 'About', path: '/about' },
    { label: 'Login', path: '/login' },
    { label: 'Market', path: '/market' },
    { label: 'Orders', path: '/market/orders' },
    { label: 'Order Confirmation', path: '/market/orderconfirmation' },
    { label: 'Ranking', path: '/market/ranking' },
    { label: 'Dish Analysis', path: '/page7' },
    { label: 'Ingredients', path: '/page8' },
  ];

  return (
    <div className="container">
      <div className="dashboard">
        {boxes.map((box, index) => (
          <Box key={index} {...box} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
