import React from 'react';
import './VendorSelectionTitleBox.css'; // Import the CSS file

function VendorSelectionTitleBox() {
  const description = "Please select from a listed vendor below";

  return (
    <div className="vendor-title-box">
      <h2>Vendor Selection</h2>
      <p>{description}</p>
    </div>
  );
}

export default VendorSelectionTitleBox;
