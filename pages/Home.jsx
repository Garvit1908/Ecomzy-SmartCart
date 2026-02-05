import React from 'react'
import Productitem from '../components/Productitem'
const Home = ({ products }) => {
  return (
    <div className="flex flex-wrap max-w-6xl mx-auto min-h-[80vh] p-4">
      {products.map(product => (
        <div key={product.id} className="w-1/4 p-4">
          <Productitem product={product} />
        </div>
      ))}
    </div>
  )
}

export default Home