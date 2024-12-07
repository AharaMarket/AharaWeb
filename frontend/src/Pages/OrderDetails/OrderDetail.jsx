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

    const product = location.state.prod;
    // console.log("product: " + JSON.stringify(product, null, 2));

    const items = product["items"];

    const itemsString = items.replace(/,\s*}/g, '}').replace(/,\s*\]/g, ']');

    const itemsArray = JSON.parse(itemsString);


    itemsArray.forEach((ingredient) => {
        console.log("ingredient: " + ingredient.q);
    })

  // Calculate the total price of the order
  return (
    <div className="order-details">
      <h2>{product["name"]}</h2>

      <div className="order-items">
        <h3>Items:</h3>
        <table>
          <thead> 
            <tr>
              <th>Item</th>
              {/* <th>Price per Item</th> */}
              <th>Quantity</th>
              {/* <th>Total Price</th> */}
            </tr>
          </thead>
          <tbody>
          {itemsArray && Array.isArray(itemsArray) && itemsArray.map((ingredient, index) => (
            <tr key={index}>
                <td>{ingredient.productSpecification}</td>
                <td>{ingredient.quantity}</td>
            </tr>
            ))}
          
          </tbody>
        </table>
      </div>

      {/* <div className="order-total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div> */}
    </div>
  );
};

export default OrderDetail;
