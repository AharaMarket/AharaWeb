import React, { useState } from 'react';
import './Price.css';

const Price = ({ handleChange }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Update internal state and do not emit changes until user submits their custom range
    const handleMinChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxChange = (e) => {
        setMaxPrice(e.target.value);
    };

    // Emit changes when the user decides to apply the custom range
    const applyCustomRange = () => {
        handleChange({
            type: 'price',
            value: { 
                min: minPrice ? parseFloat(minPrice) : 0,  // Use 0 if minPrice is empty
                max: maxPrice ? parseFloat(maxPrice) : Infinity  // Use Infinity if maxPrice is empty
            }
        });
    };

    return (
        <div className="ml">
            <h2 className="sidebar-title">Price</h2>
            {/* Predefined price ranges */}
            <div className="predefined-ranges">
                <label className="sidebar-label-container">
                    <input onChange={() => handleChange({type: 'price', value: {min: 0, max: Infinity}})} type="radio" name="price" defaultChecked />
                    <span className="checkmark"></span>All
                </label>
                <label className="sidebar-label-container">
                    <input onChange={() => handleChange({type: 'price', value: {min: 0, max: 50}})} type="radio" name="price" />
                    <span className="checkmark"></span>$0 - $50
                </label>
                <label className="sidebar-label-container">
                    <input onChange={() => handleChange({type: 'price', value: {min: 50, max: 100}})} type="radio" name="price" />
                    <span className="checkmark"></span>$50 - $100
                </label>
                <label className="sidebar-label-container">
                    <input onChange={() => handleChange({type: 'price', value: {min: 100, max: 150}})} type="radio" name="price" />
                    <span className="checkmark"></span>$100 - $150
                </label>
                <label className="sidebar-label-container">
                    <input onChange={() => handleChange({type: 'price', value: {min: 150, max: Infinity}})} type="radio" name="price" />
                    <span className="checkmark"></span>Over $150
                </label>
            </div>
            {/* Custom price range inputs */}
            <div className="custom-range-inputs">
                <input 
                    type="number" 
                    placeholder="Min ($)" 
                    value={minPrice} 
                    onChange={handleMinChange}
                    className="price-input"
                />
                <input 
                    type="number" 
                    placeholder="Max ($)" 
                    value={maxPrice} 
                    onChange={handleMaxChange}
                    className="price-input"
                />
                <button onClick={applyCustomRange} className="apply-range-button">Apply</button>
            </div>
        </div>
    );
};

export default Price;
