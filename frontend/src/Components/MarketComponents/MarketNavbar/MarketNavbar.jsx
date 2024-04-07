import React from 'react'
import logo from '../../Assets/samplelogo.png'
import cart from '../../Assets/cart.png'
import Searchbar from '../Searchbar/Searchbar'
import { Link, useLocation} from 'react-router-dom'
import './MarketNavbar.css'

function MarketNavbar() {
    return (
        <div>
        <div className='navbar'>
        <h3><Link className = "home-link" to= "/">Ahara</Link></h3>

            <ul className='nav-menu'>
                <li><Link className = 'navbar-link' to= '/about'>About</Link></li>
                <li><Link className = 'navbar-link' to= '/market'>Market</Link></li>
                <li><Link className = 'navbar-link' to= '/contact'>Contact</Link></li>
            </ul>
            <Searchbar></Searchbar>

           <div className="nav-login-cart">
            <button>Login</button>
            <Link to="/ranking" className="cart-link">
            <img className="cart" src={cart}></img>
            </Link>
            <div className="cart-count">0</div>
            </div>
            </div>
        </div>
    )
}

export default MarketNavbar
