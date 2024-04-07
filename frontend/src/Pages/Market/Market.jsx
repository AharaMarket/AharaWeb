import React from 'react'
import { useState } from "react";
import Sidebar from '../../Components/MarketComponents/Sidebar/Sidebar'
import GroceryList from '../../Components/MarketComponents/GroceryList/GroceryList'
import Sortbar from '../../Components/MarketComponents/Sortbar/Sortbar'
import products from '../../Data/sampledata'
import './Market.css'
function Market() {
    const [selectedSort, setSelectedSort] = useState(null);
    const [query, setQuery] = useState("");
    
    
    return (
        <div class = 'market'>
            <Sidebar></Sidebar>
            {/* positioning of the container */}
            <div className = "listings-container">
            <Sortbar/>
            <GroceryList grocerydata={products}/>
            </div>
        </div>

    )
}

export default Market
