import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import MarketNavbar from './Components/MarketComponents/MarketNavbar/MarketNavbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Market from './Pages/IngredientMarketplace/IngredientMarketplace';
import Login from './Pages/Login/Login';
import Contact from './Pages/Contact/Contact';
import Ranking from './Pages/VendorSelection/VendorSelection';
import Orders from './Pages/Orders/Orders';
import SmoothScroll from "smooth-scroll";
import {
  BrowserRouter, Routes, Route, useLocation, HashRouter, Navigate
} from 'react-router-dom';
import Dashboard from './Pages/RestaurantDashboard/RestaurantDashboard';
import OrderConfirmation from './Pages/OrderConfirmation/OrderConfirmation';
import ImportOrder from './Pages/ImportOrder/ImportOrder';
import AdminLayout from './Layouts/admin';
import AppAppBar from './Components/HomeComponents/AppAppBar.js';

import RtlLayout from './Layouts/rtl';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App() {
  return (
      <div>
        {/* <Layout> */}
        <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/market/*" element={<MarketRoutes />} />
            <Route path={"/dashboard/*"} element={<DashboardRoutes />} />
          </Routes>
          </Layout>
          </BrowserRouter>

      </div>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const isMarketRoute = location.pathname.startsWith('/market');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {(isMarketRoute || isDashboardRoute) ? <MarketNavbar /> : <AppAppBar />}
      {children}
      <Footer />
    </>
  );
}

function MarketRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="ingredientmarketplace" element={<Market />} />
      <Route path="vendorselection" element={<Ranking />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="orderconfirmation" element={<OrderConfirmation />} />
      <Route path="orders" element={<Orders />} />
      <Route path="login" element={<Login />} />
      <Route path="importorder" element={<ImportOrder />} />
    </Routes>
  );
}

function DashboardRoutes() {
  return (
    // <HashRouter>
      <Routes>
        {/* <Route path={`/auth`} component={AuthLayout} /> */}
        <Route path={"/admin"} component={AdminLayout} />
        <Route pth={"/rtl"} component={RtlLayout} />
        {/* <Navigate from='/' to='/admin' /> */}
      </Routes>
      // </HashRouter>
  );
}

export default App;
