import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar.js";
import MarketNavbar from "./Components/MarketComponents/MarketNavbar/MarketNavbar.jsx";
import Footer from "./Components/Footer/Footer.js";
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import Market from "./Pages/IngredientMarketplace/IngredientMarketplace.jsx";
import Login from "./Pages/Login/Login.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Ranking from "./Pages/VendorSelection/VendorSelection.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import SmoothScroll from "smooth-scroll";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  HashRouter,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/RestaurantDashboard/RestaurantDashboard.jsx";
import OrderConfirmation from "./Pages/OrderConfirmation/OrderConfirmation.jsx";
import ImportOrder from "./Pages/ImportOrder/ImportOrder.jsx";
import AdminLayout from "./Layouts/admin/index.js";
import AppAppBar from "./Components/HomeComponents/AppAppBar.js";

import RtlLayout from "./Layouts/rtl/index.js";

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
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
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

  return (
    <>

      {(isDashboardRoute) ? <MarketNavbar /> : null}
      {children}
      {!["/market", "/market/"].includes(window.location.pathname) && (
        <Footer />
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
      <Route index element={<Dashboard />} />
      {/* <Navigate from='/' to='/admin' /> */}
    </Routes>
    // </HashRouter>
  );
}

export default App;
