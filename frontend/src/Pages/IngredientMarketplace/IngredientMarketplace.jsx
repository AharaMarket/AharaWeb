import React, { useState, useEffect, useMemo, useContext } from "react";
import GroceryList from "../../Components/MarketComponents/GroceryList/GroceryList";
import Sortbar from "../../Components/MarketComponents/Sortbar/Sortbar";
import MarketStepper from "../../Components/MarketComponents/MarketStepper/MarketStepper";
import Searchbar from "../../Components/MarketComponents/Searchbar/Searchbar"; // Import the updated Searchbar
import CartButton from "../../Components/MarketComponents/Cart/CartButton/CartButton";
import ContinueButton from "../../Components/MarketComponents/Continue/Continue";
import fetchData from "../../Data/marketplaceproducts";
import "./IngredientMarketplace.css";
import Fuse from 'fuse.js';
import IngredientSelectionTitleBox from "../../Components/MarketComponents/MarketTitleBox/IngredientMarketplaceTitleBox/IngredientSelectionTitleBox";
import SolidButton from '../../Components/ui/buttons/solid-button';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/Cart/CartContext';
import { UserContext } from '../../Context/User/UserContext';
import {IconButton} from '@mui/material'
import FillButton from '../../Components/ui/buttons/fill-button';
import Cart from "../Cart/Cart";



function Market() {
  const [products, setProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [vendor, setVendor] = useState("");
  // const [cart, setCart] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [searchResults, setSearchResults] = useState([]); // Store search results from the search bar

  const { user } = useContext(UserContext);
  const { addItemToCart } = useContext(CartContext);

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchData();
      console.log('Fetched data:', data);
      setProducts(data);
      setSearchResults(data); // Initially, the search results are all products
    };
    // setCart(fetchCart(user))
    fetchProducts();
  }, []);

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  // Handle the search query from the Searchbar component
  const handleSearch = (query) => {
    if (!query) {
      setSearchResults(products); // If no query, show all products
    } else {
      // Filter search results based on fuzzy search results provided by Searchbar
      const fuse = new Fuse(products, {
        keys: ['Name'],
        threshold: 0.3,
      });
      const results = fuse.search(query);
      setSearchResults(results.map(result => result.item)); // Update the state with search results
    }
  };

  // Filter and sort data based on other criteria (vendor, price, sort options)
  const filteredAndSortedGroceryData = useMemo(() => {
    let filteredData = searchResults.filter((item) => {
      const price = parseFloat(item.Price.replace(/[^0-9.-]+/g, ""));
      return (
        (vendor
          ? item.Vendor.trim().replace(/\s+/g, "").toLowerCase() ===
            vendor.trim().replace(/\s+/g, "").toLowerCase()
          : true) &&
        price >= priceRange.min &&
        price <= priceRange.max
      );
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
  }, [vendor, priceRange, selectedSort, searchResults]);

  const handleAddToCart = (productSpecification, quantity, imageurl) => {
    console.log(user, productSpecification, quantity, imageurl);
    addItemToCart(user, productSpecification, quantity, imageurl);
    // setCart(fetchCart(user));
  };

  return (
    <div className="market">
      <div className="market-title-container">
        <IngredientSelectionTitleBox />
      </div>
      <MarketStepper currentStep={1} />
      <div className="market-search-container">
        {/* Pass products and search handler to Searchbar */}
        <Searchbar products={products} handleSearch={handleSearch} />
        <Sortbar onSortChange={handleSortChange} />
        <IconButton
              component={Link}
              to="/market/cart"
              color="inherit"
          >
          <CartButton />
        </IconButton>
      </div>
      <div className="listings-container">
        <GroceryList grocerydata={filteredAndSortedGroceryData} onAddToCart={handleAddToCart} />
      </div>
      <div className="continue-button">
      {/* {cart.length > 0 ? ( */}
          <Link to={'/market/vendorselection'}>
              <SolidButton>Continue</SolidButton>
          </Link>
          {/* // )
          // :
          // <FillButton>Choose Ingredients</FillButton>} */}
      </div>
    </div>
  );
}

export default Market;
