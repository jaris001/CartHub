import React from 'react'
import ProductList  from './components/ProductList'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import CartItem from './components/CartItem'
import Orders from './components/Orders'
import { InputContextProvider } from './context/InputContext'
import CheckoutSummary from './components/CheckoutSummary'

const App = () => {
  return (
    <div className="app">
      <InputContextProvider>
        <Header />
        <Routes> 
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartItem />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<CheckoutSummary />} />
        </Routes>
      </InputContextProvider>
    </div>
  )
}

export default App