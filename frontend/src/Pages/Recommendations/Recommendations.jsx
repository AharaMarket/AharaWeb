import './Recommendations.css'
import React from 'react'
import { useState } from "react";
import Sortbar from '../../Components/MarketComponents/Sortbar/Sortbar'
import Sidebar from '../../Components/MarketComponents/Sidebar/Sidebar'
import GroceryList from '../../Components/MarketComponents/GroceryList/GroceryList'
function Recommendations() {
    return (
        <div class = 'market'>
            <Sidebar></Sidebar>
            {/* positioning of the container */}
            <div className = "listings-container">
                
            <Sortbar/>
            </div>
        </div>
    )
}

export default Recommendations
