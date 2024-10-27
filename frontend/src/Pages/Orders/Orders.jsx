import React from "react";
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


const pastOrders = [
  {
    id: "12345",
    date: "2024-10-01",
    items: ["Item A", "Item B", "Item C"],
    status: "Delivered",
  },
  {
    id: "12346",
    date: "2024-09-15",
    items: ["Item D", "Item E"],
    status: "Pending",
  },
  {
    id: "12347",
    date: "2024-08-20",
    items: ["Item F"],
    status: "Cancelled",
  },
];

const Orders = () => {
  return (
    <ChakraProvider theme={theme}>
      <React.StrictMode>
    <Box>
      <SimpleGrid
                  columns={{ base: 1, md: 2, xl: 1 }}
                  gap="20px"
                  mb="20px"
                  p="20px"
                >
                  <ComplexTable
                    columnsData={columnsDataComplex}
                    tableData={tableDataComplex}
                  />
                </SimpleGrid>
    </Box>
    </React.StrictMode>
    </ChakraProvider>
  );
};

export default Orders;

