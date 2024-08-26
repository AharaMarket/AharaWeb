const recommendationdata = [
    {
      "Vendor": "Cheetah",
      "Name": "Yellow Onion",
      "TotalPrice": (Math.random() * (100 - 10) + 10).toFixed(2),
      "Unit": "25 lbs",
      "DeliveryTime": "2 days"
    },
    {
      "Vendor": "Restaurant Depot",
      "Name": "Peeled Garlic",
      "TotalPrice": (Math.random() * (100 - 10) + 10).toFixed(2),
      "Unit": "20 lbs",
      "DeliveryTime": "3 days" 
    },
    {
      "Vendor": "Chef Store",
      "Name": "Cilantro",
      "TotalPrice": (Math.random() * (100 - 10) + 10).toFixed(2),
      "Unit": "5 dozen",
      "DeliveryTime": "1 day"
    },
    {
      "Vendor": "S&J",
      "Name": "Red Onion",
      "TotalPrice": (Math.random() * (100 - 10) + 10).toFixed(2),
      "Unit": "25 lbs",
      "DeliveryTime": "4 days"
    }
  ];
  
recommendationdata.sort((a, b) => b.TotalPrice - a.TotalPrice);


export default recommendationdata;