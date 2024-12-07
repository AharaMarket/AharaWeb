// RowDetails.js
import React from "react";
import { Box, Flex, Text, Collapse, Icon, List, ListItem } from "@chakra-ui/react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const OrderDetails = ({orderData, isOpen, onToggle, textColor }) => {

    console.log("orderData: " + JSON.stringify(orderData, null, 2));
    const {name} = orderData;
    const {items} = orderData;
    console.log("name" + name);

    console.log("orderData" + orderData);
    console.log("items" + items);
  return (
    <Box>
      {/* Collapse Section for Row Items */}
      <Collapse in={isOpen}>
        <Box p="20px" bg="gray.50" borderRadius="md" boxShadow="sm">
          <List spacing={3}>
            {JSON.parse(items).map((item, index) => (
              <ListItem key={index} p="10px" bg="white" borderRadius="md" boxShadow="sm">
                <Flex justify="space-between">
                  <Text color={textColor} fontSize="sm">
                    <strong>{item.productSpecification}</strong>
                  </Text>
                </Flex>
                <Text color={textColor} fontSize="sm" mt="2px">
                  Quantity: {item.quantity} {item.unit}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      </Collapse>
    </Box>
  );
};

export default OrderDetails;
