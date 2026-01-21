import React from 'react'
import '../styles/ProductCard.css'
import { formatNumber } from '../utils/formatNumber'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'

const ProductCard = ({product}) => {

  const dispatch = useDispatch();

  return (
    <div className='product-card-container'>
        <img className='product-image' data-rating={product.rating.stars} src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{formatNumber(product.priceCents)}</p>
        <img className='rating' src={`images/ratings/rating-${product.rating.stars * 10}.png`} alt="" />
        <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  )
}

export default ProductCard