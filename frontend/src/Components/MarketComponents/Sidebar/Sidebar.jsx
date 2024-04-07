import Vendor from "./Vendor/Vendor";
import Price from "./Price/Price";
import "./Sidebar.css";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <Vendor handleChange={handleChange} />
        <Price handleChange={handleChange} />
      </section>
    </>
  );
};

export default Sidebar;