import ProductCard from './ProductCard'
import '../styles/ProductList.css'
import { InputContext } from '../context/InputContext'
import { useContext, useEffect, useState } from 'react'

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const { input } = useContext(InputContext);

  useEffect(() => {
   const fetchData = async () => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    setProducts(data);
   }
   fetchData();
  }, [input]);

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