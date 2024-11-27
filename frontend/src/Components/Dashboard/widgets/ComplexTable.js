import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

// Custom components
import Card from "../card/Card";
import Menu from "../menu/MainMenu";
import OrderDetails from "../../Orders/OrderDetails";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableContainerRef = useRef(null);
  const [pageSize, setPageSize] = useState(10);
  const [expandedRows, setExpandedRows] = useState({}); // Track expanded rows by their IDs

  const parsedTableData = JSON.parse(JSON.stringify(tableData, 2));


  // Update pageSize based on container height and row height
  useEffect(() => {
    const updatePageSize = () => {
      if (tableContainerRef.current) {
        const containerHeight = tableContainerRef.current.offsetHeight;
        const estimatedRowHeight = 48; // Set to your row's approximate height in pixels

        // Calculate how many rows fit in the container
        const rowsPerPage = Math.floor(containerHeight / estimatedRowHeight);
        setPageSize(5); // Default to 10 if calculation fails
      }
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize); // Recalculate on resize

    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId], // Toggle the expanded state for the clicked row
    }));
  };

  return (
    <Card
      ref={tableContainerRef}
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px='25px' justify='space-between' mb='10px' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
          Order History
        </Text>
        <Menu />
      </Flex>

      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex justify='space-between' align='center' fontSize={{ sm: "10px", lg: "12px" }} color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
              {/* Add a new header for the details arrow */}
              <Th borderColor={borderColor}>
                <Text color='gray.400' fontSize='sm'>Details</Text>
              </Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            const isExpanded = expandedRows[row.id]; // Check if the row is expanded

            return (
              <>
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "NAME") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "STATUS") {
                      data = (
                        <Flex align='center'>
                          <Icon
                            w='24px'
                            h='24px'
                            me='5px'
                            color={
                              cell.value === "Approved"
                                ? "green.500"
                                : cell.value === "Disable"
                                ? "red.500"
                                : cell.value === "Error"
                                ? "orange.500"
                                : null
                            }
                            as={
                              cell.value === "Approved"
                                ? MdCheckCircle
                                : cell.value === "Disable"
                                ? MdCancel
                                : cell.value === "Error"
                                ? MdOutlineError
                                : null
                            }
                          />
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = (
                        <Flex align='center'>
                          <Progress variant='table' colorScheme='brandScheme' h='8px' w='108px' value={cell.value} />
                        </Flex>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        maxH='30px !important'
                        py='8px'
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'
                      >
                        {data}
                      </Td>
                    );
                  })}
                  {/* Add a column for the details arrow */}
                  <Td borderColor='transparent'>
                    <Icon
                      as={isExpanded ? MdKeyboardArrowUp : MdKeyboardArrowDown}
                      w='24px'
                      h='24px'
                      onClick={() => toggleRowExpansion(row.id)} // Toggle row expansion on click
                      cursor='pointer'
                      color='gray.500'
                    />
                  </Td>
                </Tr>

                {/* Render row details if the row is expanded */}
                {isExpanded && (
                  <Tr>
                    <Td colSpan={columns.length + 1} borderColor={borderColor}>
                      <OrderDetails
                        orderName={row.original.NAME} // Pass order name
                        orderData={JSON.parse(JSON.stringify(row.original, null, 2))}  // Pass the row's original data (order data)
                        isOpen={isExpanded}
                        onToggle={() => toggleRowExpansion(row.id)}
                        textColor={textColor}
                      />
                    </Td>
                  </Tr>
                )}
              </>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
