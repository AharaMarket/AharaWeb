import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css'; 
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
    const location = useLocation();  // Get the current location object
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState("lbs");
    const [weight, setWeight] = useState('lb');
    const navigate = useNavigate();
    // const { cart, fetchCart, addItemToCart, updateCartItem } = useContext(CartContext);

    const product = location["state"]["prod"];

    const handleAddToBag = () => {
        alert(`Added  ${product.Name} of ${quantity} ${weight} added to the bag.`);

        const productSpecification = `${title}`;
        onAddToCart(productSpecification, quantity, img, unit);
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
      };

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-wrapper">
            <div className="container flex">
                <div className="left">
                    <div className="main_image">
                    <img src={product.URL || '../Assets/noimage.jpg'} alt={product.Name} className="card-img" style={{ width: '100%', height: '400px' }}/>                    </div>
                </div>
                <div className="right">
                    <h3>{product.Name}</h3>
                    <h4>{product.Price}</h4>
                  
                    <div className="add flex1">
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
                    <button onClick={handleAddToBag}>Add to Bag</button>
                </div>
            </div>
            <footer className="footer">
                &copy; 2024 Ahara. All rights reserved.
            </footer>
        </div>
    );
};

export default ProductDetail;