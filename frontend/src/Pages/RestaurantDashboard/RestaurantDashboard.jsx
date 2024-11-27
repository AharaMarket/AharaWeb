/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
// Assets
import Usa from "../../Components/Assets/usa.png";
import axios from 'axios';
import MiniCalendar from "../../Components/Dashboard/calendar/MiniCalendar.js";
import MiniStatistics from "../../Components/Dashboard/card/MiniStatistics.js";
import IconBox from "../../Components/Dashboard/icons/IconBox.js";
import React, { useState, useEffect, useContext } from 'react';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "../../Components/Dashboard/widgets/CheckTable.js";
import ComplexTable from "../../Components/Dashboard/widgets/ComplexTable.js";
import DailyTraffic from "../../Components/Dashboard/widgets/DailyTraffic.js";
import PieCard from "../../Components/Dashboard/widgets/PieCard.js";
import Tasks from "../../Components/Dashboard/widgets/Tasks.js";
import TotalSpent from "../../Components/Dashboard/widgets/TotalSpent.js";
import WeeklyRevenue from "../../Components/Dashboard/widgets/WeeklyRevenue.js";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "../../Components/Dashboard/data/columnsData";
import tableDataCheck from "../../Components/Dashboard/data/tableDataCheck.json";
import tableDataComplex from "../../Components/Dashboard/data/tableDataComplex.json";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import Sidebar from "../../Components/Dashboard/sidebar/Sidebar";
import routes from "../../routes.js";
import { SidebarContext } from "../../Context/SidebarContext";
import Navbar from "../../Components/Dashboard/navbar/NavbarAdmin";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../../Layouts/admin";
import Footer from "../../Components/Footer/Footer.js";
import { UserContext } from '../../Context/User/UserContext'; 
import { OrderContext } from '../../Context/Order/OrderContext';
import { CartContext } from '../../Context/Cart/CartContext';

