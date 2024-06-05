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
import Dashboard from './Pages/Dashboard/Dashboard';
import OrderConfirmation from './Pages/OrderConfirmation/OrderConfirmation';
import ImportOrder from './Pages/ImportOrder/ImportOrder';
import AppAppBar from './Components/HomeComponents/AppAppBar';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Routes, Route, useLocation, HashRouter
} from 'react-router-dom';
import Redirect from 'react-router-dom';
import 'assets/css/App.css';
// import AuthLayout from './Layouts/auth';
import AdminLayout from './Layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App() {
  return (
    <BrowserRouter>
      <div>
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
      </div>
    </BrowserRouter>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const isMarketRoute = location.pathname.startsWith('/market');

  return (
    <>
      {isMarketRoute ? <MarketNavbar /> : <AppAppBar />}
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
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <HashRouter>
            <Routes>
              {/* <Route path={`/auth`} component={AuthLayout} /> */}
              <Route path={`/admin`} component={AdminLayout} />
              <Redirect from='/' to='/admin' />
            </Routes>
          </HashRouter>
        </ThemeEditorProvider>
      </React.StrictMode>
    </ChakraProvider>
  );
}

export default App;
