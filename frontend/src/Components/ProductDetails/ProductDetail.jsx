import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css'; 
import OrderConfirmation from '../../Pages/OrderConfirmation/OrderConfirmation';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [weight, setWeight] = useState('lb');
    const navigate = useNavigate();

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5050/ingredients/${id}`);
            setProduct(response.data);
            if (response.data.images && response.data.images.length > 0) {
                setMainImage(response.data.images[0]);
            } else {
                setMainImage('https://t4.ftcdn.net/jpg/02/32/98/31/360_F_232983161_9lmUyHKnWbLW0vQPvWCrp5R5DSpexhbx.jpg');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToBag = () => {
        alert(`Added  ${product.Name} of ${quantity} ${weight} added to the bag.`);
      
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
                        <img src={mainImage} alt={product.Name} className="slide" />
                    </div>
                    <div className="option flex">
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Product view ${index + 1}`}
                                    onClick={() => setMainImage(image)}
                                />
                            ))
                        ) : (
                            <img src="https://t4.ftcdn.net/jpg/02/32/98/31/360_F_232983161_9lmUyHKnWbLW0vQPvWCrp5R5DSpexhbx.jpg" alt="Default product view"/>
                        )}
                    </div>
                </div>
                <div className="right">
                    <h3>{product.Name}</h3>
                    <h4>{product.Price}</h4>
                  
                    <div className="add flex1">
    <input
        // min="1" 
        className="quantity-input"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
    />
    <select
        className="quantity-select"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
    >
        <option value="lb" selected >lb</option>
        <option value="pc">per pc</option>
    </select>
</div>


                    <button onClick={handleAddToBag}>Add to Bag</button>
                </div>
            </div>
            <footer className="footer">
                &copy; 2024 Your Company. All rights reserved.
            </footer>
        </div>
    );
};

export default ProductDetail;
