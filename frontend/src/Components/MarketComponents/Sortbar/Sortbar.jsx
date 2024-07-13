import React, { useCallback } from 'react';
import './Sortbar.css';

function Sortbar({ onSortChange }) {
    const updateSort = useCallback((newSort) => {
        onSortChange(newSort); // This could be triggered by any UI element, like a dropdown
    }, [onSortChange]);

    return (
        <div className="sort-by-bar">
            <label htmlFor="sort-by">Sort By:</label>
            <select id="sort-by" onChange={(e) => updateSort(e.target.value)}>
                <option value="default">Default</option>
                <option value="nameAZ">A-Z</option>
                <option value="nameZA">Z-A</option>
                <option value="priceLowToHigh">Price Low to High</option>
                <option value="priceHighToLow">Price High to Low</option>
            </select>
        </div>
    );
};

export default Sortbar;
