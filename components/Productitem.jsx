import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove, decrement } from '../redux/slices/Slice'

const Productitem = (props) => {
  const product = props.product
  const str = product.title.substring(0, 25)

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  // check if product is in cart and get its quantity
  const cartItem = cart.find(item => item.id === product.id)
  const qty = cartItem ? cartItem.qty : 0

  return (
    <div className="flex flex-col items-center justify-between gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl transition duration-300 w-[250px]">

      <h1 className="text-gray-800 dark:text-gray-100 font-semibold text-base text-center truncate w-full">
        {str}...
      </h1>

      <p className="text-gray-400 dark:text-gray-300 text-[12px] text-center">
        {product.description.split(" ").slice(0, 10).join(" ")}...
      </p>

      <div className="h-[160px] flex items-center justify-center">
        <img
          src={product.image}
          alt="product"
          className="h-full object-contain"
        />
      </div>

      <div className="flex justify-between items-center w-full mt-3">
        <p className="text-green-600 font-bold text-lg">
          ${product.price}
        </p>

        {qty > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(decrement(product.id))}
              className="border border-gray-700 dark:border-gray-100 rounded-full w-8 h-8 flex justify-center items-center font-bold text-gray-700 dark:text-gray-100 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-800 transition"
            >
              -
            </button>
            <span className="font-semibold text-gray-700 dark:text-gray-100">{qty}</span>
            <button
              onClick={() => dispatch(add(product))}
              className="border border-gray-700 dark:border-gray-100 rounded-full w-8 h-8 flex justify-center items-center font-bold text-gray-700 dark:text-gray-100 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-800 transition"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => dispatch(add(product))}
            className="border border-gray-700 dark:border-gray-100 rounded-full px-4 py-1 text-xs font-semibold uppercase text-gray-700 dark:text-gray-100 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-800 transition"
          >
            Add to Cart
          </button>
        )}
      </div>

    </div>
  )
}

export default Productitem
