import React from 'react'
import '../styles/Orders.css'
import { useSelector } from 'react-redux'
import { formatNumber } from '../utils/formatNumber' // Assuming you have this

const Orders = () => {
  const currentUser = useSelector(state => state.user.currentUser)

  return (
    <div className='orders-page'>
      <div className='container'>
        <h1 className='page-title'>My Orders</h1>

        {currentUser?.orders?.length > 0 ? (
          <div className='orders-list'>
            {currentUser.orders.map(order => (
              <div key={order.id} className='order-card'>
                
                {/* 1. CARD HEADER: ID, Date, Status */}
                <div className='card-header'>
                  <div className='header-left'>
                    <h2>Order #{order.id}</h2>
                    <span className='order-date'>{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div className='header-right'>
                    <span className='status-badge'>Delivered</span>
                  </div>
                </div>

                {/* 2. CARD BODY: List of Items */}
                <div className='card-body'>
                  {order.items.map(item => (
                    <div key={item.id} className='order-item'>
                      <div className='item-img-wrapper'>
                        <img src={item.image} alt={item.name} />
                        <span className='item-qty'>x{item.quantity}</span>
                      </div>
                      <div className='item-details'>
                        <h3>{item.name}</h3>
                        <p>{formatNumber(item.priceCents)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3. CARD FOOTER: Total Price */}
                <div className='card-footer'>
                  <div className='total-row'>
                    <span>Order Total</span>
                    <span className='total-price'>{formatNumber(order.total)}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className='empty-state'>
            <p>No orders found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders