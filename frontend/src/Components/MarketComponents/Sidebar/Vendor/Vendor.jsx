import React from 'react';
import "./Vendor.css";

function Vendor({ handleChange }) {
  return (
    <div>
        <h2 className="sidebar-title">Vendor</h2>
        <div className="vendor-options">
            <label className="sidebar-label-container">
                <input
                    type="radio"
                    name="vendor"
                    value=""
                    onChange={handleChange}
                    defaultChecked
                />
                <span className="checkmark"></span>
                All
            </label>
            <label className="sidebar-label-container">
                <input
                    type="radio"
                    name="vendor"
                    value="restaurantdepot"
                    onChange={handleChange}
                />
                <span className="checkmark"></span>
                Restaurant Depot
            </label>
            <label className="sidebar-label-container">
                <input
                    type="radio"
                    name="vendor"
                    value="chefstore"
                    onChange={handleChange}
                />
                <span className="checkmark"></span>
                Chef Store
            </label>
            <label className="sidebar-label-container">
                <input
                    type="radio"
                    name="vendor"
                    value="cheetah"
                    onChange={handleChange}
                />
                <span className="checkmark"></span>
                Cheetah
            </label>
            <label className="sidebar-label-container">
                <input
                    type="radio"
                    name="vendor"
                    value="s&j"
                    onChange={handleChange}
                />
                <span className="checkmark"></span>
                S&J
            </label>
        </div>
    </div>
  );
}

export default Vendor;
