import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ProductDetail.module.css'; // Import the CSS module
import { CartContext } from '../../Context/Cart/CartContext';
import { UserContext } from '../../Context/User/UserContext';
import { IoIosArrowBack } from 'react-icons/io';

const ProductDetail = () => {
    const location = useLocation();
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState("lbs");
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { cart, fetchCart, addItemToCart, updateCartItem } = useContext(CartContext);


    const product = location.state.prod;

    const handleAddToBag = () => {
        const productSpecification = `${product.Name}`
        const exists = cart.find(item => item.productSpecification === productSpecification)
        if (exists != undefined) {
          updateCartItem(user, productSpecification, exists.quantity + 1, unit);
        }
        else{
          addItemToCart(user, productSpecification, quantity, product.URL, unit);
        }
        alert(`Added ${product.Name} of ${quantity} ${unit} added to the bag.`);
        // setCart(fetchCart(user));
      };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    const handleBackClick = () => {
        navigate(-1);  // Navigate back to the previous page
    };

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.mainWrapper}>
            <button className={styles.backBtn} onClick={handleBackClick}>
                <IoIosArrowBack size={24} />
            </button>

            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.mainImage}>
                        <img 
                            src={product.URL || '../Assets/noimage.jpg'} 
                            alt={product.Name} 
                            className={styles.cardImg}
                        />
                    </div>
                </div>
                <div className={styles.right}>
                    <h3>{product.Name}</h3>
                    <div className={styles.price}>
                        <h4>{product.Price}</h4>
                    </div>

                    <div className={styles.add}>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="qty"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            min="1"
                            className={styles.quantityInput}
                        />
                        <select
                            id="unit"
                            name="unit"
                            onChange={handleUnitChange}
                            value={unit}
                            className={styles.quantitySelect}
                        >
                            <option value="lbs">lbs</option>
                            <option value="kg">kg</option>
                            <option value="oz">oz</option>
                            <option value="units">units</option>
                        </select>
                    </div>
                    <button onClick={handleAddToBag} className={styles.addToBagBtn}>
                        Add to Bag
                    </button>
                </div>
            </div>
            <footer className={styles.footer}>
                &copy; 2024 Ahara. All rights reserved.
            </footer>
        </div>
    );
};

export default ProductDetail;
