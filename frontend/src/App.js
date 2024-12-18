// src/App.js
import React from "react";
import "./App.css";
import MarketNavbar from "./Components/MarketComponents/MarketNavbar/MarketNavbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Market from "./Pages/IngredientMarketplace/IngredientMarketplace";
import ProductDetail from './Pages/ProductDetails/ProductDetail';
import Login from "./Pages/Login/Login";
import Account from "./Pages/Account/Account";
import Contact from "./Pages/Contact/Contact";
import VendorSelection from "./Pages/VendorSelection/VendorSelection";
import Orders from "./Pages/Orders/Orders";
import CheckOuts from "./Pages/OrderCheckOut/index.jsx";
import OrderDetail from "./Pages/OrderDetails/OrderDetail";
import Register from "./Pages/Registration/Register";
import RestaurantRegistration from "./Pages/Registration/RestaurantRegistration/RestaurantRegistration";
import DistributorRegistration from "./Pages/Registration/DistributorRegistration/DistributorRegistration";
import Cart from './Pages/Cart/Cart'
import { UserProvider } from './Context/User/UserContext';
import { CartProvider } from './Context/Cart/CartContext';
import { OrderProvider } from './Context/Order/OrderContext';
import { EmailProvider } from './Context/Email/EmailContext';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Pages/RestaurantDashboard/RestaurantDashboard";
import OrderConfirmation from "./Pages/OrderConfirmation/OrderConfirmation";
import ImportOrders from "./Pages/ImportOrders/ImportOrders";
import Header from "./Components/Vendor/Header/index.jsx";
import ProtectedRoute from './Context/User/ProtectedRoute';
import { VendorProvider } from "./Context/Vendor/VendorContext";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <OrderProvider>
          <VendorProvider>
            <EmailProvider>
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/market/*" element={<MarketRoutes />} />
                    <Route path="/dashboard/*" element={<DashboardRoutes />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </EmailProvider>
          </VendorProvider>
        </OrderProvider>
      </CartProvider>
    </UserProvider>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const isMarketRoute = location.pathname.startsWith("/market");
  const vendorselection = location.pathname.startsWith('/vendorselection');
  const orderPlace = location.pathname.startsWith('/orderPlace');
  const checkOut = location.pathname.startsWith('/checkout');
  return (
    <>
      {isMarketRoute ? <MarketNavbar /> : vendorselection || orderPlace || checkOut ? <Header /> : null}
      {children}
      {!["/market", "/market/"].includes(window.location.pathname) && (
        vendorselection || orderPlace || checkOut ? null : null
      )}
    </>
  );
}

function MarketRoutes() {
  return (
    <Routes>
      <Route index element={<ProtectedRoute element={Dashboard} />} />
      <Route path="ingredientmarketplace" element={<ProtectedRoute element={Market} />} />
      <Route path="vendorselection" element={<ProtectedRoute element={VendorSelection} />} />
      <Route path="dashboard" element={<ProtectedRoute element={Dashboard} />} />
      <Route path="orderconfirmation" element={<ProtectedRoute element={OrderConfirmation} />} />
      <Route path="ordercheckout" element={<ProtectedRoute element={CheckOuts} />} />
      <Route path="orders" element={<ProtectedRoute element={Orders} />} />
      <Route path="orderdetails" element={<ProtectedRoute element={OrderDetail} /> } />
      <Route path="productdetails" element={<ProtectedRoute element={ProductDetail} />} />
      <Route path="login" element={<Login />} />
      <Route path="account" element={<Account />} />
      <Route path="importorders" element={<ProtectedRoute element={ImportOrders} />} />
      <Route path="cart" element={<Cart />} />
      <Route path="register" element={<Register />} />
      <Route path="restaurant-registration" element={<RestaurantRegistration />} />
      <Route path="distributor-registration" element={<DistributorRegistration />} />
    </Routes>
  );
}

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
    </Routes>
  );
}

export default App;
