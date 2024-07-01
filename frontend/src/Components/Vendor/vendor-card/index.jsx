import React, { useState, useEffect, useRef } from 'react';
import H2 from '../../ui/typography/h2'
import H5 from '../../ui/typography/h5'
import Iconify from '../../ui/iconify'
import Badge from '../../ui/badge'
import PricingDropdown from '../pricing-dropdown';


const VendorCard = ({ vendor, isFiltered, ...others }) => {
    console.log(isFiltered, 'isFiltered');
    const [dropdownActive, setDropdownActive] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const outsideHandler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownActive(false);
            }
        };

        document.addEventListener('mousedown', outsideHandler);
        return () => {
            document.removeEventListener('mousedown', outsideHandler);
        };
    }, []);

    return (
        <div {...others} className=' relative flex w-full  my-4 '>
            <div className={`flex flex-col md:flex-row sm:justify-between w-full  gap-2 md:gap-0  border border-grey  rounded-l overflow-hidden ${vendor.recommended || vendor.fastest ? ' rounded-r lg:rounded-r-none' : 'rounded-r'} ${isFiltered ? "bg-extra-light-purple !text-white" : ''}`}>
                <div className="flex flex-col md:flex-row justify-between w-full h-full items-center gap-4 ">
                    <img src={vendor?.img} alt={vendor?.name} className='w-full h-64 lg:w-fit md:h-fit' />
                    <div className='flex flex-col gap-2  md:justify-between w-full  h-fit  md:h-full md:py-4  px-2 '>
                        <H2 className={`!font-medium !text-nowrap !leading-6 md:mt-1.5 ${isFiltered ? '!text-white' : '!text-custom-black '}`}>{vendor?.name}</H2>
                        <div className="flex flex-col  gap-1">
                            <span className='flex justify-between w-full md:gap-20'>
                                <H5 className={'!font-normal !text-nowrap '}>Delivery Time</H5>
                                <H5 className={'!font-medium !text-nowrap ml-1'}>{vendor.deliveryTime}</H5>
                            </span>
                            <span className='flex justify-between w-full md:gap-4'>
                                <H5 className={'!font-normal sm:!text-nowrap'}>Estimated Delivery Date</H5>
                                <H5 className={'!font-medium !text-nowrap'}>{vendor.deliveryDate}</H5>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-end w-full  gap-1 p-2  h-full">
                    <div className=' flex flex-row md:flex-col md:gap-1 md:items-end justify-between md:justify-end w-full md:w-fit  md:pt-5 lg:pt-3  '>
                        <H5 className={'!font-normal '}>{vendor.location}</H5>
                        <H5 className={'!font-normal '}>{vendor.phone}</H5>
                    </div>
                    <div className='flex items-center justify-between md:justify-end w-full md:w-fit lg:gap-2 xl:gap-16 md:mb-2 '>
                        <H5 className={'!font-normal !text-nowrap'}> Total Price:</H5>
                        <H5 className={' flex items-center gap-3 !font-medium !text-nowrap'} onClick={() => setDropdownActive(!dropdownActive)}> ${vendor.price.toFixed(2)} <Iconify iconName={'iconamoon:arrow-down-2-bold'} className={`${dropdownActive ? ' -rotate-180 ' : ''} ${isFiltered ? '!text-white ' : '!text-custom-black '}`} /></H5>
                    </div>
                </div>
            </div>
            {/* Pricing Dropdown  */}

            {
                dropdownActive && (
                    <PricingDropdown dropdownRef={dropdownRef} vendor={vendor} />
                )
            }
            {/* Buttons  */}
            <div className=" hidden lg:flex lg:w-40 ">
                {vendor.recommended && <button className=" hidden lg:flex items-center justify-center bg-dark-purple xl:text-lg w-full h-full font-medium text-white p-2 rounded-r ">Recommended Vendor</button>}
                {vendor.fastest && <button className="  hidden lg:flex items-center justify-center bg-dark-purple xl:text-lg w-full h-full font-medium  text-white  p-2 rounded-r">Fastest <br /> Delivery</button>}
            </div>

            {/* //Badges  */}
            {vendor.recommended && <Badge className='lg:hidden'>Recommended Vendor</Badge>}
            {vendor.fastest && <Badge className='lg:hidden'>Fastest Delivery</Badge>}
        </div>
    )
}

export default VendorCard 