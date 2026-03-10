import '../styles/Header.css'
import { FaShoppingCart, FaSearch, FaHamburger } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import { selectCartItems } from '../features/cart/cartSlice'
import { logout } from '../features/user/userSlice'
import { InputContext } from '../context/InputContext'
import { formatNumber } from '../utils/formatNumber'

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const { input, handleInput } = useContext(InputContext);

  const handleLogout = () => {
    dispatch(logout());
    setShowNav(false); 
    navigate('/login'); 
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
      
      <div className='hamburger-container'>
        <FaHamburger className='hamburger'
          onClick={() => setShowNav(!showNav)}
          size={30} color="white" />
          
        <div className={`side-nav ${showNav ? 'show' : ''}`} >
          <div className='nav-links'>
            <NavLink onClick={() => setShowNav(false)} to="/">Home</NavLink>
          
            {currentUser ? (
              <>
                <NavLink onClick={() => setShowNav(false)} to="/dashboard">Dashboard</NavLink>
                <NavLink onClick={() => setShowNav(false)} to="/orders">Orders</NavLink>
                <NavLink onClick={() => setShowNav(false)} to="/cart">Cart</NavLink>
                <button className="nav-btn logout-btn" style={{marginTop: '10px'}} onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <NavLink onClick={() => setShowNav(false)} to="/login">Login</NavLink>
                <NavLink onClick={() => setShowNav(false)} to="/signup">Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className='left-section'>
        <NavLink to="/">
          <h2 style={{color: 'white', textDecoration: 'none'}}>CartHub</h2>
        </NavLink>
      </div>

      <div className='center-section'>
        <input type="text" placeholder='Search products...' value={input} onChange={handleInput} />
        <FaSearch size={24} color="white" style={{cursor: 'pointer'}} />
      </div>

      <div className='right-section'>
        
        {currentUser ? (
          <>
            <NavLink 
              className={({ isActive }) => isActive ? 'active' : ''} 
              to="/dashboard" 
              style={{marginRight: '10px', fontWeight: 'bold'}}
            >
              Hi, {currentUser.name.split(' ')[0]}
            </NavLink>

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