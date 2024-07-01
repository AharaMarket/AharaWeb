import './VendorSelection.css'
import React from 'react'
import { useState } from "react";
import recommendations from '../../Data/recommendationdata'
import Sortbar from '../../Components/MarketComponents/Sortbar/Sortbar'
import Sidebar from '../../Components/MarketComponents/Sidebar/Sidebar'
import RecommendationList from '../../Components/Recommendations/RecommendationList/RecommendationList'
import GroceryList from '../../Components/MarketComponents/GroceryList/GroceryList'
import MarketStepper from '../../Components/MarketComponents/MarketStepper/MarketStepper';
import VendorSelectionTitleBox from '../../Components/MarketComponents/MarketTitleBox/VendorSelectionTitleBox/VendorSelectionTitleBox';
function Recommendations() {
    return (
        <div class = 'market'>
            <Sidebar></Sidebar>
            {/* positioning of the container */}
            <div className = "market-title-container">
                <VendorSelectionTitleBox></VendorSelectionTitleBox>
            </div>
            <MarketStepper></MarketStepper>
            <div className = "recommendations-sort-container">
            <Sortbar/>
            </div>
            <div className = "recommendations-list-container">
            <RecommendationList></RecommendationList>
            </div>
        </div>
    )
}

export default Recommendations
