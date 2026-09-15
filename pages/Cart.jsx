import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, remove } from '../redux/slices/Slice'

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [isPaying, setIsPaying] = React.useState(false)
  const [paymentMessage, setPaymentMessage] = React.useState('')

  // total amount
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  const handleCheckout = async () => {
    setIsPaying(true)
    setPaymentMessage('')

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({ id: item.id, quantity: item.qty })),
        }),
      })
      const order = await response.json()

      if (!response.ok) {
        throw new Error(order.message || 'Unable to start checkout.')
      }

      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = resolve
        script.onerror = () => reject(new Error('Unable to load Razorpay Checkout.'))
        document.body.appendChild(script)
      })

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Ecomzy',
        description: 'Shopping cart checkout',
        order_id: order.orderId,
        handler: async payment => {
          try {
            const verification = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payment),
            })
            const result = await verification.json()

            if (!verification.ok || !result.verified) {
              throw new Error(result.message || 'Payment verification failed.')
            }

            setPaymentMessage('Payment successful. Your order has been verified.')
          } catch (error) {
            setPaymentMessage(error.message)
          }
        },
        modal: {
          ondismiss: () => setPaymentMessage('Payment cancelled.'),
        },
        theme: { color: '#374151' },
      })

      razorpay.open()
    } catch (error) {
      setPaymentMessage(error.message)
    } finally {
      setIsPaying(false)
    }
  }

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
                  <img src={item.image} alt={item.title} className="h-20 object-contain" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.title.substring(0, 30)}...
                    </p>
                    <p className="text-green-600 font-bold">${item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-gray-600 text-sm">Qty:</p>
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.title}`}
                        onClick={() => dispatch(decrement(item.id))}
                        className="w-6 h-6 border border-gray-400 rounded-full flex justify-center items-center hover:bg-gray-200 text-gray-800"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-800">{item.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.title}`}
                        onClick={() => dispatch({ type: 'cart/add', payload: item })}
                        className="w-6 h-6 border border-gray-400 rounded-full flex justify-center items-center hover:bg-gray-200 text-gray-800"
                      >
                        +
                      </button>
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

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isPaying}
              className="w-full bg-gray-700 text-white py-2 rounded-full uppercase font-semibold hover:bg-gray-800 transition disabled:opacity-60"
            >
              {isPaying ? 'Starting checkout...' : 'Pay with Razorpay'}
            </button>
            {paymentMessage && (
              <p role="status" className="mt-3 text-sm text-gray-700">{paymentMessage}</p>
            )}
          </div>

        </div>
      )}
    </div>
  )
}

export default Cart
