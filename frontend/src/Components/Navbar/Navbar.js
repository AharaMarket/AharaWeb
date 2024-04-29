import React from 'react'
import './Navbar.css'
import { Link, useLocation} from 'react-router-dom'
import MarketNavbar from '../MarketComponents/MarketNavbar/MarketNavbar'
import logo from '../Assets/samplelogo.png'
import cart from '../Assets/cart.png'
const Navbar = () => {


  const location = useLocation();
  console.log(location.pathname);

  if (location.pathname.startsWith('/market')) {
    return(
        <MarketNavbar/>
    )
  }

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                {/* <img className = "logo" src = {logo} alt = ""></img> */}
                <h3><Link className = "home-link" to= "/">Ahara</Link></h3>
            </div>
            <ul className='nav-menu'>
                <li><Link className = 'navbar-link' to= '/about'>About</Link></li>
                <li><Link className = 'navbar-link' to= '/market'>Market</Link></li>
                <li><Link className = 'navbar-link' to= '/contact'>Contact</Link></li>
            </ul>
        </div>
    )
}

export default Navbar

