import React, { useState, useEffect, useMemo, useContext } from "react";
import Fuse from "fuse.js";
import GroceryList from "../../Components/MarketComponents/GroceryList/GroceryList";
import Sortbar from "../../Components/MarketComponents/Sortbar/Sortbar";
import MarketStepper from "../../Components/MarketComponents/MarketStepper/MarketStepper";
import Searchbar from "../../Components/MarketComponents/Searchbar/Searchbar";
import CartButton from "../../Components/MarketComponents/Cart/CartButton/CartButton";
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
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { user } = useContext(UserContext);
  const { addItemToCart, cartItems = [] } = useContext(CartContext); // Default to empty array

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchData();
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
      setPriceRange(value);
    }
  };

  const handleSearchChange = (query) => {
    setSearchTerm(query);

    const fuse = new Fuse(products, {
      keys: ["Name"],
      threshold: 0.9, 
    });

    if (query) {
      const result = fuse.search(query);
      const filteredSuggestions = result.map(({ item }) => item.Name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
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
        price <= priceRange.max &&
        item.Name.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [vendor, priceRange, selectedSort, searchTerm, products]);

  const filteredCartItems = useMemo(() => {
    if (!searchTerm) return [];
    return cartItems.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, cartItems]);

  const handleAddToCart = (productSpecification, quantity) => {
    addItemToCart(user, productSpecification, quantity);
  };

  return (
    <div className="market">
      <div className="market-title-container">
        <IngredientSelectionTitleBox />
      </div>
      <MarketStepper currentStep={1} />
      <div className="market-search-container">
        <Searchbar
          handleSearch={handleSearchChange}
          searchTerm={searchTerm}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
          cartItems={filteredCartItems}
        />
        <Sortbar onSortChange={handleSortChange} />
        <CartButton />
      </div>
      <div className="listings-container">
        <GroceryList grocerydata={filteredAndSortedGroceryData} onAddToCart={handleAddToCart} />
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
