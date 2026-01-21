import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalAmount } from '../features/cart/cartSlice'
import { formatNumber } from '../utils/formatNumber'
import '../styles/CheckoutSummary.css'

const CheckoutSummary = () => {

  const [delivery, setDelivery] = useState('Free Shipping');
  const totalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);

  const deliveryFee = delivery === 'Free Shipping' ? 0 : totalAmount * 10 / 100;
  const tax = totalAmount * 10 / 100;
  const total = totalAmount + deliveryFee + tax;

  return (
    <div className='checkout-wrapper'>

      <div className='checkout-left'>
        <div className='address-block'>
          <h3>Shipping Address</h3>

          <form className="address-form">

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor="firstName">First Name*</label>
                <input type="text" id="firstName" />
              </div>
              <div className='form-group'>
                <label htmlFor="lastName">Last Name*</label>
                <input type="text" id="lastName" />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor="email">Email*</label>
                <input type="email" id="email" />
              </div>
              <div className='form-group'>
                <label htmlFor="phone">Phone number*</label>
                <input type="tel" id="phone" />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor="city">City*</label>
                <input type="text" id="city" />
              </div>
              <div className='form-group'>
                <label htmlFor="state">State*</label>
                <input type="text" id="state" />
              </div>
              <div className='form-group'>
                <label htmlFor="zipCode">Zip Code*</label>
                <input type="text" id="zipCode" />
              </div>
            </div>

            <div className='form-group full-width'>
              <label htmlFor="description">Description*</label>
              <textarea id="description" placeholder='Enter a description...' />
            </div>
          </form>
        </div>

        <div className='method-block'>
          <h3>Shipping Method</h3>

          <div className='method-options'>

            <div className='method-card'>
              <input
                type="radio"
                name="shipping"
                defaultChecked
                onChange={() => setDelivery('Free Shipping')}
              />
              <div>
                <h4>Free Shipping</h4>
                <p>7–20 Days</p>
              </div>
              <p>$0</p>
            </div>

            <div className='method-card'>
              <input
                type="radio"
                name="shipping"
                onChange={() => setDelivery('Express Shipping')}
              />
              <div>
                <h4>Express Shipping</h4>
                <p>1–3 Days</p>
              </div>
              <p>{deliveryFee}</p>
            </div>

          </div>
        </div>
      </div>

      <div className='checkout-right'>

        <div className='cart-box'>
          <h3>Your Cart</h3>

          <div className='cart-list'>
            {cartItems.map(item => (
              <div key={item.id} className='cart-row'>

                <div className='cart-img'>
                  <img src={item.image} alt={item.name} />
                  <span className='qty-badge'>{item.quantity}</span>
                </div>

                <div className='cart-details'>
                  <h4>{item.name}</h4>
                  <p>{formatNumber(item.priceCents)}</p>
                </div>

              </div>
            ))}
          </div>

          <div className='discount-bar'>
            <input type="text" placeholder="Discount code" />
            <button className="apply-btn">Apply</button>
          </div>

          <div className='totals-block'>
            <div className='total-line'>
              <p>Subtotal</p>
              <p>{formatNumber(totalAmount)}</p>
            </div>

            <div className='total-line'>
              <p>Shipping</p>
              <p>{formatNumber(deliveryFee)}</p>
            </div>

            <div className='total-line'>
              <p>Estimated taxes</p>
              <p>{formatNumber(tax)}</p>
            </div>

            <hr />

            <div className='total-final'>
              <p>Total</p>
              <p>{formatNumber(total)}</p>
            </div>
          </div>

          <button className="continue-btn">
            Continue to Payment
          </button>

        </div>
      </div>

    </div>
  )
}

export default CheckoutSummary
