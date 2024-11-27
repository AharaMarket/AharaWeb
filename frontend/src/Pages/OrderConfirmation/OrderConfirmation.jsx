import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/Cart/CartContext'
import Iconify from '../../Components/ui/iconify'
import H2 from '../../Components/ui/typography/h2'
import H4 from '../../Components/ui/typography/h4'
import H5 from '../../Components/ui/typography/h5'
import SolidButton from '../../Components/ui/buttons/solid-button'
import { useVendor } from '../../Context/Vendor/VendorContext'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/User/UserContext'
import { OrderContext } from '../../Context/Order/OrderContext';
import OrderConfTitleBox from '../../Components/MarketComponents/MarketTitleBox/OrderConfTitleBox/OrderConfTitleBox';

const OrderPlace = () => {
    const { selectedVendor } = useVendor();
    const { resetCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const { order } = useContext(OrderContext);

    const parsedVendor = JSON.parse(selectedVendor);

    return (
        <div className='flex flex-col justify-center items-center gap-4 mt-4 mb-10  mx-4 sm:mx-0 '>
            <div className="flex flex-col justify-center items-center gap-2">
                <span className='flex justify-center items-center rounded-full w-14 h-14 md:w-16 md:h-16 bg-green'>
                    <Iconify iconName={'mingcute:check-fill'} className={' !w-8 !h-8 md:!w-10 md:!h-10 '} />
                </span>
                <H2 className='!font-semibold sm:!text-nowrap '>Order Successfully Placed</H2>
                <OrderConfTitleBox />
            </div>
            {/* Details  */}
            <div className="border border-grey divide-y divide-grey rounded-md  mt-4 w-full sm:w-fit">
                <div className="flex justify-between items-center p-3 ">
                    <H4 className={'!text-custom-black !font-semibold'}>Order Number</H4>
                    {
                        order ?
                        <H4 className={'!text-light-purple'}>#{order["orderId"]}</H4>
                        :
                        <H4 className={'!text-light-purple'}>#</H4>
                    }
                    {/* <H4 className={'!text-light-purple'}>#{order.orderId}</H4> */}
                </div> 
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
                <div className='px-3 pt-2 pb-8 sm:pb-10 md:pb-16 '>
                    <H4 className={' !font-semibold pt-2'}> Price Details</H4>
                    <div className=" flex flex-col gap-2 py-4">
                        {
                            parsedVendor?.priceDetails?.map((item, index) => (
                                <div className="flex  flex-col sm:flex-row gap-1 sm:gap-0  justify-between w-full items-start sm:items-center ">
                                    <div className=" mr-5 sm:mr-10 md:mr-20">
                                        <H5>{item?.item}</H5>
                                    </div>
                                    <div className="flex gap-5 sm:gap-10 md:gap-20 grow justify-end">
                                        <div className="flex gap-3 sm:gap-5 md:gap-10">
                                            <H5 className={'!font-normal'}>x{item?.quantity}</H5>
                                            <H5 className={'!font-normal'}>${item?.uom}</H5>
                                        </div>
                                        <div className="flex gap-3 sm:gap-5 md:gap-10">
                                            <H5 className={'!font-normal'}>${item?.unitPrice.toFixed(2)}/{item?.uom}</H5>
                                            <H5 className={'!font-normal'}>${item?.totalPrice.toFixed(2)}</H5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex items-center justify-between p-3 w-full ">
                    <H5>Total Price</H5>
                    <H5 className={'!font-semibold'}>${parsedVendor?.price.toFixed(2)}</H5>
                </div>
            </div>
            <Link to="/market/ingredientmarketplace">
                {
                <SolidButton>Start New Order</SolidButton>
                }
            </Link>
        </div>
    )
}

export default OrderPlace 