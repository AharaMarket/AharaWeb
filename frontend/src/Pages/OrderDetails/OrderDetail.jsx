import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './OrderDetail.module.css'; // Import the CSS module
import { CartContext } from '../../Context/Cart/CartContext';
import { UserContext } from '../../Context/User/UserContext';
import { OrderContext } from '../../Context/Order/OrderContext';
import { IoIosArrowBack } from 'react-icons/io';

const OrderDetail = () => {
    const location = useLocation();
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState("lbs");
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { cart, fetchCart, addItemToCart, updateCartItem } = useContext(CartContext);
    // const totalPrice = order.items.reduce((total, item) => total + item.price * item.quantity, 0);

    const product = location.state.prod;;

    const items = product["items"];

    const vendorName = product["vendorName"];

    const itemsString = items.replace(/,\s*}/g, '}').replace(/,\s*\]/g, ']');

    const itemsArray = JSON.parse(itemsString);

    let totalPrice = 0.0;

    itemsArray.forEach((ingredient) => {
        totalPrice += ingredient.price;
    })

    const handleBackClick = () => {
      navigate(-1);  // Navigate back to the previous page
    };

  // Calculate the total price of the order
  return (
    <div className={styles.mainWrapper}>
      <button className={styles.backBtn} onClick={handleBackClick}>
          <IoIosArrowBack size={24} />
        </button>
      <h1 className={styles.detailsh1}> {product["name"]}</h1>
      <h2 className={styles.detailsh2}> Purchased from {product["vendorName"]} </h2>
      <div className="order-items">
        <h3 className={styles.detailsh3}>Items:</h3>
        <table>
          <thead> 
            <tr>
              <th>Item</th>
              <th>Price per Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
          {itemsArray && Array.isArray(itemsArray) && itemsArray.map((ingredient, index) => (
            <tr key={index}>
                <td>{ingredient.productSpecification}</td>
                <td>${ingredient.price.toFixed(2)}</td>
                <td>{ingredient.quantity}</td>
            </tr>
            ))}
          
          </tbody>
        </table>
      </div>

      <div className="order-total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default OrderDetail;
