import React, { useState, useEffect, useRef } from 'react';
import H3 from '../../ui/typography/h3';
import H4 from '../../ui/typography/h4';
import CheckBox from '../../ui/check-box';
import VendorCard from '../vendor-card';
import Iconify from '../../ui/iconify';
import '../../../index.css'
import SolidButton from '../../ui/buttons/solid-button';
import OutlineButton from '../../ui/buttons/outline-button';
import FillButton from '../../ui/buttons/fill-button';
import { NavLink, Link } from 'react-router-dom';

const Vendors = ({ initialVendors }) => {


    const [filterActive, setFilterActive] = useState(false);
    const dropdownRef = useRef(null);
    const [vendors, setVendors] = useState(initialVendors);
    const [filteredVendorIds, setFilteredVendorIds] = useState([]);
    const [filters, setFilters] = useState({
        vendor: [],
        price: [],
        deliveryTime: []
    });

    const handleFilterChange = (type, value) => {
        setFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            if (updatedFilters[type].includes(value)) {
                updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
            } else {
                updatedFilters[type].push(value);
            }
            return updatedFilters;
        });
    };

    // UseEffects 
    useEffect(() => {
        applyFilters();
    }, [filters]);

    useEffect(() => {
        const outsideHandler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setFilterActive(false);
            }
        };

        document.addEventListener('mousedown', outsideHandler);
        return () => {
            document.removeEventListener('mousedown', outsideHandler);
        };
    }, []);

    const applyFilters = () => {
        let filteredVendors = initialVendors;

        if (filters.vendor.length > 0) {
            filteredVendors = filteredVendors.filter(vendor => filters.vendor.includes(vendor.name));
        }

        if (filters.price.length > 0) {
            filteredVendors = filteredVendors.filter(vendor => filters.price.some(priceRange => {
                const [min, max] = priceRange.split('-').map(Number);
                if (max) {
                    return vendor.price >= min && vendor.price <= max;
                }
                return vendor.price >= min;
            }));
        }

        if (filters.deliveryTime.length > 0) {
            filteredVendors = filteredVendors.filter(vendor => filters.deliveryTime.includes(vendor.deliveryTime));
        }

        setVendors(filteredVendors);
        if (filters.vendor.length === 0 && filters.price.length === 0 && filters.deliveryTime.length === 0) {
            setFilteredVendorIds([]);
        } else {
            setFilteredVendorIds(filteredVendors.map(vendor => vendor.id));
        }
    };

    return (
        <div className='lg:px-7 flex flex-col lg:flex-row '>
            {/*  Filters  */}
            <div className=" w-full lg:w-1/5  px-4 md:px-7 lg:px-0 hidden lg:flex flex-col  gap-0 lg:gap-5 border-b lg:border-r border-grey pb-2">
                <H3 className={'!text-custom-black !font-medium mt-2 lg:mt-4 mb-2 lg:-mb-2'}>Filter by</H3>
                <div>
                    <H4 className={' mb-1 lg:mb-2 font-semibold'} >Vendor</H4>
                    <div className="flex flex-row lg:flex-col">
                        <CheckBox value={'All Vendors'} className={'lg:mb-1.5 '} />
                        <div className='flex flex-row lg:flex-col flex-wrap gap-2  pl-6'>
                            {initialVendors?.map(vendor => (
                                <CheckBox key={vendor?.id} value={vendor?.name} onChange={() => handleFilterChange('vendor', vendor.name)} />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <H4 className={'mb-1 lg:mb-2 !font-semibold'} >Prices</H4>
                    <div className="flex flex-row lg:flex-col">
                        <CheckBox value={'All Prices Range'} className={'mb-1.5'} />
                        <div className='flex flex-row lg:flex-col gap-2 flex-wrap  pl-6'>
                            <CheckBox value={'$0 - $50'} onChange={() => handleFilterChange('price', '$0 - $50')} />
                            <CheckBox value={'$50 - $100'} onChange={() => handleFilterChange('price', '$50 - $100')} />
                            <CheckBox value={'$100 - $150'} onChange={() => handleFilterChange('price', '$100 - $150')} />
                            <CheckBox value={'$150 - $200'} onChange={() => handleFilterChange('price', '$150 - $200')} />
                        </div>
                    </div>
                </div>
                <div>
                    <H4 className={'mb-1 lg:mb-2 !font-semibold'} >Delivery Time</H4>
                    <div className="flex flex-row lg:flex-col flex-wrap">
                        <CheckBox value={'All Delivery Times'} className={'mb-1.5'} />
                        <div className='flex flex-row lg:flex-col gap-2  pl-6'>
                            <CheckBox value={'Same Day Delivery'} onChange={() => handleFilterChange('deliveryTime', 'Same Day Delivery')} />
                            <CheckBox value={'1 Day - 3 Days'} onChange={() => handleFilterChange('deliveryTime', '1 Day - 3 Days')} />
                            <CheckBox value={'3 Days - 7 Days'} onChange={() => handleFilterChange('deliveryTime', '3 Days - 7 Days')} />
                            <CheckBox value={'More than 7 Days'} onChange={() => handleFilterChange('deliveryTime', 'More than 7 Days')} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Dropdwon Filter  */}
            <div className=" relative flex lg:hidden justify-end items-center gap-2 w-full  px-4 md:px-7 pt-3 ">
                <H3 className={'!text-custom-black !font-medium '}>Filter by</H3>
                <span className={` rounded-full p-1.5 cursor-pointer border  hover:bg-gray-300 ${filterActive ? ' bg-gray-300 ' : 'bg-gray-200 '}`} onClick={() => setFilterActive(!filterActive)}>
                    <Iconify iconName={'mage:filter'} className={'!text-black !w-5 !h-5  '} />
                </span>
                {filterActive && (
                    <div ref={dropdownRef} className=" hide-scrollbar absolute top-12 flex flex-col gap-2 bg-white border border-grey rounded-lg max-w-full min-w-56 h-96 overflow-auto px-4 lg:px-0 pb-2 py-3  z-40 shadow-xl ">
                        <div>
                            <H4 className={' mb-1 lg:mb-2 font-semibold'} >Vendor</H4>
                            <div className="flex flex-col">
                                <CheckBox value={'All Vendors'} className={'mb-1.5 '} />
                                <div className='flex flex-col flex-wrap gap-2  pl-6'>
                                    {initialVendors?.map(vendor => (
                                        <CheckBox key={vendor?.id} value={vendor?.name} onChange={() => handleFilterChange('vendor', vendor.name)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <H4 className={'mb-1 lg:mb-2 !font-semibold'} >Prices</H4>
                            <div className="flex flex-col">
                                <CheckBox value={'All Prices Range'} className={'mb-1.5'} />
                                <div className='flex flex-col gap-2 flex-wrap  pl-6'>
                                    <CheckBox value={'$0 - $50'} onChange={() => handleFilterChange('price', '$0 - $50')} />
                                    <CheckBox value={'$50 - $100'} onChange={() => handleFilterChange('price', '$50 - $100')} />
                                    <CheckBox value={'$100 - $150'} onChange={() => handleFilterChange('price', '$100 - $150')} />
                                    <CheckBox value={'$150 - $200'} onChange={() => handleFilterChange('price', '$150 - $200')} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <H4 className={'mb-1 lg:mb-2 !font-semibold'} >Delivery Time</H4>
                            <div className="flex flex-col flex-wrap mb-2">
                                <CheckBox value={'All Delivery Times'} className={'mb-1.5'} />
                                <div className='flex flex-col gap-2  pl-6'>
                                    <CheckBox value={'Same Day Delivery'} onChange={() => handleFilterChange('deliveryTime', 'Same Day Delivery')} />
                                    <CheckBox value={'1 Day - 3 Days'} onChange={() => handleFilterChange('deliveryTime', '1 Day - 3 Days')} />
                                    <CheckBox value={'3 Days - 7 Days'} onChange={() => handleFilterChange('deliveryTime', '3 Days - 7 Days')} />
                                    <CheckBox value={'More than 7 Days'} onChange={() => handleFilterChange('deliveryTime', 'More than 7 Days')} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
            {/* vendor Card  */}
            <div className="w-full lg:pl-4 px-4 md:px-7 lg:px-0">
                {vendors.map(vendor => (
                    <VendorCard key={vendor.id} vendor={vendor} isFiltered={filteredVendorIds.includes(vendor.id)} />
                ))}
                <div className="flex justify-between my-10">
                    <OutlineButton>Cancel</OutlineButton>
                    <div className="flex items-center gap-3 ">
                        <Link to="/market/ingredientmarketplace">
                        <FillButton>Previous</FillButton>
                        </Link>
                        <Link to={'/market/ordercheckout'}>
                            <SolidButton>Continue</SolidButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Vendors;
