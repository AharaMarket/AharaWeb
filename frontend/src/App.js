import './App.css';
import  Navbar  from './Components/Navbar/Navbar';
import  MarketNavbar  from './Components/MarketComponents/MarketNavbar/MarketNavbar';
import  Footer  from './Components/Footer/Footer';
import  Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Market from './Pages/Market/Market';
import Login from './Pages/Login/Login';
import Contact from './Pages/Contact/Contact';
import Ranking from './Pages/Recommendations/Recommendations';


import {BrowserRouter, Router, Routes, Route, useLocation} from 'react-router-dom'
function App() {


  // const header = location.pathname === "/market" ? <MarketNavbar /> : <Navbar />;

  return (

    
    <div >
      <BrowserRouter>
      
      {/* {header} */}

      <Navbar></Navbar>
      <Routes>
        <Route path = '/' element={<Home/>}></Route>
        <Route path = '/home' element={<Home/>}></Route>
        <Route path = '/market' element={<Market/>}></Route>
        <Route path = '/about' element={<About/>}></Route>
        <Route path = '/login' element={<Login/>}></Route>
        <Route path = '/contact' element={<Contact/>}></Route>
        <Route path = '/ranking' element={<Ranking/>}></Route>

      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
