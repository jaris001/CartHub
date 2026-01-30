import '../styles/Header.css'
import { FaShoppingCart, FaSearch, FaHamburger } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom' // Added useNavigate
import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux' // Added useDispatch
import { selectCartItems } from '../features/cart/cartSlice'
import { logout } from '../features/user/userSlice' // <--- IMPORT THIS
import { InputContext } from '../context/InputContext'
import { formatNumber } from '../utils/formatNumber'


const Header = () => {
  const [showNav, setShowNav] = useState(false);
  
  // 1. Get User State
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const { input, handleInput } = useContext(InputContext);

  // 2. Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    setShowNav(false); // Close mobile menu if open
    navigate('/login'); // Redirect to login page
  };

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
      
      {/* --- MOBILE MENU --- */}
      <div className='hamburger-container'>
        <FaHamburger className='hamburger'
          onClick={() => setShowNav(!showNav)}
          size={30} />
          
        <div className={`side-nav ${showNav ? 'show' : ''}`} >
          <div className='nav-links'>
            <NavLink onClick={() => setShowNav(false)} to="/">Home</NavLink>
            
            {/* Conditional Mobile Links */}
            {currentUser ? (
              <>
                <NavLink onClick={() => setShowNav(false)} to="/orders">Orders</NavLink>
                <button className="nav-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <NavLink onClick={() => setShowNav(false)} to="/login">Login</NavLink>
                <NavLink onClick={() => setShowNav(false)} to="/signup">Sign Up</NavLink>
              </>
            )}
            
            <NavLink onClick={() => setShowNav(false)} to="/cart">Cart</NavLink>
          </div>
        </div>
      </div>

      {/* --- DESKTOP LEFT --- */}
      <div className='left-section'>
        <NavLink to="/">
          <h2 style={{color: 'white', textDecoration: 'none'}}>Logo</h2>
        </NavLink>
      </div>

      {/* --- DESKTOP CENTER --- */}
      <div className='center-section'>
        <input type="text" placeholder='Search' value={input} onChange={handleInput} />
        <FaSearch size={30} />
      </div>

      {/* --- DESKTOP RIGHT --- */}
      <div className='right-section'>
        
        {/* Conditional Desktop Links */}
        {currentUser ? (
          <>
            <span style={{color: 'white', marginRight: '10px'}}>Hi, {currentUser.name.split(' ')[0]}</span>
            <span style={{color: '#4ade80', fontWeight: 'bold', marginRight: '10px'}}>
              {formatNumber(currentUser.walletBalanceCents)}
            </span>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/orders">
              Orders
            </NavLink>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/login">
              Login
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/signup">
              Sign Up
            </NavLink>
          </>
        )}

        {/* Cart Icon (Always Visible) */}
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