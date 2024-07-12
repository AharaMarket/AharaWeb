import React from 'react'
import Card from '../../Card/Card'
import './GroceryList.css'

// renders all cards
function GroceryList({ grocerydata }) {

  return (
    <div class="container">
      <div className="grocery-list">
        {grocerydata.map((item, index) => (
          <Card
            key={index} // Assuming there's a unique key for each item, otherwise use a unique identifier from the data
            img={item.URL} // Assuming the URL is the image source
            title={item.Name}
            vendor={item.Vendor}
            star="⭐"
            reviews="100" // Example number of reviews
            prevPrice="" // If no previous price, leave empty
            newPrice={item.Price}
          />
        ))}
      </div>
    </div>
  )
}

export default GroceryList
