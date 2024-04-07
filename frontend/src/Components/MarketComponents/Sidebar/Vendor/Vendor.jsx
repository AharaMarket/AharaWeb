import "./Vendor.css";
import Input from "../../../Input/Input";

function Vendor({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Vendor</h2>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="restaurantdepot"
          title="Restaurant Depot"
          name="restaurantdepot"
        />
        <Input
          handleChange={handleChange}
          value="chefstore"
          title="Chef Store"
          name="chefstore"
        />
        <Input
          handleChange={handleChange}
          value="cheetah"
          title="Cheetah"
          name="cheetah"
        />
        <Input
          handleChange={handleChange}
          value="sandj"
          title="S&J"
          name="s&j"
        />
      </div>
  );
}

export default Vendor;