import React from 'react'
import Card from '../../Card/Card'
import './GroceryList.css'
import { useNavigate } from 'react-router-dom'


// renders all cards
const GroceryList = ({ grocerydata, onAddToCart }) => {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleCardClick = (item) => {
    // Navigate to the product detail page with item's name or id in the URL
    console.log("item: " + item);
    navigate(`/market/productdetails`, {
      state: { prod: item },  // Pass the entire item (product) object here
    });
  };

    return (
    <div className="grocery-list">
      {grocerydata.map((item, index) => (
        <Card
        key={index}
        img={item.URL} // Image source
        title={item.Name} // Product name
        vendor={item.Vendor}
        reviews="100" // Example number of reviews
        prevPrice="" // If no previous price, leave empty
        newPrice={item.Price}
        onAddToCart={onAddToCart}
        onClick={() => handleCardClick(item)} // Pass the click handler to Card
      />
      ))}
    </div>
    )
}

export default GroceryList

