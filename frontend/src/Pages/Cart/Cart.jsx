import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/User/UserContext';
import { CartContext } from '../../Context/Cart/CartContext';
import './Cart.css';
import { NavLink } from 'react-router-dom';
import FillButton from '../../Components/ui/buttons/fill-button';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const { user } = useContext(UserContext);
  const { cart, fetchCart, updateCartItem, removeItemFromCart, resetCart } = useContext(CartContext);

  useEffect(() => {
    if (user && cart.length === 0) {  // Fetch cart only if user exists and cart is empty
      fetchCart(user);
    }
  }, [user, cart.length, fetchCart]); 
  const handleQuantityChange = (productSpecification, quantity, unit) => {
    if (user) {
      console.log(unit);
      updateCartItem(user, productSpecification, quantity, unit);
    }
  };

  const handleRemoveItem = (productSpecification) => {
    if (user) {
      console.log(user,productSpecification);
      removeItemFromCart(user, productSpecification);
    }
  };

  const handleRemoveAll = () => {
    if (user) {
      resetCart(user);
    }
  };

  const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // This will go back to the previous page
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
                  <button className="quantity-button" onClick={() => item.quantity - 1 <= 0 ? handleRemoveItem(item.productSpecification):handleQuantityChange(item.productSpecification, item.quantity - 1, item.unit)}>-</button>
                  <span className="quantity">{item.quantity} {item.unit}</span>
                  <button className="quantity-button" onClick={() => handleQuantityChange(item.productSpecification, item.quantity + 1, item.unit)}>+</button>
                </div>
                <button className="remove-button" onClick={() => handleRemoveItem(item.productSpecification, item.unit)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <div className="continue-button"> */}
      {cart.length !== 0 ? (
        <>
          <div className="flex justify-between mt-6">
            <NavLink onClick={handleGoBack}>
              <FillButton>Previous</FillButton>
            </NavLink>

            <NavLink onClick={handleRemoveAll}>
              <FillButton className="remove-all-button">Remove All</FillButton>
            </NavLink>
          </div>
        </>
           ):
           <NavLink to={'/market/ingredientmarketplace'}>
            <FillButton>Back</FillButton>
          </NavLink>
          } 
      {/* </div> */}
    </div>
  );
};

export default Cart;
