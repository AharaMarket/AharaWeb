import React from 'react';
import './ImportOrderTitleBox.css'; // Import the CSS file

function ImportOrderTitleBox() {
  const description = "If applicable, please import order below to generate for the ingredient marketplace";

  return (
    <div className="importorder-title-box">
      <h2>Import Order</h2>
      <p>{description}</p>
    </div>
  );
}

export default ImportOrderTitleBox;
