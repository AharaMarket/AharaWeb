import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  VStack,
  SimpleGrid
} from "@chakra-ui/react";
import ComplexTable from "../../Components/Dashboard/widgets/PastOrders.js";
import {
    columnsDataCheck,
    columnsDataComplex,
  } from "../../Components/Dashboard/data/columnsData";
import tableDataComplex from "../../Components/Dashboard/data/tableDataComplex.json";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../theme/theme";
import { OrderContext } from '../../Context/Order/OrderContext';
import { CartContext } from '../../Context/Cart/CartContext';
import { UserContext } from '../../Context/User/UserContext';
import { format } from "prettier";

const Orders = () => {
  const { getOrders } = useContext(OrderContext);
  const { fetchCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]); // Local state for orders

  useEffect(() => {
    const fetchData = async () => {
      console.log("orders: " + orders);
      if (user && (!orders || orders.length === 0)) {
        try {
          // Wait for both fetchCart and getOrders to complete
          await fetchCart(user);
          const fetchedOrders = await getOrders(user);

          console.log("fetched Orders:" + fetchedOrders);
          const processedOrders = Array.from(fetchedOrders.values()).map(order => {
            const predate = order.date.split("T0")[0];
            const date = new Date(predate);

            const dtime = new Date(order.date);

            const options = { 
              timeZone: 'America/Los_Angeles', 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit', 
              hour12: false 
            };

            const pstTime = dtime.toLocaleTimeString('en-US', options);

            // Get the month, day, and year
            const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
            const day = date.getDate();

            const year = date.getFullYear();
            // Format the date as MM/DD/YYYY
            const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

            return {
              name: "Order #" + String(order.orderId),
              date: formattedDate + " " + pstTime,
              items: order.items,
              status: order.orderStatus,
              progress: String(Math.floor(Math.random() * 100) + 1),
              vendorName: order.vendorName
            };
          });

          // Update state with processed orders
          setOrders(processedOrders);
          
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    };
    fetchData(); 
  });

  return (
    <ChakraProvider theme={theme}>
      <React.StrictMode>
    <Box>
      {orders.length != 0 ? 
      <SimpleGrid
                  columns={{ base: 1, md: 2, xl: 1 }}
                  gap="20px"
                  mb="20px"
                  p="20px"
                >
                  <ComplexTable
                    columnsData={columnsDataComplex}
                    tableData={orders}
                  />
                </SimpleGrid>
        :
        <p>Loading orders...</p>
      }

    </Box>
    </React.StrictMode>
    </ChakraProvider>
  );
};

export default Orders;

