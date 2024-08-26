import React from 'react';
import Vendors from '../../Components/Vendor/vendors';
import Image from '../../Components/Assets/image.png'
import MarketStepper from "../../Components/MarketComponents/MarketStepper/MarketStepper";


const IngredientMarketPlace2 = () => {
  const initialVendors = [
    {
      id: '1',
      img: Image,
      name: 'Vendor 1',
      price: 179.49,
      deliveryTime: '1 Week - 2 Weeks',
      deliveryDate: 'April 31, 2024',
      phone: '(123) 456-7890',
      location: 'Pleasanton, CA',
      recommended: true,
      fastest: false,
      priceDetails: [
        { item: 'Apple: Akane', quantity: 10, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Carrot: Mixed Variety', quantity: 25, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Cilantro', quantity: 5, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Yellow Onions', quantity: 15, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Zucchini', quantity: 10, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
      ]
    },
    {
      id: '2',
      img: Image,
      name: 'Vendor 2',
      price: 250.42,
      deliveryTime: '1 Day - 3 Days',
      deliveryDate: 'April 25, 2024',
      phone: '(123) 456-7890',
      location: 'Pleasanton, CA',
      recommended: false,
      fastest: true,
      priceDetails: [
        { item: 'Apple: Akane', quantity: 10, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Carrot: Mixed Variety', quantity: 25, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Cilantro', quantity: 5, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Yellow Onions', quantity: 15, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Zucchini', quantity: 10, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
      ]
    },
    {
      id: '3',
      img: Image,
      name: 'Vendor 3',
      price: 250.42,
      deliveryTime: '1 Day - 3 Days',
      deliveryDate: 'April 25, 2024',
      phone: '(123) 456-7890',
      location: 'Pleasanton, CA',
      recommended: false,
      fastest: false,
      priceDetails: [
        { item: 'Apple: Akane', quantity: 10, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Carrot: Mixed Variety', quantity: 25, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Cilantro', quantity: 5, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Yellow Onions', quantity: 15, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Zucchini', quantity: 10, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
      ]
    },
    {
      id: '4',
      img: Image,
      name: 'Vendor 4',
      price: 250.42,
      deliveryTime: '1 Day - 3 Days',
      deliveryDate: 'April 25, 2024',
      phone: '(123) 456-7890',
      location: 'Pleasanton, CA',
      recommended: false,
      fastest: false,
      priceDetails: [
        { item: 'Apple: Akane', quantity: 10, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Carrot: Mixed Variety', quantity: 25, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Cilantro', quantity: 5, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Yellow Onions', quantity: 15, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
        { item: 'Zucchini', quantity: 10, uom: 'UOM', unitPrice: 'XX.XX', totalPrice: 'XX.XX' },
      ]
    },
  ];

  return (
    <div className=''>

      <MarketStepper currentStep={2} />
      <Vendors initialVendors={initialVendors} />
    </div>
  )
}

export default IngredientMarketPlace2;
