import React, { useState, useContext, useEffect } from "react";
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
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { EmptyBox } from '@hypertheme-editor/chakra-ui';
import { useVendor } from '../../Context/Vendor/VendorContext'; 
import { OrderContext } from '../../Context/Order/OrderContext';
import { CartContext } from '../../Context/Cart/CartContext';
import { UserContext } from '../../Context/User/UserContext';
import { EmailContext } from '../../Context/Email/EmailContext';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";


const CheckOuts = () => {
    const [activeTab, setActiveTab] = useState(false);
    const { selectedVendor } = useVendor();
    const { order, sendOrder } = useContext(OrderContext);
    const { cart, fetchCart, resetCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const { sendEmail } = useContext(EmailContext);

    const parsedVendor = JSON.parse(selectedVendor);
    const currentDate = new Date();

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zipCode: '',
        cardHolderName: '',
        creditCardNumber: '',
        expDate: '',
        cvc: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (user && !cart) {
            fetchCart(user);
        }
    }, [user, cart]);

    useEffect(() => {
        // Check if all required fields are filled
        const allFieldsFilled = Object.values(formData).every(field => field !== '');
        setIsFormValid(allFieldsFilled);
        // const stripePromise = loadStripe("pk_test_51QTr4XCvDfiAtSX2DE0OBCzpENlcxyjC7baCeWsZw5HuxLTdcohkoFlEfrnqCTPq2QlneeFn4bRIOOkssWxu4Gqc007zlz4J6c");
        // console.log("promise" + JSON.stringify(stripePromise));
    }, [formData]);

    const createOrder = async () => {
        if (!user) {
            console.error("User is not defined.");
            return;
        }
        try {
            let cartItems = JSON.stringify(cart, null, 2);
            const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;

            // Parse the cart items string back into an object
            let cartArray = JSON.parse(cartItems);
            console.log("priceDetails: " + JSON.stringify(parsedVendor?.priceDetails));

            cartArray = cartArray.map(item => {
                console.log("item: " + JSON.parse(JSON.stringify(item)));
                const priceDetail = parsedVendor?.priceDetails.find(price => price["item"] === item.productSpecification);
                console.log("pD: " + priceDetail);
                if (priceDetail) {
                  // Add the price to the item
                  item.quantity = priceDetail["uom"];
                  item.price = priceDetail.totalPrice;
                }
                return item;
              });

            cartItems = JSON.stringify(cartArray, null, 2);

            console.log("cartItems: " + cartItems);

            await sendOrder(user, randomNumber, cartItems, parsedVendor?.name);
            await sendEmail(user, randomNumber, cartItems, parsedVendor?.name);
            resetCart(user);
        } catch (error) {
            console.error("Error in createOrder:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            {/* Form steper */}
            <div className=""></div>
            <MarketStepper currentStep={3} />
            {/* Details */}
            <div className="flex flex-col lg:flex-row justify-between gap-5 xl:gap-10 w-full h-full px-4 md:px-7">
                {/* Order Details */}
                <div className="w-full lg:w-1/2 xl:w-[43%]">
                    <H2 className={'my-4 '}>Order Details</H2>
                    <div className="flex flex-col w-full border border-grey divide-y divide-grey rounded-md h-fit lg:h-[600px]">
                        <div className="flex justify-between items-start p-3">
                            <H4 className={'!text-custom-black !font-semibold'}>Vendor</H4>
                            <div className="">
                                <H4 className={'!text-custom-black'}>{parsedVendor?.name}</H4>
                                <H4 className={'!text-custom-black'}>{parsedVendor?.location}</H4>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 ">
                            <H4 className={'!text-custom-black !font-semibold'}>Estimated Delivery Date</H4>
                            <H4 className={'!text-custom-black'}>{String(currentDate.getMonth() + 1).padStart(2, '0')}-{String(currentDate.getDate()).padStart(2, '0')}-{currentDate.getFullYear()}</H4>
                        </div>
                        <div className='px-3 pt-2 pb-8 sm:pb-10 lg:pb-56'>
                            <H4 className={' !font-semibold pt-2'}> Price Details</H4>
                            <div className="flex flex-col gap-2 py-4">
                                {
                                    parsedVendor?.priceDetails?.map((item, index) => (
                                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between w-full items-start sm:items-center ">
                                            <div className="">
                                                <H5>{item?.item}</H5>
                                            </div>
                                            <div className="flex gap-5 sm:gap-10 lg:gap-10 xl:gap-20 grow justify-end">
                                                <div className="flex gap-3 sm:gap-5 xl:gap-10">
                                                    <H5 className={'   !font-normal'}>x{item?.quantity}</H5>
                                                    <H5 className={'   !font-normal'}>{item?.uom}</H5>
                                                </div>
                                                <div className="flex gap-3 sm:gap-5 xl:gap-10">
                                                    <H5 className={'    !font-normal'}>${item?.unitPrice.toFixed(2)}/{item?.uom}</H5>
                                                    <H5 className={'  !font-normal'}>${item?.totalPrice.toFixed(2)}</H5>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex items-end justify-between h-full p-3 w-full ">
                            <H5>Total Price</H5>
                            <H5 className={'!font-semibold'}>${parsedVendor?.price.toFixed(2)}</H5>
                        </div>
                    </div>
                </div>
                {/* Payment Details */}
                <div className="w-full lg:w-1/2 xl:w-[54%]">
                    <H2 className={'my-4 '}>Payment Details</H2>
                    <div className="w-full border border-grey rounded-md h-[880px] md:h-[700px] lg:h-[600px] overflow-y-auto">
                        <H4 className={'!text-custom-black !font-semibold p-3'}>Shipping Address</H4>
                        <div className="flex flex-col gap-2 md:gap-10 px-3 border-b border-grey pb-3">
                            <div className="flex flex-col gap-2 flex-wrap justify-between gap-2 w-full">
                                <TailwindInput
                                    type={'text'}
                                    label={'Full Name'}
                                    required={true}
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full md:max-w-xs min-w-full"
                                />
                                <TailwindInput
                                    type={'text'}
                                    label={'Address'}
                                    required={true}
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full md:max-w-xs min-w-full"
                                />
                                <TailwindInput
                                    type="text"
                                    label="City"
                                    required={true}
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full md:max-w-xs min-w-full"
                                />
                                <div className="flex flex-col md:flex-row gap-2 w-full">
                                    <TailwindSelect className="flex-1 md:max-w-xs min-w-0" />
                                    <TailwindInput
                                        type="text"
                                        label="Zip Code"
                                        required={true}
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className="flex-1 md:max-w-xs min-w-0"
                                    />
                                </div>
                            </div>
                        </div>
                        <H4 className={'!text-custom-black !font-semibold p-3'}>Payment Method</H4>
                        <div className="flex flex-col md:flex-row gap-2">
                            <TailwindInput
                                type={'text'}
                                label={'Card Holder Name'}
                                required={true}
                                name="cardHolderName"
                                value={formData.cardHolderName}
                                onChange={handleInputChange}
                                className="flex-1 md:basis-1/2 md:max-w-[100%]"
                                autoComplete="cc-name"
                            />
                            <TailwindInput
                                type="text"
                                label="Credit Card Number"
                                required={true}
                                name="creditCardNumber"
                                value={formData.creditCardNumber}
                                onChange={handleInputChange}
                                className="flex-1 md:basis-1/2 md:max-w-[100%]"
                                autoComplete="cc-number"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row md:max-w-full gap-2">
                            <TailwindInput
                                type="text"
                                label="Exp Date"
                                required={true}
                                name="expDate"
                                value={formData.expDate}
                                onChange={handleInputChange}
                                className="flex-1 md:basis-1/4 md:max-w-[50%]"
                                autoComplete="cc-exp"
                            />
                            <TailwindInput
                                type="text"
                                label="CVC"
                                required={true}
                                name="cvc"
                                value={formData.cvc}
                                onChange={handleInputChange}
                                className="flex-1 md:basis-1/4 md:max-w-[50%]"
                                autoComplete="cc-csc"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* buttons */}
            <div className="flex justify-between my-4 px-4 md:px-7">
                <Link to="/market/ingredientmarketplace">
                    <OutlineButton>Cancel</OutlineButton>
                </Link>
                <div className="flex items-center gap-3 ">
                    <Link to="/market/vendorselection">
                        <FillButton> Previous</FillButton>
                    </Link>
                            {
                            isFormValid ? (
                                <Link to="/market/orderconfirmation">
                        {
                                <SolidButton onClick={createOrder}>Continue</SolidButton>
                        }
                                            </Link>

                            ) : (
                                <SolidButton className={`!bg-grey opacity-30 !text-gray-700 border-2 border-gray-500 cursor-not-allowed`}>Complete the Form</SolidButton>
                            )
}
                </div>
            </div>
        </div>
    )
}

export default CheckOuts;
