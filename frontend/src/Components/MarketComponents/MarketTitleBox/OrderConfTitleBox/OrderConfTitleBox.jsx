import React from 'react';
import './OrderConfTitleBox.css'; // Import the CSS file

function OrderConfTitleBox() {
  const description = "We are working with the distributor to get your order to you as soon as possible. Go to the orders page or dashboard to see the progress.";

  return (
    <div className="order-conf-title-box">
      <h2>Order Confirmation</h2>
      <p>{description}</p>
    </div>
  );
}

export default OrderConfTitleBox;
