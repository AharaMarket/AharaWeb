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
// import AppAppBar from './Components/HomeComponents/AppAppBar';
import {
  BrowserRouter, Switch, Route, useLocation, HashRouter, Redirect
} from 'react-router-dom';
import ReactDOM from 'react-dom';
// import AuthLayout from './Layouts/auth';
import AdminLayout from './Layouts/admin';
// import RtlLayout from './Layouts/rtl';
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
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/market/*" element={<MarketRoutes />} />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
          </Switch>
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
      <MarketNavbar /> 
      {children}
      <Footer />
    </>
  );
}

function MarketRoutes() {
  return (
    <Switch>
      <Route index element={<Dashboard />} />
      <Route path="ingredientmarketplace" element={<Market />} />
      <Route path="vendorselection" element={<Ranking />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="orderconfirmation" element={<OrderConfirmation />} />
      <Route path="orders" element={<Orders />} />
      <Route path="login" element={<Login />} />
      <Route path="importorder" element={<ImportOrder />} />
    </Switch>
  );
}

function DashboardRoutes() {
  return (
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <HashRouter>
            <Switch>
              {/* <Route path={`/auth`} component={AuthLayout} /> */}
              <Route path={`/admin`} component={AdminLayout} />
  						{/* <Route path={`/rtl`} component={RtlLayout} /> */}
              <Redirect from='/' to='/admin' />
            </Switch>
          </HashRouter>
        </ThemeEditorProvider>
      </React.StrictMode>
    </ChakraProvider>
  );
}

export default App;
