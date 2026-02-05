import Navbar from '../components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import { products } from './data'


function App() {

  return (
    <div className="min-h-screen w-full">
      <div className="bg-slate-900">
        <Navbar />
      </div>

      <Routes>
        <Route path='/' element={<Home products={products} />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
