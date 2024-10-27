// VendorContext.js
import React, { createContext, useContext, useState } from 'react';

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
    const [selectedVendor, setSelectedVendor] = useState(null);

    // const fetchVendors = async (products) => {
    //     try {
    //         const response = await fetch('http://localhost:5050/vendorselection', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({ products: cartData }),
    //         });
    
    //         if (!response.ok) {
    //           throw new Error('Failed to fetch vendor data');
    //         }
    //     }
    //     catch (err) {
    //         setError(err.message);
    //         }
    //   };

    return (
        <VendorContext.Provider value={{ selectedVendor, setSelectedVendor }}>
            {children}
        </VendorContext.Provider>
    );
};

export const useVendor = () => useContext(VendorContext);
