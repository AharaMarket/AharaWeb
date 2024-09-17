import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/User/UserContext';
import { CartContext } from '../../Context/Cart/CartContext';
import './Cart.css';

const Cart = () => {
  const { user } = useContext(UserContext);
  const { cart, fetchCart, updateCartItem, removeItemFromCart } = useContext(CartContext);

  useEffect(() => {
    if (user) {
      fetchCart(user);
      console.log(cart)
    }
  }, [user, fetchCart]);

  const handleQuantityChange = (productSpecification, quantity) => {
    if (user) {
      updateCartItem(user, productSpecification, quantity);
    }
  };

  const handleRemoveItem = (productSpecification) => {
    if (user) {
      removeItemFromCart(user, productSpecification);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">My Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={`${item.productSpecification}`} className="cart-item">
              <div className="item-details">
                <img src={item.imageurl} alt={item.productSpecification.name} className="item-image" />
                <div>
                  <span className="item-name">{item.productSpecification}</span>
                </div>
              </div>
              <div className="item-actions">
                <div className="quantity-control">
                  <button className="quantity-button" onClick={() => handleQuantityChange(item.productSpecification, item.quantity - 1)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => handleQuantityChange(item.productSpecification, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-button" onClick={() => handleRemoveItem(item.productSpecification)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
