import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/Cart/CartContext';
import { UserContext } from '../../Context/User/UserContext';
import './VendorSelection.css'; // Custom styles for improved design
import Sortbar from '../../Components/MarketComponents/Sortbar/Sortbar'
import Sidebar from '../../Components/MarketComponents/Sidebar/Sidebar'
import RecommendationList from '../../Components/Recommendations/RecommendationList/RecommendationList'
import GroceryList from '../../Components/MarketComponents/GroceryList/GroceryList'
import MarketStepper from '../../Components/MarketComponents/MarketStepper/MarketStepper';
import VendorSelectionTitleBox from '../../Components/MarketComponents/MarketTitleBox/VendorSelectionTitleBox/VendorSelectionTitleBox';
import Vendors from '../../Components/ingredient-marketplace-components/vendors';



const VendorSelection = () => {
  const { user } = useContext(UserContext);
  const { cart, fetchCart } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [vendorData, setVendorData] = useState(null);
  const [filteredVendors, setFilteredVendors] = useState(null); // For filtered vendor data
  const [maxTotal, setMaxTotal] = useState(100); // Example filter by max total price
  const [vendorList, setVendorList] = useState(null);
  useEffect(() => {
    if (user) {
      fetchCart(user);
    }
  }, [user, fetchCart]);

  useEffect(() => {
    if (cart.length > 0) {
      fetchVendorData(); // Fetch vendor data when cart is loaded
    }
  }, [cart]);

  const formatCartData = () => {
    return cart.map(item => {
      return [item.quantity.toString(), item.productSpecification];
    });
  };

  const fetchVendorData = async () => {
    const cartData = formatCartData();
    try {
      const response = await fetch('http://localhost:5050/vendorselection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cartData }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vendor data');
      }

      const data = await response.json();
      setVendorData(data);
      setFilteredVendors(data); // Set filtered data initially to all vendors
      const updatedVendorList = Object.keys(filteredVendors).map((vendorName, index) => {
        // Extract vendor data for each vendor
        const vendorItems = vendorData[vendorName];
        console.log(vendorData[vendorName])
        
        // Map ingredients (excluding 'total') to priceDetails array
        const priceDetails = Object.keys(vendorItems)
          .filter(key => key !== 'total') // Exclude 'total' from items
          .map((ingredient, i) => ({
            item: ingredient, // Ingredient name
            quantity: 1, // Placeholder for quantity (since it's not in the original data)
            uom: 'UOM', // Placeholder for unit of measure
            unitPrice: vendorItems[ingredient], // Price of the item
            totalPrice: vendorItems[ingredient], // Assuming no quantity, unitPrice = totalPrice
          }));
            
        return {
          id: (index + 1).toString(), // Unique ID as string
          img: 'Image', // Placeholder image
          name: vendorName, // Vendor name
          price: vendorItems.total, // Total price from vendor data
          deliveryTime: 'Same Day Delivery', // Placeholder delivery time
          deliveryDate: 'April 31, 2024', // Placeholder delivery date
          phone: '(123) 456-7890', // Placeholder phone number
          location: 'Pleasanton, CA', // Placeholder location
          recommended: true, // Placeholder flag
          fastest: false, // Placeholder flag
          priceDetails: priceDetails // Price details array
        };
        // logging.info(priceDetails)
      });
      setVendorList(updatedVendorList);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle filtering by maximum total price
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setMaxTotal(value);
    const filtered = Object.keys(vendorData).filter(vendor => vendorData[vendor].total <= value);
    const filteredData = {};
    filtered.forEach(vendor => {
      filteredData[vendor] = vendorData[vendor];
    });
    setFilteredVendors(filteredData);
  };

  return (
    <div className="vendor-selection-container">
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

      <div className="vendor-list-section">
        {vendorList ? (
          <div class = 'market'>
          {/* <Sidebar></Sidebar> */}
          {/* positioning of the container */}
          <div className = "market-title-container">
              <VendorSelectionTitleBox></VendorSelectionTitleBox>
          </div>
          <MarketStepper currentStep={2}></MarketStepper>
          <div className = "recommendations-sort-container">
          <Sortbar/>
          </div>
          {/* <div className = "recommendations-list-container"> */}
          <div className="vendor-container-vertical">
          <Vendors initialVendors={vendorList} />
          </div>
          {/* <RecommendationList></RecommendationList> */}
          </div>
      // </div>
//           <div className="vendor-container-vertical">
//             {Object.keys(filteredVendors).map((vendorName, index) => (
//               <div key={index} className="vendor-card-vertical">
//                 <h2>{vendorName}</h2>
//                 <p><strong>Total: ${vendorData[vendorName].total}</strong></p>
//                 <div className="dropdown-container">
//   <label htmlFor={`cart-${vendorName}`}>Cart</label>
//   <select id={`cart-${vendorName}`} defaultValue="">
//     <option value="" disabled>
//       Items:
//     </option>
//     {Object.keys(vendorData[vendorName])
//       .filter(key => key !== 'total') // Exclude "total" from the dropdown
//       .map((ingredient, i) => (
//         <option key={i} value={ingredient}>
//           {ingredient}: ${vendorData[vendorName][ingredient]}
//         </option>
//       ))}
//   </select>
// </div>

//               </div>
//             ))}
//           </div>
        ) : (
          <p>Loading vendor data...</p>
        )}
      </div>
    </div>
  );
};

export default VendorSelection;
