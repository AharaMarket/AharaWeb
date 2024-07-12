import React from 'react'
import recommendationdata from '../../../Data/recommendationdata';
import RecommendationCard from '../RecommendationCard/RecommendationCard'
import './RecommendationList.css'

function RecommendationList() {
    return (
        <div>
          {recommendationdata.map((item, index) => (
            <RecommendationCard
              key={index}
              vendor={item.Vendor}
              name={item.Name}
              totalPrice={item.TotalPrice}
              unit={item.Unit}
              deliveryTime={item.DeliveryTime}
            />
          ))}
        </div>
      );
}

export default RecommendationList
