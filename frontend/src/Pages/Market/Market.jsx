import React, { useState, useMemo } from 'react';
import Sidebar from '../../Components/MarketComponents/Sidebar/Sidebar';
import GroceryList from '../../Components/MarketComponents/GroceryList/GroceryList';
import Sortbar from '../../Components/MarketComponents/Sortbar/Sortbar';
import products from '../../Data/sampledata';
import './Market.css';

function Market() {
    const [selectedSort, setSelectedSort] = useState("");
    const [vendor, setVendor] = useState("");
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity }); // Default to no price filter

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
    };

    const handleQueryChange = ({ type, value }) => {
        if (type === 'vendor') {
            setVendor(value);
        } else if (type === 'price') {
            setPriceRange(value); // Expecting value to be an object {min, max}
        }
    };

    const filteredAndSortedGroceryData = useMemo(() => {
        let filteredData = products.filter(item => {
            const price = parseFloat(item.Price.replace(/[^0-9.-]+/g,""));
            return (vendor ? item.Vendor.trim().replace(/\s+/g, '').toLowerCase() === vendor.trim().replace(/\s+/g, '').toLowerCase() : true) &&
                   (price >= priceRange.min && price <= priceRange.max); // Adjusted to use min and max
        });

        if (selectedSort) {
            filteredData.sort((a, b) => {
                switch (selectedSort) {
                    case 'priceLowToHigh':
                        return parseFloat(a.Price.replace(/[^0-9.-]+/g,"")) - parseFloat(b.Price.replace(/[^0-9.-]+/g,""));
                    case 'priceHighToLow':
                        return parseFloat(b.Price.replace(/[^0-9.-]+/g,"")) - parseFloat(a.Price.replace(/[^0-9.-]+/g,""));
                    case 'nameAZ':
                        return a.Name.localeCompare(b.Name);
                    case 'nameZA':
                        return b.Name.localeCompare(a.Name);
                    default:
                        return 0;
                }
            });
        }
        return filteredData;
    }, [vendor, priceRange, selectedSort]);

    return (
        <div className="market">
            <Sidebar onQueryChange={handleQueryChange} />
            <div className="listings-container">
                <Sortbar onSortChange={handleSortChange} />
                <GroceryList grocerydata={filteredAndSortedGroceryData} />
            </div>
        </div>
    );
}

export default Market;
