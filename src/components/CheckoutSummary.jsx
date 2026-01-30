import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotalAmount } from '../features/cart/cartSlice'
import { formatNumber } from '../utils/formatNumber'
import { clearCart } from '../features/cart/cartSlice'
import { updateUserBalance } from '../features/user/userSlice'
import '../styles/CheckoutSummary.css'

const CheckoutSummary = () => {

  const [delivery, setDelivery] = useState('Free Shipping');
  const totalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);

  const { currentUser } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.user);


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zipCode: '',
    description: ''
  });

  useEffect(() => {
    if (currentUser) {
      const nameParts = currentUser.name ? currentUser.name.split(' ') : ['', ''];
      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: currentUser.email || ''
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const deliveryFee = delivery === 'Free Shipping' ? 0 : totalAmount * 10 / 100;
  const tax = totalAmount * 10 / 100;
  const total = totalAmount + deliveryFee + tax;

  const handlePay = async () => {

    if (!formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode) 
      {
      alert("Please fill in all shipping details.");
      return;
    }

    if (!currentUser) {
      alert('please login and try again')
      navigate('/login')
      return;
    }

    if (currentUser.walletBalanceCents < total) {
      alert(`Insufficient Funds! You need ${formatNumber(total)} but have ${formatNumber(currentUser.walletBalanceCents)}`);
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: total,
      date: new Date().toISOString()
    };

    const newBalance = currentUser.walletBalanceCents - total;

    try {
      await dispatch(updateUserBalance({ userId: currentUser.id, newBalance: newBalance, orders: [newOrder, ...currentUser.orders || []] })).unwrap()
      dispatch(clearCart());
      alert('Transaction Successful!')
      navigate('/');
    } catch (error) {
      console.log(error.message)
      alert("Payment failed: " + error.message);
    }
  }

  return (
    <div className='checkout-wrapper'>
      <div className='checkout-left'>
        <div className='address-block'>
          <h3>Shipping Address</h3>
          <form className="address-form">
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor="firstName">First Name*</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor="lastName">Last Name*</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor="email">Email*</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor="phone">Phone number*</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor="city">City*</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor="state">State*</label>
                <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />
              </div>
              <div className='form-group'>
                <label htmlFor="zipCode">Zip Code*</label>
                <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
              </div>
            </div>
            <div className='form-group full-width'>
              <label htmlFor="description">Description*</label>
              <textarea id="description" name="description" placeholder='Enter a description...' value={formData.description} onChange={handleChange} />
            </div>
          </form>
        </div>

        <div className='method-block'>
          <h3>Shipping Method</h3>
          <div className='method-options'>
            <div className='method-card'>
              <input type="radio" name="shipping" defaultChecked onChange={() => setDelivery('Free Shipping')} />
              <div>
                <h4>Free Shipping</h4>
                <p>7–20 Days</p>
              </div>
              <p>$0</p>
            </div>
            <div className='method-card'>
              <input type="radio" name="shipping" onChange={() => setDelivery('Express Shipping')} />
              <div>
                <h4>Express Shipping</h4>
                <p>1–3 Days</p>
              </div>
              <p>{formatNumber(totalAmount * 10 / 100)}</p>
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
              <p>{deliveryFee === 0 ? 'Free' : formatNumber(deliveryFee)}</p>
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

            {currentUser && (
              <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555' }}>
                Wallet: <span style={{ fontWeight: 'bold', color: currentUser.walletBalanceCents >= total ? 'green' : 'red' }}>
                  {formatNumber(currentUser.walletBalanceCents)}
                </span>
              </div>
            )}
          </div>

          <button className="continue-btn" onClick={handlePay} disabled={isLoading}>
            {isLoading ? 'Processing...' : `Pay ${formatNumber(total)}`}
          </button>

        </div>
      </div>

    </div>
  )
}

export default CheckoutSummary