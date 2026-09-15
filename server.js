import 'dotenv/config'
import crypto from 'node:crypto'
import express from 'express'
import Razorpay from 'razorpay'
import { products } from './src/data.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json({ limit: '10kb' }))

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null

const productById = new Map(products.map(product => [product.id, product]))

app.post('/api/create-order', async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({ message: 'Razorpay is not configured on the server.' })
  }

  const items = req.body?.items
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'A non-empty items list is required.' })
  }

  const lineItems = []
  for (const item of items) {
    const product = productById.get(Number(item.id))
    const quantity = Number(item.quantity)

    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return res.status(400).json({ message: 'Cart contains an invalid product or quantity.' })
    }

    lineItems.push({ product, quantity })
  }

  const amount = lineItems.reduce(
    (total, { product, quantity }) => total + Math.round(product.price * 100) * quantity,
    0,
  )

  try {
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `ecomzy_${Date.now()}`,
    })

    return res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Razorpay order creation failed:', error)
    return res.status(502).json({ message: 'Unable to create a payment order.' })
  }
})

app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {}

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(400).json({ message: 'Incomplete payment verification data.' })
  }

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest('hex')

  const expectedBuffer = Buffer.from(expectedSignature)
  const receivedBuffer = Buffer.from(razorpay_signature)
  const signaturesMatch = expectedBuffer.length === receivedBuffer.length
    && crypto.timingSafeEqual(expectedBuffer, receivedBuffer)

  if (!signaturesMatch) {
    return res.status(400).json({ message: 'Payment signature verification failed.' })
  }

  return res.json({ verified: true })
})

app.listen(port, () => {
  console.log(`Payment server listening on http://localhost:${port}`)
})
