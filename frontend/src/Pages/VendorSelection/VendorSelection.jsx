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
import LocationSlider from '../../Components/Slider/LocationSlider';

const VendorSelection = () => {
  const { user } = useContext(UserContext);
  const { cart, fetchCart } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [vendorData, setVendorData] = useState(null);
  const [filteredVendors, setFilteredVendors] = useState(null); // For filtered vendor data
  const [maxTotal, setMaxTotal] = useState(100); // Example filter by max total price
  const [vendorList, setVendorList] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('default');  

  useEffect(() => {
    if (user) {
      fetchCart(user);
    }
  }, [user, fetchCart]);

  useEffect(() => {
    if (vendorList == null) {
      console.log("vendorList: " + vendorList)
      fetchVendorData(); // Fetch vendor data when cart is loaded
    }
  }, [cart]);

  const formatCartData = () => {
    return cart.map(item => {
      return [item.quantity.toString(), item.productSpecification];
    });
  }

  const fetchVendorData = async () => {
    const cartData = formatCartData();
    console.log("cartData: ", typeof cartData)
    console.log("vendorList: " + vendorList)

    const quantityMap = {};

    if (Array.isArray(cartData)) {
      cartData.forEach(([quantity, ingredient]) => {
        // Convert quantity to a number (if necessary)
        const qty = parseInt(quantity, 10);
        if (ingredient) {
          quantityMap[ingredient] = (quantityMap[ingredient] || 0) + qty; // Increment count for each occurrence
        }
      });
    } else {
      console.error('cartData is not an array:', cartData);
    }
    if (vendorList == null ) {
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
          console.log(vendorData[vendorName]["uom"]);
          // check this number and unit string within this. Divide the number by the number requested and return the remainder.

          const unit = vendorItems["unit"].replace(/[^a-zA-Z]/g, '');
          const num = vendorItems["unit"].replace(/\D/g, '');

          console.log("tomato: " + vendorItems["Whole Peeled Tomato"]);
          console.log("tofu: " + vendorItems["Firm Tofu"]);

          // Math.ceil(quantityMap[ingredient]/num) calculates how many orders of a package need to be ordered to fulfill that order
          // (vendorItems[ingredient]) / (quantityMap[ingredient] || 1) calculates how much one order costs
          // Map ingredients (excluding 'total') to priceDetails array

          //why is the units all the smae within each order. Need to check vendorItems["unit"]
          const priceDetails = Object.keys(vendorItems)
            .filter(key => key !== 'total' && key !== 'uom' && key !== 'price' && key !== 'unit') // Exclude 'total' from items
            .map((ingredient, i) => ({
              desired: quantityMap[ingredient] || 1,
              item: ingredient, // Ingredient name
              quantity: Math.ceil(quantityMap[ingredient]/num), // Placeholder for quantity (since it's not in the original data)
              uom: vendorItems["unit"], // Placeholder for unit of measure
              unitPrice: (vendorItems[ingredient]) / (quantityMap[ingredient] || 1), // Price of the item
              totalPrice: (vendorItems[ingredient]) / (quantityMap[ingredient] || 1) * Math.ceil(quantityMap[ingredient]/num), // Assuming no quantity, unitPrice = totalPrice
            }));
            
            const total = priceDetails.reduce((acc, currentItem) => {
              return acc + parseInt(currentItem.totalPrice);
            }, 0);
            console.log("total: " + total);

            // need to find the total amount of food
            const totalUnits = priceDetails.reduce((acc, currentItem) => {
              return acc + parseInt(currentItem.quantity) * num;
            }, 0);
            console.log("total: " + totalUnits);
          
            //price per unit
            const ppu = total/totalUnits;
            console.log("ppu: " + ppu);
          return {
            id: (index + 1).toString(), // Unique ID as string
            img: 'Image', // Placeholder image
            name: vendorName, // Vendor name
            price: total, // Total price from vendor data
            deliveryTime: 'Same Day Delivery', // Placeholder delivery time
            deliveryDate: Date().toLocaleDateString, // Placeholder delivery date
            phone: '(123) 456-7890', // Placeholder phone number
            location: 'Pleasanton, CA', // Placeholder location
            recommended: true, // Placeholder flag
            fastest: false, // Placeholder flag
            priceDetails: priceDetails, // Price details array
            ppu: ppu
          };
          // logging.info(priceDetails)
        });
        setVendorList(updatedVendorList);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  const handleRadiusChange = (newRadius) => {
    console.log('New radius: ', newRadius);
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
          {/* <Sortbar onSortChange={handleSortChange}/> */}
          </div>
          {/* <div className = "recommendations-list-container"> */}
          <div className="vendor-container-vertical">
          <Vendors initialVendors={vendorList} />
          </div>
          {/* <RecommendationList></RecommendationList> */}
          </div>
        ) : (
          <p>Loading vendor data...</p>
        )}
      </div>
    </div>
  );
};

export default VendorSelection;
