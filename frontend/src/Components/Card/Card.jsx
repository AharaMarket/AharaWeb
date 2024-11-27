import React, { useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import './Card.css';

const Card = ({ img, title, prevPrice, newPrice, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("lbs"); // Default to the first option
  const [showOverlay, setShowOverlay] = useState(false); // State to manage the overlay visibility

  const handleCardClick = () => {
    setShowOverlay(true); // Show overlay when the card is clicked
  };

  const handleOverlayClose = () => {
    setShowOverlay(false); // Close overlay when the close button is clicked
  };


  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleAddToCart = () => {
    const productSpecification = `${title}`;
    onAddToCart(productSpecification, quantity, img, unit);
  };

  return (
    <section className="card" onClick={handleCardClick}>
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
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
          style={{ height: '40px', width: '45px', marginRight: '8px' }} // Adjust the width as needed
        />
        <select id="unit" name="unit" onChange={handleUnitChange} value={unit} style={{ height: '40px', width: '70px', marginRight: '8px' }}>
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
