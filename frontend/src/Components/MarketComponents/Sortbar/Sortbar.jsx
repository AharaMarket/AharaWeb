import './Sortbar.css'
function Sortbar() {
    return (
        <div className="sort-by-bar">
          <label htmlFor="sort-by">Sort By:</label>
          <select id="sort-by">
            <option value="Price">Price</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
      );
    };


export default Sortbar
