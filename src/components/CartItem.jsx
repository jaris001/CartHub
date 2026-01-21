import React from 'react'
import '../styles/CartItems.css'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalAmount } from '../features/cart/cartSlice'
import { formatNumber } from '../utils/formatNumber'
import { useDispatch } from 'react-redux'
import { removeFromCart, increaseQuantity, reduceQuantity, clearCart } from '../features/cart/cartSlice'
import { FaCreditCard, FaPaypal, FaTrash } from 'react-icons/fa'
import { BsCashCoin } from "react-icons/bs";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartItem = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const [activebtn, setActivebtn] = useState('');
  const dispatch = useDispatch();
  const totalAmount = useSelector(selectCartTotalAmount);
  const deliveryFee = totalAmount * 10 / 100;
  const tax = totalAmount * 10 / 100;
  const total = totalAmount + deliveryFee + tax;


  const handleActiveBtn = (btn) => {
    setActivebtn(btn);
  }
  return (

    <div className='cart-item'>
      <div className='items-container'>
        {cartItems.length > 0 ? <div className='item-header'>
          <p>Product</p>
          <p>Quantity</p>
          <p>Price</p>
        </div> : <p style={{ textAlign: "center" }}>Cart is empty</p>}
        {cartItems.map(item => (
          <div className='item' key={item.id}>
            <img src={item.image} alt={item.name} width={100} />
            <h3>{item.name}</h3>
            <div className='quantity-container'>
              <button className=' increase-button' onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <p>{item.quantity}</p>
              <button className='decrease-button' onClick={() => dispatch(reduceQuantity(item.id))}>-</button>
            </div>
            <p className='price'>{formatNumber(item.priceCents)}</p>
            <button className='remove-button' onClick={() => dispatch(removeFromCart(item.id))}><FaTrash /></button>
          </div>
        ))}
        {cartItems.length > 0 && (
          <button className='clear-cart-button'
            onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        )}
      </div>

      <div className='cart-info-container'>
        <div className='coupon-container'>
          <h3>Coupon</h3>
          <hr />
          <input type="text" placeholder='Enter coupon code' />
          <button>Apply</button>
        </div>
        <div className='order-summary-container'>
          <h3>Order Summary</h3>
          <hr />
          <p>Subtotal: {formatNumber(totalAmount)}</p>
          <p>Delivery Fee: {formatNumber(deliveryFee)}</p>
          <p>Tax: {formatNumber(tax)}</p>
          <p>Total: {formatNumber(total)}</p>
        </div>
        <div className='payment-container'>
          <h3>Payment Methods</h3>
          <hr />
          <div className='payment-methods-container'>
            <button className={`payment-button ${activebtn === 'credit-card' ? 'active' : ''}`}
              onClick={() => handleActiveBtn('credit-card')}><FaCreditCard /></button>
            <button className={`payment-button ${activebtn === 'cash' ? 'active' : ''}`}
              onClick={() => handleActiveBtn('cash')}><BsCashCoin /></button>
            <button className={`payment-button ${activebtn === 'paypal' ? 'active' : ''}`}
              onClick={() => handleActiveBtn('paypal')}><FaPaypal /></button>
          </div>
          <button onClick={() => navigate('/checkout')}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem 