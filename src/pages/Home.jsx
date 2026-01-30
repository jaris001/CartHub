import ProductList from '../components/ProductList'

const Home = () => {
  return (
    <div className="home-page">
      <section className="products-section">
        <ProductList />
      </section>
    </div>
  )
}

export default Home