import React, { useState, useEffect, useRef } from 'react';
import H3 from '../../ui/typography/h3';
import H4 from '../../ui/typography/h4';
import CheckBox from '../../ui/check-box';
import VendorCard from '../vendor-card';
import Iconify from '../../ui/iconify';
import SolidButton from '../../ui/buttons/solid-button';
import OutlineButton from '../../ui/buttons/outline-button';
import FillButton from '../../ui/buttons/fill-button';
import { NavLink } from 'react-router-dom';
import '../../../index.css';
import { emphasize } from '@mui/material';
import { EmptyBox } from '@hypertheme-editor/chakra-ui';
import { useVendor } from '../../../Context/Vendor/VendorContext'; // Import your context

const Vendors = React.memo(({ initialVendors }) => {
    const [filterDropDownActive, setFilterDropDownActive] = useState(false);
    const dropdownRef = useRef(null);
    const [vendors, setVendors] = useState(initialVendors);
    const [filteredVendorIds, setFilteredVendorIds] = useState([]);
    var { selectedVendor, setSelectedVendor } = useVendor();
    const allPrices = ['$0 - $50', '$50 - $100', '$100 - $200', '$200 - $300'];
    const [filters, setFilters] = useState({
        vendor: [],
        price: [],
        deliveryTime: []
    });
    const handleVendorSelect = (vendor) => {
        console.log("json: " + JSON.stringify(vendor, null, 2))

        setSelectedVendor(JSON.stringify(vendor, null, 2));
        selectedVendor = JSON.stringify(vendor, null, 2);
    };

    // Extract unique values for filters
    // var json = JSON.parse(initialVendors)

    const uniqueVendorsSet = initialVendors.map(vendor => vendor["name"]);
    const uniqueDeliveryTimes = [...new Set(initialVendors.map(vendor => vendor.deliveryTime))] ;
    const uniquePrices = [...new Set(initialVendors.map(vendor => vendor.price))];

    const uniqueVendors = [];
    uniqueVendorsSet.forEach(v => uniqueVendors.push(v));

    console.log("unique vendors: " + uniqueVendors)
    console.log("unique uniqueDeliveryTimes: " + uniqueDeliveryTimes)
    console.log("unique uniquePrices: " + uniquePrices)
    
    
    // Handle filter changes
    const handleFilterChange = (type, value) => {
        setFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            if (type === 'vendor') {
                updatedFilters.price = [];
                updatedFilters.deliveryTime = [];
            } else if (type === 'price') {
                updatedFilters.vendor = [];
                updatedFilters.deliveryTime = [];
            } else if (type === 'deliveryTime') {
                updatedFilters.vendor = [];
                updatedFilters.price = [];
            }

            if (updatedFilters[type].includes(value)) {
                updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
            } else {
                updatedFilters[type].push(value);
            }
            return updatedFilters;
        });
    };

    // Apply filters
    const applyFilters = () => {
        let filteredVendors = [...initialVendors];

        // Filter Vendors
        if (filters.vendor.length > 0) {
            filteredVendors = filteredVendors.filter(vendor => filters.vendor.includes(vendor.name));
        }

        // Filter prices
        if (filters.price.length > 0) {
            filteredVendors = filteredVendors.filter(vendor => {
                return filters.price.some(priceRange => {
                    const [min, max] = priceRange.split('-').map(str => Number(str.trim().replace('$', '').replace(' ', '')));
                    return !isNaN(min) && (max ? vendor.price >= min && vendor.price <= max : vendor.price >= min);
                });
            });
        }

        // Filter delivery time
        if (filters.deliveryTime.length > 0) {
            filteredVendors = filteredVendors.filter(vendor => filters.deliveryTime.includes(vendor.deliveryTime));
        }

        if (filteredVendors.length !== vendors.length) {
            setVendors(filteredVendors);
            setFilteredVendorIds(filteredVendors.map(vendor => vendor.id));
        }
    };

    // Select all filters
    const handleSelectAllFilters = (type) => {
        if (type === 'vendor') {
            setFilters(prevFilters => ({
                vendor: prevFilters.vendor.length === uniqueVendors.length ? [] : uniqueVendors,
                price: [],
                deliveryTime: []
            }));
        } else if (type === 'price') {
            setFilters(prevFilters => ({
                price: prevFilters.price.length === allPrices.length ? [] : allPrices,
                vendor: [],
                deliveryTime: []
            }));
        } else if (type === 'deliveryTime') {
            setFilters(prevFilters => ({
                deliveryTime: prevFilters.deliveryTime.length === uniqueDeliveryTimes.length ? [] : uniqueDeliveryTimes,
                vendor: [],
                price: []
            }));
        }
    };

    // Use effects
    useEffect(() => {
        applyFilters();
    }, [filters]);

    useEffect(() => {
        const outsideHandler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setFilterDropDownActive(false);
            }
        };

        document.addEventListener('mousedown', outsideHandler);
        return () => {
            document.removeEventListener('mousedown', outsideHandler);
        };
    }, []);

    return (
        <div className='lg:px-7 flex flex-col lg:flex-row'>
            {/* Filters */}
            <div className="w-full lg:w-1/5 px-4 md:px-7 lg:px-0 hidden lg:flex flex-col gap-0 lg:gap-5 border-b lg:border-r border-grey pb-2">
                <H3 className={'!text-custom-black !font-medium mt-2 lg:mt-4 mb-2 lg:-mb-2'}>Filter by</H3>
                
                {/* Vendor Filter */}
                <div>
                    <H4 className={'mb-1 lg:mb-2 font-semibold'}>Vendor</H4>
                    <div className="flex flex-row lg:flex-col">
                        <CheckBox 
                            value={'All Vendors'} 
                            className={'lg:mb-1.5 '} 
                            checked={filters.vendor.length === uniqueVendors.length} 
                            onChange={() => handleSelectAllFilters('vendor')} 
                        />
                        <div className='flex flex-row lg:flex-col flex-wrap gap-2 pl-6'>
                            {uniqueVendors.map((vendor, index) => (
                                <CheckBox 
                                    key={vendor} // Unique key
                                    checked={filters.vendor.includes(vendor)} 
                                    value={vendor} 
                                    onChange={() => handleFilterChange('vendor', vendor)} 
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Price Filter */}
                <div>
                    <H4 className={'mb-1 lg:mb-2 !font-semibold'}>Prices</H4>
                    <div className="flex flex-row lg:flex-col">
                        <CheckBox 
                            value={'All Prices Range'} 
                            className={'mb-1.5'} 
                            checked={filters.price.length === allPrices.length} 
                            onChange={() => handleSelectAllFilters('price')} 
                        />
                        <div className='flex flex-row lg:flex-col gap-2 flex-wrap pl-6'>
                            {allPrices.map((price) => (
                                <CheckBox 
                                    key={price} // Use price as unique key
                                    value={price} 
                                    checked={filters.price.includes(price)} 
                                    onChange={() => handleFilterChange('price', price)} 
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Delivery Time Filter */}
                <div>
                    <H4 className={'mb-1 lg:mb-2 !font-semibold'}>Delivery Time</H4>
                    <div className="flex flex-row lg:flex-col flex-wrap">
                        <CheckBox 
                            value={'All Delivery Times'} 
                            className={'mb-1.5'} 
                            checked={filters.deliveryTime.length === uniqueDeliveryTimes.length} 
                            onChange={() => handleSelectAllFilters('deliveryTime')} 
                        />
                        <div className='flex flex-row lg:flex-col gap-2 pl-6'>
                            {uniqueDeliveryTimes.map((deliveryTime) => (
                                <CheckBox 
                                    key={deliveryTime} // Use deliveryTime as unique key
                                    value={deliveryTime} 
                                    checked={filters.deliveryTime.includes(deliveryTime)} 
                                    onChange={() => handleFilterChange('deliveryTime', deliveryTime)} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dropdown Filter */}
            <div className="relative flex lg:hidden justify-end items-center w-full px-4 md:px-7 pt-3">
                <div ref={dropdownRef}>
                    <div className="flex items-center gap-2 w-fit">
                        <H3 className={'!text-custom-black !font-medium'}>Filter by</H3>
                        <span className={`rounded-full p-1.5 cursor-pointer border hover:bg-gray-300 ${filterDropDownActive ? 'bg-gray-300' : 'bg-gray-200'}`} onClick={() => setFilterDropDownActive(!filterDropDownActive)}>
                            <Iconify iconName={'mage:filter'} className={'!text-black !w-5 !h-5'} />
                        </span>
                    </div>

                    {filterDropDownActive && (
                        <div className="hide-scrollbar absolute top-12 right-2 flex flex-col gap-2 bg-white border border-grey rounded-lg max-w-full min-w-56 h-96 overflow-auto px-4 lg:px-0 pb-2 py-3 z-40 shadow-xl">
                            <div>
                                <H4 className={'mb-1 lg:mb-2 font-semibold'}>Vendor</H4>
                                <div className="flex flex-col">
                                    <CheckBox 
                                        value={'All Vendors'} 
                                        className={'mb-1.5 '} 
                                        checked={filters.vendor.length === initialVendors.length} 
                                        onChange={() => handleSelectAllFilters('vendor')} 
                                    />
                                    <div className='flex flex-col flex-wrap gap-2 pl-6'>
                                        {initialVendors.map(vendor => (
                                            <CheckBox 
                                                key={vendor.id} // Unique key
                                                checked={filters.vendor.includes(vendor.name)} 
                                                value={vendor.name} 
                                                onChange={() => handleFilterChange('vendor', vendor.name)} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Price Filter in Dropdown */}
                            <div>
                                <H4 className={'mb-1 lg:mb-2 !font-semibold'}>Prices</H4>
                                <div className="flex flex-col">
                                    <CheckBox 
                                        value={'All Prices Range'} 
                                        className={'mb-1.5'} 
                                        checked={filters.price.length === allPrices.length} 
                                        onChange={() => handleSelectAllFilters('price')} 
                                    />
                                    <div className='flex flex-col gap-2 flex-wrap pl-6'>
                                        {allPrices.map((price) => (
                                            <CheckBox 
                                                key={price} // Use price as unique key
                                                value={price} 
                                                checked={filters.price.includes(price)} 
                                                onChange={() => handleFilterChange('price', price)} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Time Filter in Dropdown */}
                            <div>
                                <H4 className={'mb-1 lg:mb-2 !font-semibold'}>Delivery Time</H4>
                                <div className="flex flex-col flex-wrap mb-2">
                                    <CheckBox 
                                        value={'All Delivery Times'} 
                                        className={'mb-1.5'} 
                                        checked={filters.deliveryTime.length === uniqueDeliveryTimes.length} 
                                        onChange={() => handleSelectAllFilters('deliveryTime')} 
                                    />
                                    <div className='flex flex-col gap-2 pl-6'>
                                        {uniqueDeliveryTimes.map((deliveryTime) => (
                                            <CheckBox 
                                                key={deliveryTime} // Use deliveryTime as unique key
                                                value={deliveryTime} 
                                                checked={filters.deliveryTime.includes(deliveryTime)} 
                                                onChange={() => handleFilterChange('deliveryTime', deliveryTime)} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Vendor Card */}
            <div className="w-full lg:pl-4 px-4 md:px-7 lg:px-0">
                {vendors.length > 0 ? (
                    vendors.map(vendor => (
                        <VendorCard 
                            key={vendor.id} 
                            vendor={vendor} 
                            isFiltered={filteredVendorIds.includes(vendor.id)} 
                            onSelect={(vendor) => handleVendorSelect(vendor)} // Track selected vendor
                            isSelected={selectedVendor?.id === vendor.id} 
                        />
                    ))
                ) : (
                    <p>Loading vendor data...</p>
                )}
                
                {/* Buttons */}
                <div className="flex justify-between my-10">
                <NavLink to={'/market/ingredientmarketplace'}>
                    <OutlineButton>Cancel</OutlineButton>
                </NavLink>
                    <div className="flex items-center gap-3">
                        <NavLink to={'/market/ingredientmarketplace'}>
                            <FillButton>Previous</FillButton>
                        </NavLink>
                        {selectedVendor ? (
                        <NavLink to={'/market/ordercheckout'}>
                            <SolidButton>Continue</SolidButton>
                        </NavLink>)
                        :
                        <FillButton>Choose Vendor</FillButton>
}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Vendors;
