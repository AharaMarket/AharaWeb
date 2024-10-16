// VendorContext.js
import React, { createContext, useContext, useState } from 'react';

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
    const [selectedVendor, setSelectedVendor] = useState(null);

    return (
        <VendorContext.Provider value={{ selectedVendor, setSelectedVendor }}>
            {children}
        </VendorContext.Provider>
    );
};

export const useVendor = () => useContext(VendorContext);