export default function UserReports() {
  // Chakra Color Mode
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { onOpen } = useDisclosure();
  const { getOrders } = useContext(OrderContext);
  const { fetchCart } = useContext(CartContext);
  const [orders, setOrders] = useState([]); // Local state for orders


  const { user } = useContext(UserContext);

  // new state hooks
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [creditBalance, setCreditBalance] = useState(0);
  const [distributorPartners, setDistributorPartners] = useState(0);
  const [totalDishes, setTotalDishes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          console.log(user)
          const response = await axios.get(`http://localhost:5050/restaurants/dashboard?email=${encodeURIComponent(user)}`);
          console.log(response);
          const data = response.data.data;
          setTotalSaved(data.monthSaved);
          setTotalSpent(data.monthSpent);
          setTotalOrders(data.orders);
          setCreditBalance(data.creditBalance);
          setDistributorPartners(data.distributorPartners);
          setTotalDishes(data.totalDishes);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [user]);

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
            const pretime = order.date.split("T0")[1];
            const date = new Date(predate);

            // Get the month, day, and year
            const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
            const day = date.getDate();

            const year = date.getFullYear();
            // Format the date as MM/DD/YYYY
            const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

            return {
              name: "Order #" + String(order.orderId),
              date: formattedDate + " " + pretime.split(".")[0],
              items: order.items,
              status: order.orderStatus,
              progress: String(Math.floor(Math.random() * 100) + 1)
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


  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  };
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <Box>
          <Box>
            <SidebarContext.Provider
              value={
                {
                  // toggleSidebar,
                  // setToggleSidebar
                }
              }
            >
              {/* <Sidebar routes={routes} />
              <Box
              {/* <Sidebar routes={routes} /> */}
              {/* <Box
                float="right"
                minHeight="100vh"
                height="100%"
                overflow="auto"
                position="relative"
                maxHeight="100%"
                w={{ base: "100%", xl: "calc( 100% - 290px )" }}
                maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
                transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                transitionDuration=".2s, .2s, .35s"
                transitionProperty="top, bottom, width"
                transitionTimingFunction="linear, linear, ease"
              > */}
                <Portal>
                  <Box>
                    {/* <Navbar
                      onOpen={onOpen}
                      logoText={"Ahara PRO"}
                      brandText={getActiveRoute(routes)}
                      secondary={getActiveNavbar(routes)}
                      message={getActiveNavbarText(routes)}
                      fixed={fixed} */}
                    {/* // {...rest} */}
                    {/* /> */}
                  </Box>
                </Portal>
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
                  gap="20px"
                  mb="20px"
                  mt="60px"
                  p="20px"
                >
                  <MiniStatistics
                    startContent={
                      <IconBox
                        w="56px"
                        h="56px"
                        bg={boxBg}
                        icon={
                          <Icon
                            w="32px"
                            h="32px"
                            as={MdAttachMoney}
                            color={brandColor}
                          />
                        }
                      />
                    }
                    name="Total Saved This Month"
                    value={"$" + totalSaved}
                  />
                  <MiniStatistics
                    startContent={
                      <IconBox
                        w="56px"
                        h="56px"
                        bg={boxBg}
                        icon={
                          <Icon
                            w="32px"
                            h="32px"
                            as={MdAttachMoney}
                            color={brandColor}
                          />
                        }
                      />
                    }
                    name="Total Spend this month"
                    value={"$" + totalSpent}
                  />
                  <MiniStatistics
                    growth="+23%"
                    name="Total Orders"
                    value={totalOrders}
                  />
                  <MiniStatistics
                    endContent={
                      <Flex me="-16px" mt="10px">
                        <FormLabel htmlFor="balance">
                          <Avatar src={Usa} />
                        </FormLabel>
                        <Select
                          id="balance"
                          variant="mini"
                          mt="5px"
                          me="0px"
                          defaultValue="usd"
                        >
                          <option value="usd">USD</option>
                          <option value="eur">EUR</option>
                          <option value="gba">GBA</option>
                        </Select>
                      </Flex>
                    }
                    name="Credit balance"
                    value="$1,000"
                  />
                  <MiniStatistics
                    startContent={
                      <IconBox
                        w="56px"
                        h="56px"
                        bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                        icon={
                          <Icon
                            w="28px"
                            h="28px"
                            as={MdAddTask}
                            color="white"
                          />
                        }
                      />
                    }
                    name="Distributor Partners"
                    value={distributorPartners}
                  />
                  <MiniStatistics
                    startContent={
                      <IconBox
                        w="56px"
                        h="56px"
                        bg={boxBg}
                        icon={
                          <Icon
                            w="32px"
                            h="32px"
                            as={MdFileCopy}
                            color={brandColor}
                          />
                        }
                      />
                    }
                    name="Total Dishes"
                    value={totalDishes}
                  />
                </SimpleGrid>

                <SimpleGrid
                  columns={{ base: 1, md: 2, xl: 1 }}
                  gap="20px"
                  mb="20px"
                  p="20px"
                >
                  <TotalSpent />
                  <SimpleGrid columns={{ base: 1, md: 3, xl: 3 }} gap="20px">
                    {/* <DailyTraffic /> */}
                    <MiniCalendar h="100%" minW="100%" selectRange={false} />
                    <PieCard />
                    <WeeklyRevenue />
                  </SimpleGrid>
                  <ComplexTable
                    columnsData={columnsDataComplex}
                    tableData={orders}
                  />
                </SimpleGrid>
                <Box p="20px">
                  <Footer />
                </Box>
              {/* </Box> */}
            </SidebarContext.Provider>
          </Box>
        </Box>
      </React.StrictMode>
    </ChakraProvider>
  );
}

const getRoutes = (routes) => {
  return routes.map((prop, key) => {
    if (prop.layout === "/admin") {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    }
    if (prop.collapse) {
      return getRoutes(prop.items);
    }
    if (prop.category) {
      return getRoutes(prop.items);
    } else {
      return null;
    }
  });
};