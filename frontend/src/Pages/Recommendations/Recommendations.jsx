import './Recommendations.css'
import React from 'react'
import { useState } from "react";
import recommendations from '../../Data/recommendationdata'
import Sortbar from '../../Components/MarketComponents/Sortbar/Sortbar'
import Sidebar from '../../Components/MarketComponents/Sidebar/Sidebar'
import RecommendationList from '../../Components/Recommendations/RecommendationList/RecommendationList'
import GroceryList from '../../Components/MarketComponents/GroceryList/GroceryList'
import MarketStepper from '../../Components/MarketComponents/MarketStepper/MarketStepper';
function Recommendations() {
    return (
        <div class = 'market'>
            <Sidebar></Sidebar>
            {/* positioning of the container */}
            <div className = "market-title-container">
            <h2>Vendor Selection</h2>
            </div>
            <MarketStepper></MarketStepper>
            <div className = "recommendations-container">
            <Sortbar/>

            <RecommendationList></RecommendationList>
            </div>
        </div>
    )
}

export default Recommendations
