import React, { useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import './Card.css';

const Card = ({ img, title, star, vendor, reviews, prevPrice, newPrice, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const productSpecification = `${title} - ${vendor}`;
    onAddToCart(productSpecification, quantity);
  };

  return (
    <section className="card">
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <img src={img} alt={title} className="card-img" />
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
          />
        </div>
        <button className="bag" onClick={handleAddToCart}>
          Add <BsFillBagFill className="bag-icon" />
        </button>
      </div>
    </section>
  );
};

export default Card;
