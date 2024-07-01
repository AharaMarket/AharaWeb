// CartModal.jsx
import React from 'react';
import './CartModal.css';

function CartModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-close" onClick={onClose}>&times;</div>
                <h2>Cart Details</h2>
                <p>Items in your cart will appear here.</p>
            </div>
        </div>
    );
}

export default CartModal;
