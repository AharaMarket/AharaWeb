import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('http://127.0.0.1:5050/ingredients/products');
    const data = response.data;

    const transformedData = data.map(item => ({
      Name: item["Product-Specification"],
      Price: item["Price-Range"],
      Unit: "NA", // Assuming the unit is the same across all details
      URL: item["URL"], // Adjust image path as necessary
      Vendor: "NA" // Example: Use the first distributor's name
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
}

fetchData().then(grocerydata => {
  console.log("grocerydata!", grocerydata);
  // Normally you would export the data here, but since fetching is async,
  // we just log it for debugging purposes.
});

export default fetchData;