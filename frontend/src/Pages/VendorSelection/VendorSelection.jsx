import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/Cart/CartContext';
import { UserContext } from '../../Context/User/UserContext';
import './VendorSelection.css'; // Custom styles for improved design

const VendorSelection = () => {
  const { user } = useContext(UserContext);
  const { cart, fetchCart } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [vendorData, setVendorData] = useState(null);
  const [filteredVendors, setFilteredVendors] = useState(null); // For filtered vendor data
  const [maxTotal, setMaxTotal] = useState(100); // Example filter by max total price

  useEffect(() => {
    if (user) {
      fetchCart(user);
    }
  }, [user, fetchCart]);

  useEffect(() => {
    if (cart.length > 0) {
      fetchVendorData(); // Fetch vendor data when cart is loaded
    }
  }, [cart]);

  const formatCartData = () => {
    return cart.map(item => {
      return [item.quantity.toString(), item.productSpecification];
    });
  };

  const fetchVendorData = async () => {
    const cartData = formatCartData();
    try {
      const response = await fetch('http://localhost:5050/vendorselection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cartData }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vendor data');
      }

      const data = await response.json();
      setVendorData(data);
      setFilteredVendors(data); // Set filtered data initially to all vendors
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle filtering by maximum total price
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setMaxTotal(value);
    const filtered = Object.keys(vendorData).filter(vendor => vendorData[vendor].total <= value);
    const filteredData = {};
    filtered.forEach(vendor => {
      filteredData[vendor] = vendorData[vendor];
    });
    setFilteredVendors(filteredData);
  };

  return (
    <div className="vendor-selection-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* <div className="filter-section"> */}
        {/* <h3>Filters</h3>
        <div className="filter-item">
          <label htmlFor="max-price">Max Total Price: ${maxTotal}</label>
          <input
            type="range"
            id="max-price"
            min="0"
            max="150"
            value={maxTotal}
            onChange={handleFilterChange}
          />
        </div>
      </div> */}

      <div className="vendor-list-section">
        {filteredVendors ? (
          <div className="vendor-container-vertical">
            {Object.keys(filteredVendors).map((vendorName, index) => (
              <div key={index} className="vendor-card-vertical">
                <h2>{vendorName}</h2>
                <p><strong>Total: ${vendorData[vendorName].total}</strong></p>
                <div className="dropdown-container">
  <label htmlFor={`cart-${vendorName}`}>Cart</label>
  <select id={`cart-${vendorName}`} defaultValue="">
    <option value="" disabled>
      Items:
    </option>
    {Object.keys(vendorData[vendorName])
      .filter(key => key !== 'total') // Exclude "total" from the dropdown
      .map((ingredient, i) => (
        <option key={i} value={ingredient}>
          {ingredient}: ${vendorData[vendorName][ingredient]}
        </option>
      ))}
  </select>
</div>

              </div>
            ))}
          </div>
        ) : (
          <p>Loading vendor data...</p>
        )}
      </div>
    </div>
  );
};

export default VendorSelection;
