import React, { useRef, useState } from 'react'
import ProductList from '../components/ProductList'
import '../styles/Home.css' 

const Home = () => {
  const shopRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const scrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    scrollToShop();
  };

  const categories = [
    { id: 0, title: 'All', image: 'https://images.unsplash.com/photo-1472851294608-415522f83ac1?auto=format&fit=crop&w=500&q=60' },
    { id: 1, title: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=60' },
    { id: 2, title: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=500&q=60' },
    { id: 3, title: 'Sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=60' },
  ];

  return (
    <div className="home-page">
      
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to CartHub</h1>
          <p>Premium quality. Unbeatable prices. <br/> Upgrade your lifestyle today.</p>
          <button className="hero-btn" onClick={() => handleCategoryClick("All")}>
            Shop Now
          </button>
        </div>
      </section>

      <section className="category-section">
        <div className="section-header">
          <h2>Browse by Category</h2>
          <div className="underline"></div>
        </div>
        
        <div className="category-grid">
          {categories.map(cat => (
            <div key={cat.id} className="category-card" onClick={() => handleCategoryClick(cat.title)}>
              <img src={cat.image} alt={cat.title} />
              <div className="category-overlay">
                <h3>{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="shop-section" ref={shopRef} className="products-section">
        <div className="section-header">
          <h2>{selectedCategory === "All" ? "All Products" : `${selectedCategory} Products`}</h2>
          <div className="underline"></div>
        </div>

        <ProductList selectedCategory={selectedCategory} />
      </section>

    </div>
  )
}

export default Home