import React, { useState } from 'react';
import CartModal from '../CartModal/CartModal';
import { Box, Button, Text } from '@chakra-ui/react';
import { BsFillBagFill } from "react-icons/bs";


function AddCartButton() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <Box onClick={openModal} borderWidth="1px" borderRadius="md" borderColor="#5667FF" overflow="hidden">
                <Button
                    variant="solid"
                    colorScheme="purple"
                    bg="#5667FF"
                    boxShadow="md"
                    p={4}
                    textAlign="center"
                    cursor="pointer"
                    _hover={{ bg: '#4554D8' }}  // Darken the hover color if needed
                >
                    <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <Text ml={2} fontWeight="bold" fontSize="lg" color="white">
                        Add to Cart <BsFillBagFill className="bag-icon" />
                    </Text>
                    {/* <BsFillBagFill className="bag-icon" /> */}
                </Button>
            </Box>
            <CartModal isOpen={isOpen} onClose={closeModal} />
        </>
    );
}

export default AddCartButton;
