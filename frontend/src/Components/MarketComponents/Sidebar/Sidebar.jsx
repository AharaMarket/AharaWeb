import Vendor from "./Vendor/Vendor";
import Price from "./Price/Price";
import "./Sidebar.css";

const Sidebar = ({ onQueryChange }) => {
  const handleVendorChange = (event) => {
    // Assuming the event returns vendor name
    onQueryChange({type: 'vendor', value: event.target.value});
};

// Handler for changes coming from Price
const handlePriceChange = (data) => {
  // Directly passing structured data
  onQueryChange(data);
};

  return (
    <>
      <section className="sidebar">
        <Vendor handleChange={handleVendorChange} />
        <Price handleChange={handlePriceChange} />
      </section>
    </>
  );
};

export default Sidebar;