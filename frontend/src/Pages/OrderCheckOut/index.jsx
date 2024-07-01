import React, { useState } from 'react'
import MarketStepper from "../../Components/MarketComponents/MarketStepper/MarketStepper";
import Iconify from '../../Components/ui/iconify'
import H2 from '../../Components/ui/typography/h2'
import H3 from '../../Components/ui/typography/h3'
import H4 from '../../Components/ui/typography/h4'
import H5 from '../../Components/ui/typography/h5'
import SolidButton from '../../Components/ui/buttons/solid-button';
import OutlineButton from '../../Components/ui/buttons/outline-button';
import FillButton from '../../Components/ui/buttons/fill-button';
import TailwindInput from '../../Components/ui/input'
import TailwindSelect from '../../Components/ui/select'
import { Link } from 'react-router-dom';

const CheckOuts = () => {
    const [activeTab, setActiveTab] = useState(false)
    const priceDetails = [
        { item: 'Apple: Akane', quantity: 10, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Carrot: Mixed Variety', quantity: 25, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Cilantro', quantity: 5, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Yellow Onions', quantity: 15, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Zucchini', quantity: 10, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
    ]
    return (
        <div>
            {/* Form steper  */}
            <div className=""></div>
            <MarketStepper currentStep={3} />
            {/* Details  */}
            <div className=" flex flex-col lg:flex-row justify-between gap-5 xl:gap-10 w-full h-full px-4 md:px-7">
                {/* Order Details  */}
                <div className=" w-full lg:w-1/2 xl:w-[43%]  ">
                    <H2 className={'my-4 '}>Order Details</H2>
                    <div className=" flex flex-col w-full border border-grey divide-y divide-grey rounded-md  h-fit lg:h-[600px] ">
                        <div className="flex justify-between items-start p-3">
                            <H4 className={'!text-custom-black !font-semibold'}>Vendor</H4>
                            <div className="">
                                <H4 className={'!text-custom-black '}>Vendor Name</H4>
                                <H4 className={'!text-custom-black'}>Pleasanton, CA</H4>

                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 ">
                            <H4 className={'!text-custom-black !font-semibold'}>Estimated Delivery Date</H4>
                            <H4 className={'!text-custom-black'}>April 31, 2024</H4>
                        </div>
                        <div className='px-3 pt-2 pb-8 sm:pb-10 lg:pb-56  '>
                            <H4 className={' !font-semibold pt-2'}> Price Details</H4>
                            <div className=" flex flex-col gap-2 py-4">
                                {
                                    priceDetails?.map((item) => (
                                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between w-full items-start sm:items-center ">
                                            <div className="">
                                                <H5>{item?.item}</H5>
                                            </div>
                                            <div className="flex gap-5 sm:gap-10 lg:gap-10 xl:gap-20 grow justify-end">
                                                <div className="flex gap-3 sm:gap-5 xl:gap-10">
                                                    <H5 className={'   !font-normal'}>x{item?.quantity}</H5>
                                                    <H5 className={'   !font-normal'}>${item?.uom}</H5>
                                                </div>
                                                <div className="flex gap-3 sm:gap-5 xl:gap-10">
                                                    <H5 className={'    !font-normal'}>${item?.unitPrice}/{item?.uom}</H5>
                                                    <H5 className={'  !font-normal'}>{item?.totalPrice}</H5>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex  items-end justify-between  h-full p-3 w-full ">
                            <H5>Total Price</H5>
                            <H5 className={'!font-semibold'}>$XX.XX</H5>
                        </div>
                    </div>
                </div>
                {/* Payment Details  */}
                <div className="w-full lg:w-1/2 xl:w-[54%]">
                    <H2 className={'my-4 '}>Payment Details</H2>
                    <div className=" w-full border border-grey rounded-md h-[880px] md:h-[700px]  lg:h-[600px] ">
                        <H4 className={'!text-custom-black !font-semibold p-3'}>Shipping Address</H4>
                        <div className=" flex flex-col gap-2 md:gap-10 px-3 border-b border-grey pb-3">
                            <div className="flex flex-col gap-2">
                                <TailwindInput type={'text'} label={'Full Name'} required={true} />
                                <TailwindInput type={'text'} label={'Address 1'} required={true} />
                                <TailwindInput type={'text'} label={'Address 2'} required={false} />

                            </div>
                            <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-4">
                                <TailwindInput type={'text'} label={'City '} required={true} />
                                <TailwindSelect />
                                <TailwindInput type={'text'} label={' Zip Code '} required={true} />
                            </div>
                        </div>
                        {/* Payment Methods Tabs  */}
                        <div className="flex flex-col sm:flex-row gap-2 w-full justify-between items-start sm:items-center px-3 py-2">
                            <H4 className={'!text-custom-black !font-semibold '}>Payment Method</H4>
                            <div className="flex border border-grey rounded-md divide-x divide-grey overflow-hidden cursor-pointer w-full sm:w-fit">
                                <H4 className={` !text-light-purple w-full p-1.5 sm:p-2 !text-nowrap  text-center ${activeTab ? 'bg-[#DCDFFF]' : ''} `} onClick={() => setActiveTab(true)}>Credit Card</H4>
                                <H4 className={`text-light-purple  w-full  p-1.5 sm:p-2  text-center !text-nowrap ${activeTab ? '' : 'bg-[#DCDFFF]'} `} onClick={() => setActiveTab(false)}>Pay at Delivery</H4>
                            </div>
                        </div>

                        {/* Payment Methods  */}
                        {
                            activeTab && (
                                <div className="flex flex-col gap-2 p-3 w-full">
                                    <TailwindInput type={'text'} label={'Card Holder Name '} required={true} />
                                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full ">
                                        <TailwindInput type={'text'} label={'Credit Card Number '} required={true} className={'grow'} />
                                        <TailwindInput type={'text'} label={'Exp Date'} required={true} />
                                        <TailwindInput type={'text'} label={'CVC'} required={true} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* buttons  */}
            <div className="flex justify-between my-4 px-4 md:px-7">
                <OutlineButton>Cancel</OutlineButton>
                <div className="flex items-center gap-3 ">
                    <Link to="/market/vendorselection">
                    <FillButton> Previous</FillButton>
                    </Link>
                    <Link to="/market/orderconfirmation">
                    {
                        // filteredVendorIds?.length > 0 ? (
                        // <NavLink to={'/checkout'}>
                        //     <SolidButton>Continue</SolidButton>
                        // </NavLink>
                        // ) : (
                        <SolidButton className={`!bg-grey opacity-30 !text-gray-700 border-2 border-gray-500 cursor-not-allowed `}>Continue</SolidButton>
                        // )
                    }
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CheckOuts