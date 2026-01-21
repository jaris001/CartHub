import '../styles/Header.css'
import { FaShoppingCart, FaSearch } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { FaHamburger } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../features/cart/cartSlice'
import { InputContext } from '../context/InputContext'
import { useContext } from 'react'


const Header = () => {

  const [showNav, setShowNav] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const { input, handleInput } = useContext(InputContext);

  useEffect(() => {
    if (showNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showNav]);
  return (
    <header>
      {showNav && <div className="overlay" onClick={() => setShowNav(false)} />}
      <div className='hamburger-container'>
        <FaHamburger className='hamburger'
          onClick={() => setShowNav(!showNav)}
          size={30} />
        <div className={`side-nav ${showNav ? 'show' : ''}`} >
          <div className='nav-links'>
            <NavLink
              onClick={() => setShowNav(false)}
              className={({ isActive }) => isActive ? 'active' : ''} to="/">
              Home
            </NavLink>
            <NavLink
              onClick={() => setShowNav(false)}
              className={({ isActive }) => isActive ? 'active' : ''} to="/orders">
              Orders
            </NavLink>
            <NavLink
              onClick={() => setShowNav(false)}
              className={({ isActive }) => isActive ? 'active' : ''} to="/cart">
              Cart
            </NavLink>
          </div>
        </div>
      </div>

      <div className='left-section'>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/">
          Logo
        </NavLink>
      </div>
      <div className='center-section'>
        <input type="text" placeholder='Search' value={input} onChange={handleInput} />
        <FaSearch size={30} />
      </div>
      <div className='right-section'>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/checkout">
          Checkout
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/orders">
          Orders
        </NavLink>
        <div className={`cart ${cartItems.length > 0 ? 'active' : ''}`}>
          <p>{cartItems.length}</p>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/cart">
            <FaShoppingCart size={30} />
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header