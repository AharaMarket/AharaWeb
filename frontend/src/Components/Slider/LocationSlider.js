import React, { useState } from 'react';
import Slider from 'react-slider';
import './LocationSlider.css'; // Ensure this is correctly linked

const LocationSlider = ({ minLocation, maxLocation, onRadiusChange }) => {
    const [locationRange, setLocationRange] = useState(minLocation);

    const handleChange = (newValue) => {
        setLocationRange(newValue);
        onRadiusChange(newValue); // Call the callback with updated value
    };

    return (
        <div className="location-slider-container">
            <h3 className="slider-title">Location Radius</h3>
            
            <div className="slider-labels">
                <span className="slider-min">${minLocation}</span>
                <span className="slider-max">${maxLocation}</span>
            </div>

            <Slider
                className="location-slider"
                value={locationRange}
                min={minLocation}
                max={maxLocation}
                onChange={handleChange}
                step={10} // Change the step size if necessary
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
            />

            {/* Display current selection under the slider */}
            <div className="slider-current-selection">
                Selected Radius: ${locationRange}
            </div>
        </div>
    );
};

export default LocationSlider;
