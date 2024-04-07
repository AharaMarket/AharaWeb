import React from 'react';
import './RecommendationCard.css';

const Card = ({ vendor, name, totalPrice, unit, deliveryTime }) => {
  return (
    <div className="recommendationCard">
      <div className="recommendationHeader">
        <h3>{vendor}</h3>
      </div>
      <div className="recommendationBody">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        <p><strong>Delivery Time:</strong> {deliveryTime}</p>
      </div>
    </div>
  );
};

export default Card;
