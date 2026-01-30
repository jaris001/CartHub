import { Routes, Route, Outlet } from 'react-router-dom'
import { InputContextProvider } from './context/InputContext'

import Header from './components/Header'
import Home from './pages/Home'
import CartItem from './components/CartItem'
import Orders from './components/Orders'
import CheckoutSummary from './components/CheckoutSummary'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet /> {/* This is where Home, Cart, or Orders appears */}
      </main>
    </>
  )
}

const App = () => {
  return (
    <div className="app">
      <InputContextProvider>
        <Routes>
          {/* Group 1: Pages with Header */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartItem />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<CheckoutSummary />} />
          </Route>

          {/* Group 2: Pages WITHOUT Header (Auth) */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </InputContextProvider>
    </div>
  )
}

export default App