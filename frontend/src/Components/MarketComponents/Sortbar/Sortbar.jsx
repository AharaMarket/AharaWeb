import './Sortbar.css';

function Sortbar({ onSortChange }) {
    const updateSort = (newSort) => {
        onSortChange(newSort); // This could be triggered by any UI element, like a dropdown
    };

    return (
        <div className="sort-by-bar">
            <label htmlFor="sort-by">Sort By:</label>
            <select id="sort-by" onChange={(e) => updateSort(e.target.value)}>
                <option value="default">Default</option>
                <option value="nameAZ">A-Z</option>
                <option value="nameZA">Z-A</option>
            </select>
        </div>
    );
};

export default Sortbar;
