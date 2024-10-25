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
          
          // Map ingredients (excluding 'total') to priceDetails array
          const priceDetails = Object.keys(vendorItems)
            .filter(key => key !== 'total' && key !== 'uom' & key !== 'price') // Exclude 'total' from items
            .map((ingredient, i) => ({
              item: ingredient, // Ingredient name
              quantity: quantityMap[ingredient] || 1, // Placeholder for quantity (since it's not in the original data)
              uom: vendorItems["unit"], // Placeholder for unit of measure
              unitPrice: (vendorItems[ingredient]) / (quantityMap[ingredient] || 1), // Price of the item
              totalPrice: vendorItems[ingredient], // Assuming no quantity, unitPrice = totalPrice
            }));
          console.log("priceDetails: " + priceDetails);
              
          return {
            id: (index + 1).toString(), // Unique ID as string
            img: 'Image', // Placeholder image
            name: vendorName, // Vendor name
            price: vendorItems.total, // Total price from vendor data
            deliveryTime: 'Same Day Delivery', // Placeholder delivery time
            deliveryDate: Date().toLocaleDateString, // Placeholder delivery date
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

  // const handleSortChange = (sortCriteria) => {
  //   let sortedVendors = [...vendorList];
  //   console.log("criteria: " + sortCriteria);

  //   switch (sortCriteria) {
  //     case 'nameAZ':
  //       sortedVendors.sort((a,b) => a.name.localeCompare(b.name));
  //       break;
  //     case 'nameZA':
  //       sortedVendors.sort((a,b) => b.name.localeCompare(a.name));
  //       break;
  //     case 'priceLowToHigh':
  //       sortedVendors.sort((a,b) => a.price - b.price);
  //       break;
  //     case 'priceHighToLow':
  //       sortedVendors.sort((a,b) => b.price - a.price);
  //       break;
  //     default:
  //       break;
  //   }
  //   setVendorList(sortedVendors);
  // }

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
<<<<<<< HEAD
          <div className="recommendations-sort-container">
            {/* <div className="sortbar-container"> */}
                <Sortbar onSortChange={handleSortChange} />
            {/* </div> */}
            {/* <div className="location-slider-container"> */}
                <LocationSlider minLocation={0} maxLocation={1000} onRadiusChange={handleRadiusChange} />
            {/* </div> */}
        </div>
=======
          <div className = "recommendations-sort-container">
          {/* <Sortbar onSortChange={handleSortChange}/> */}
          </div>
>>>>>>> db7f5fd57db5678fb5f1c766389a62f4c22afb68
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
