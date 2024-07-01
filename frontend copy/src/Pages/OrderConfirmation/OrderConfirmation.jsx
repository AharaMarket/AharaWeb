import React from 'react'
import './OrderConfirmation.css'
import MarketStepper from '../../Components/MarketComponents/MarketStepper/MarketStepper'
function OrderConfirmation() {
    return (
        <div>
            <div className = "market-title-container">
            <h2>Order Confirmation</h2>
            </div>
            <MarketStepper></MarketStepper>
        </div>
    )
}

export default OrderConfirmation
