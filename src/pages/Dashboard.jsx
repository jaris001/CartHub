import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/user/userSlice'
import { formatNumber } from '../utils/formatNumber'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!currentUser) {
    return (
      <div className="dashboard-page" style={{textAlign: 'center', marginTop: '100px', color: 'white'}}>
        <h2>Please Log In to view your dashboard.</h2>
      </div>
    )
  }

  const totalOrders = currentUser.orders?.length || 0
  const totalSpent = currentUser.orders?.reduce((acc, order) => acc + order.total, 0) || 0
  const recentOrders = currentUser.orders?.slice(0, 3) || []

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className='dashboard-page'>
      <div className='dashboard-container'>
        
        <div className='dash-header'>
          <div>
            <h1>Welcome back, {currentUser.name.split(' ')[0]}!</h1>
            <p>Here is your account summary.</p>
          </div>
          <button className='logout-btn' onClick={handleLogout}>Log Out</button>
        </div>

        <div className='stats-grid'>
          <div className='stat-card'>
            <h3>Wallet Balance</h3>
            <p className='money-text positive'>{formatNumber(currentUser.walletBalanceCents)}</p>
          </div>
          <div className='stat-card'>
            <h3>Total Orders</h3>
            <p className='big-number'>{totalOrders}</p>
          </div>
          <div className='stat-card'>
            <h3>Total Spent</h3>
            <p className='money-text'>{formatNumber(totalSpent)}</p>
          </div>
        </div>

        <div className='recent-section'>
          <div className='section-header'>
            <h2>Recent Activity</h2>
            <button className='view-all-btn' onClick={() => navigate('/orders')}>View All Orders</button>
          </div>

          <div className='recent-list-card'>
            {recentOrders.length > 0 ? (
              <table className='recent-table'>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id.toString().slice(-6)}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>{order.items.length} Items</td>
                      <td style={{fontWeight: 'bold'}}>{formatNumber(order.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className='no-data'>You haven't placed any orders yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard