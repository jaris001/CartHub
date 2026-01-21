import React from 'react'
import { productsList } from '../data/products'
import ProductCard from './ProductCard'
import '../styles/ProductList.css'
import { InputContext } from '../context/InputContext'
import { useContext } from 'react'

const ProductList = () => {

  const products = productsList;
  const { input } = useContext(InputContext);

  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(input.toLowerCase()));

  return (
    <div className="product-list">
      {filteredProducts.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  )
}

export default ProductList