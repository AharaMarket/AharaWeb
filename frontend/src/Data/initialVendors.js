import Image from '../Components/Assets/image.png'
 
 export const initialVendors = [
    {
        id: '1',
        img: Image,
        name: 'Vendor 1',
        price: 79,
        deliveryTime: 'Same Day Delivery',
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
        price: 250.4,
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
        price: 170,
        deliveryTime: '3 Days - 7 Days',
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
        price: 10,
        deliveryTime: '7 Days - 10 Days',
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
