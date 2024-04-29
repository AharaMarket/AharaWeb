import React, { useState } from 'react';
import CartModal from '../CartModal/CartModal';
import './CartButton.css'

function CartButton() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <button onClick={openModal} className="cart-button">
                <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="9" cy="21" r="1"></circle> <circle cx="20" cy="21" r="1"></circle> <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path> </svg>
                Cart
            </button>
            <CartModal isOpen={isOpen} onClose={closeModal} />
        </>
    );
}

export default CartButton;