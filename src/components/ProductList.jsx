import React, { useContext, useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import '../styles/ProductList.css'
import { InputContext } from '../context/InputContext'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { input } = useContext(InputContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/products");
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(input.toLowerCase())
  );

  if (isLoading) return <div className="loading-state">Loading products...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  return (
    <div className="product-list-container">
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="no-results">No products found matching "{input}"</div>
      )}
    </div>
  )
}

export default ProductList