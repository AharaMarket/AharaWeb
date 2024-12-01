import React, { useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import './Card.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ img, title, prevPrice, newPrice, onAddToCart, onClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("lbs"); // Default to the first option
  const [showOverlay, setShowOverlay] = useState(false); // State to manage the overlay visibility

  const handleInputChange = (e) => {
    // e.stopPropagation(); // Stop the click event from propagating to parent
    setQuantity(parseInt(e.target.value));
  };

  const handleUnitChange = (e) => {
    e.stopPropagation(); // Stop the click event from propagating to parent
    setUnit(e.target.value);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Stop the click event from propagating to parent
    const productSpecification = `${title}`;
    alert(`Added  ${title} of ${quantity} ${unit} added to the bag.`);
    onAddToCart(productSpecification, quantity, img, unit);
  };

  return (
    <section className="card" onClick={onClick}>
    <div className="card-details">
      <h3 className="card-title">{title}</h3>
      <img src={img || '../Assets/noimage.jpg'} alt={title} className="card-img" style={{ width: '100%', height: '200px' }}/>
      <section className="card-price">
        <div className="price">
          <del>{prevPrice}</del> ${newPrice}
        </div>
      </section>
    </div>
    <div className="card-actions">
      <div className="quantity-picker">
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="qty"
          value={quantity}
          onClick={(e) => e.stopPropagation()}
          onChange={handleInputChange}
          min="1"
          style={{ height: '40px', width: '45px', marginRight: '8px' }} // Adjust the width as needed
        />
        <select id="unit" name="unit" onClick={(e) => e.stopPropagation()} onChange={handleUnitChange} value={unit} style={{ height: '40px', width: '70px', marginRight: '8px' }}>
          <option value="lbs">lbs</option>
          <option value="kg">kg</option>
          <option value="oz">oz</option>
          <option value="units">units</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div style={{ height: '40px', width: '60px'}}>
        <button className="bag" onClick={handleAddToCart}>
          Add <BsFillBagFill className="bag-icon" />
        </button>
      </div>
    </div>
  </section>
  
  );
};

export default Card;
