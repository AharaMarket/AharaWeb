import React, { useState } from 'react';
import CartModal from '../Cart/CartModal/CartModal';
import { Box, Button, Text } from '@chakra-ui/react';
import { BsFillBagFill } from "react-icons/bs";
import { Link } from 'react-router-dom';


function ContinueButton() {

    return (
        <>
            <Box borderWidth="1px" borderRadius="md" borderColor="#5667FF" overflow="hidden">
                <Link to="/market/vendorselection">
                <Button
                    variant="solid"
                    colorScheme="purple"
                    bg="#5667FF"
                    boxShadow="md"
                    p={4}
                    textAlign="center"
                    padding="10px 20px"
                    border-radius= "5px"
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    cursor="pointer"
                    _hover={{ bg: '#4554D8' }}  // Darken the hover color if needed
                >
                    <Text ml={2} fontWeight="bold" fontSize="lg" color="white">
                        Continue
                    </Text>
                    {/* <BsFillBagFill className="bag-icon" /> */}
                </Button>
                </Link>
            </Box>
        </>
    );
}

export default ContinueButton;
