import React from 'react'
import '../styles/ProductCard.css'
import { formatNumber } from '../utils/formatNumber'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className='product-card-container'>
      <div className='image-wrapper'>
        <img className='product-image' src={product.image} alt={product.name} />
      </div>
      
      <div className='card-details'>
        <h3>{product.name}</h3>
        <div className='rating-wrapper'>
          <img 
            className='rating-img' 
            src={`images/ratings/rating-${product.rating.stars * 10}.png`} 
            alt={`${product.rating.stars} stars`} 
          />
          <span className='count-text'>({product.rating.count})</span>
        </div>
        <p className='price-text'>{formatNumber(product.priceCents)}</p>
        
        <button 
          className='add-btn'
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard