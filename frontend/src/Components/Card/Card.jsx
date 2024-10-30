import React, { useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import './Card.css';

const Card = ({ img, title, prevPrice, newPrice, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const productSpecification = `${title}`;
    onAddToCart(productSpecification, quantity, img);
  };

  return (
    <section className="card">
    <div className="card-details">
      <h3 className="card-title">{title}</h3>
      <img src={img} alt={title} className="card-img" style={{ width: '100%', height: '100px' }}/>
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
          style={{ height: '40px', width: '60px', marginRight: '8px' }} // Adjust the width as needed
        />
        <select id="unit" name="unit" style={{ height: '40px', width: '60px', marginRight: '8px' }}>
          <option value="lbs">lbs</option>
          <option value="kg">kg</option>
          <option value="oz">oz</option>
          <option value="units">units</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div style={{ height: '40px', width: '60px', top: '8px' }}>
        <button className="bag" onClick={handleAddToCart}>
          Add <BsFillBagFill className="bag-icon" />
        </button>
      </div>
    </div>
  </section>
  
  );
};

export default Card;
