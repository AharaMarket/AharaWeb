import React, { useState, useEffect, useRef } from 'react';
import H4 from '../../ui/typography/h4';
import H5 from '../../ui/typography/h5';

const PricingDropdown = ({  vendor }) => {
    console.log(vendor, 'vendor');

    return (
        <div className=' absolute top-[417px] md:top-32 mt-1 right-0 lg:right-36 bg-white shadow-lg border border-grey rounded-b-md z-40  py-2 '>
            <H4 className={' !text-base md:!text-base !font-semibold px-2 sm:px-4  pt-2'}> Price Details</H4>
            <div className=" flex flex-col gap-2 border-b border-grey px-2 sm:px-4 pt-2 pb-4">
                {
                    vendor?.priceDetails?.map((item) => (
                        <div className="flex items-start sm:items-center ">
                            <div className=" mr-2 sm:mr-5 md:mr-16">
                                <H5>{item?.item}</H5>
                            </div>
                            <div className="flex gap-5 sm:gap-10 md:gap-20 grow justify-end">
                                <div className="flex gap-3 sm:gap-5 md:gap-10">
                                    <H5 className={'!font-normal'}>x{item?.quantity}</H5>
                                    <H5 className={'!font-normal'}>{item?.totalPrice}</H5>
                                </div>
                                <div className="flex gap-3 sm:gap-5 md:gap-10">
                                    <H5 className={'!font-normal'}>${item?.unitPrice}</H5>
                                    <H5 className={'!font-normal'}>${item?.uom}</H5>
                                </div>
                            </div>
                        </div>
                    )) 
                }
            </div>
            <div className="flex items-center justify-end gap-10 pt-2 w-full px-4 ">
                <H5>Total Price</H5>
                <H5 className={'!font-semibold'}>${vendor.price.toFixed(2)}</H5>
            </div>
        </div>
    )
}

export default PricingDropdown