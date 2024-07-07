import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import MarketNavbar from "./Components/MarketComponents/MarketNavbar/MarketNavbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Market from "./Pages/IngredientMarketplace/IngredientMarketplace";
import Login from "./Pages/Login/Login";
import Contact from "./Pages/Contact/Contact";
import Ranking from "./Pages/VendorSelection/VendorSelection";
import Orders from "./Pages/Orders/Orders";
import CheckOuts from "./Pages/OrderCheckOut/index.jsx";
import Register from "./Pages/Registration/Register"
import RestaurantRegistration from "./Pages/Registration/RestaurantRegistration/RestaurantRegistration"
import DistributorRegistration from "./Pages/Registration/DistributorRegistration/DistributorRegistration"

import SmoothScroll from "smooth-scroll";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  HashRouter,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/RestaurantDashboard/RestaurantDashboard";
import OrderConfirmation from "./Pages/OrderConfirmation/OrderConfirmation";
import ImportOrder from "./Pages/ImportOrder/ImportOrder";
import AdminLayout from "./Layouts/admin";
import AppAppBar from "./Components/HomeComponents/AppAppBar.jsx";

import RtlLayout from "./Layouts/rtl";
import Header from "./Components/Vendor/Header/index.jsx";

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
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/market/*" element={<MarketRoutes />} />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />

            {/* <Route path="/ingredientMarketplace2" element={<IngredientMarketPlace2 />} /> */}
            {/* <Route path="/checkout" element={<CheckOuts />} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const isMarketRoute = location.pathname.startsWith("/market");
  const isDashboardRoute = location.pathname.endsWith("/ingredientmarketplace");
  const ingredientMarketplace2 = location.pathname.startsWith('/ingredientMarketplace2')
  const orderPlace = location.pathname.startsWith('/orderPlace')
  const checkOut = location.pathname.startsWith('/checkout')
  return (
    <>

      {(isMarketRoute) ? <MarketNavbar /> : ingredientMarketplace2 || orderPlace || checkOut ? <Header /> : null}
      {children}
      {!["/market", "/market/"].includes(window.location.pathname) && (
        ingredientMarketplace2 || orderPlace || checkOut ? null : <Footer />
      )}
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
      <Route path="ingredientmarketplace/:id" element={<ProductDetail /> } />
      <Route path="ordercheckout" element={<CheckOuts />} />
      <Route path="orders" element={<Orders />} />
      <Route path="login" element={<Login />} />
      <Route path="importorder" element={<ImportOrder />} />
      <Route path="register" element={<Register />} />
      <Route path="restaurant-registration" element={<RestaurantRegistration />} />
      <Route path="distributor-registration" element={<DistributorRegistration />} />



    </Routes>
  );
}

function DashboardRoutes() {
  return (
    // <HashRouter>
    <Routes>
      {/* <Route path={`/auth`} component={AuthLayout} /> */}
      <Route index element={<Dashboard />} />
      {/* <Navigate from='/' to='/admin' /> */}
    </Routes>
    // </HashRouter>
  );
}

export default App;
