import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../redux/slices/Slice'

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  // total amount
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <div className="max-w-6xl mx-auto p-6">
      {cart.length === 0 ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-700">Cart is Empty</h2>
          <NavLink to="/">
            <button className="px-6 py-2 rounded-full border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition">
              Shop Now
            </button>
          </NavLink>
        </div>
      ) : (
        <div className="flex gap-8">

          {/* LEFT: Cart Items */}
          <div className="w-2/3 flex flex-col gap-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-300 pb-4"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt="" className="h-20 object-contain" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.title.substring(0, 30)}...
                    </p>
                    <p className="text-green-600 font-bold">${item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-gray-600 text-sm">Qty:</p>
                      <button onClick={() => dispatch(remove(item.id))} className="w-6 h-6 border border-gray-400 rounded-full flex justify-center items-center hover:bg-gray-200 text-gray-800">-</button>
                      <span className="font-semibold text-gray-800">{item.qty}</span>
                      <button onClick={() => dispatch({ type: 'cart/add', payload: item })} className="w-6 h-6 border border-gray-400 rounded-full flex justify-center items-center hover:bg-gray-200 text-gray-800">+</button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => dispatch(remove(item.id))}
                    className="px-3 py-1 text-xs uppercase border border-red-700 text-red-700 rounded-full hover:bg-red-700 hover:text-white transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary */}
          <div className="w-1/3 h-fit p-6 border border-gray-300 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Summary</h2>

            <p className="text-gray-600 mb-2">
              Total Items: <span className="font-semibold text-gray-800">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
            </p>

            <p className="text-gray-600 mb-4">
              Total Amount:{" "}
              <span className="font-bold text-green-600">
                ${totalAmount.toFixed(2)}
              </span>
            </p>

            <button className="w-full bg-gray-700 text-white py-2 rounded-full uppercase font-semibold hover:bg-gray-800 transition">
              Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  )
}

export default Cart
