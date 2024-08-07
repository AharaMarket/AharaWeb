import React, { useState, useEffect, useMemo, useContext } from "react";
import GroceryList from "../../Components/MarketComponents/GroceryList/GroceryList";
import Sortbar from "../../Components/MarketComponents/Sortbar/Sortbar";
import MarketStepper from "../../Components/MarketComponents/MarketStepper/MarketStepper";
import Searchbar from "../../Components/MarketComponents/Searchbar/Searchbar";
import CartButton from "../../Components/MarketComponents/Cart/CartButton/CartButton";
import ContinueButton from "../../Components/MarketComponents/Continue/Continue";
import fetchData from "../../Data/sampledata";
import "./IngredientMarketplace.css";
import IngredientSelectionTitleBox from "../../Components/MarketComponents/MarketTitleBox/IngredientMarketplaceTitleBox/IngredientSelectionTitleBox";
import SolidButton from '../../Components/ui/buttons/solid-button';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/Cart/CartContext';
import { UserContext } from '../../Context/User/UserContext';


function Market() {
  const [products, setProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [vendor, setVendor] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity }); // Default to no price filter

  const { user } = useContext(UserContext);

  const { addItemToCart } = useContext(CartContext);

  // new useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchData();
      console.log('Fetched data:', data);
      setProducts(data);
    };
    fetchProducts();
  }, []);


  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  const handleQueryChange = ({ type, value }) => {
    if (type === "vendor") {
      setVendor(value);
    } else if (type === "price") {
      setPriceRange(value); // Expecting value to be an object {min, max}
    }
  };

  const filteredAndSortedGroceryData = useMemo(() => {
    let filteredData = products.filter((item) => {
      const price = parseFloat(item.Price.replace(/[^0-9.-]+/g, ""));
      return (
        (vendor
          ? item.Vendor.trim().replace(/\s+/g, "").toLowerCase() ===
          vendor.trim().replace(/\s+/g, "").toLowerCase()
          : true) &&
        price >= priceRange.min &&
        price <= priceRange.max
      ); // Adjusted to use min and max
    });

    if (selectedSort) {
      filteredData.sort((a, b) => {
        switch (selectedSort) {
          case "priceLowToHigh":
            return (
              parseFloat(a.Price.replace(/[^0-9.-]+/g, "")) -
              parseFloat(b.Price.replace(/[^0-9.-]+/g, ""))
            );
          case "priceHighToLow":
            return (
              parseFloat(b.Price.replace(/[^0-9.-]+/g, "")) -
              parseFloat(a.Price.replace(/[^0-9.-]+/g, ""))
            );
          case "nameAZ":
            return a.Name.localeCompare(b.Name);
          case "nameZA":
            return b.Name.localeCompare(a.Name);
          default:
            return 0;
        }
      });
    }
    return filteredData;
  }, [vendor, priceRange, selectedSort, products]);

  const handleAddToCart = (productSpecification, quantity) => {
      console.log(user,productSpecification, quantity );
    addItemToCart(user, productSpecification, quantity);
  };

  return (
    <div className="market">
      {/* <Sidebar onQueryChange={handleQueryChange} /> */}
      <div className="market-title-container">
        {/* <h2>Ingredient marketplace</h2> */}
        <IngredientSelectionTitleBox />
      </div>
      <MarketStepper currentStep={1} />
      {/* <div className="market-stepper-container">
        <MarketStepper />
      </div> */}
      <div className="market-search-container">
        <Searchbar></Searchbar>
        <Sortbar onSortChange={handleSortChange} />
        <CartButton />
      </div>
      <div className="listings-container">
        <GroceryList grocerydata={filteredAndSortedGroceryData} onAddToCart={handleAddToCart}/>
      </div>
      <div className="continue-button">
        <Link to="/market/vendorselection">
          <SolidButton>Continue</SolidButton>
        </Link>
      </div>
    </div>
  );
}

export default Market;