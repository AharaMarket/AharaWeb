import React from 'react';
import './ImportOrderTitleBox.css'; // Import the CSS file

function ImportOrderTitleBox() {
  const description = "Please upload your most recent order invoices below to generate an order list to start finding cheaper ingredients!";

  return (
    <div className="importorder-title-box">
      <h2>Upload Order Invoices</h2>
      <p>{description}</p>
    </div>
  );
}

export default ImportOrderTitleBox;
