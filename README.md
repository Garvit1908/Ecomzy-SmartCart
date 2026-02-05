# 🛒 Ecomzy - E-Commerce Shopping Cart

A modern, responsive e-commerce shopping cart application built with React, Redux Toolkit, and Tailwind CSS. This project demonstrates a clean implementation of shopping cart functionality with state management and routing.

## ✨ Features

- 🏠 **Product Catalog** - Browse through a collection of 20 products across multiple categories
- 🛍️ **Shopping Cart** - Add, remove, and manage product quantities
- 📊 **Real-time Cart Updates** - Live cart count badge with animations
- 💰 **Dynamic Price Calculation** - Automatic total amount calculation
- 🎨 **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- 🔄 **State Management** - Redux Toolkit for efficient state handling
- 🧭 **Client-side Routing** - React Router for seamless navigation

## 🚀 Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecomzy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
ecomzy/
├── components/
│   ├── Navbar.jsx          # Navigation bar with cart icon
│   ├── Productitem.jsx     # Individual product card
│   └── Cartitem.jsx        # Cart item component (unused)
├── pages/
│   ├── Home.jsx            # Product listing page
│   └── Cart.jsx            # Shopping cart page
├── redux/
│   ├── slices/
│   │   └── Slice.js        # Redux cart slice
│   └── store.js            # Redux store configuration
├── src/
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   ├── index.css           # Global styles
│   └── data.js             # Product data
└── package.json
```

## 🎯 Key Components

### Navbar
- Displays app logo
- Home and Cart navigation links
- Live cart item count with animated badge

### Home Page
- Grid layout of product cards
- Product images, titles, descriptions, and prices
- "Add to Cart" / "Remove from Cart" toggle buttons

### Cart Page
- List of added products with images and details
- Quantity controls (increment/decrement)
- Individual item removal
- Order summary with total items and amount
- Checkout button

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📱 Product Categories

The app includes products from the following categories:
- Men's Clothing
- Women's Clothing
- Electronics
- Jewelry

## 🎨 Styling

The application uses **Tailwind CSS** for styling with:
- Responsive grid layouts
- Hover effects and transitions
- Custom color schemes (gray, green, red)
- Shadow and border utilities
- Animated elements (bounce animation on cart badge)

## 🔄 State Management

Redux Toolkit manages the cart state with the following actions:
- **add** - Add product to cart or increment quantity
- **remove** - Remove product from cart or decrement quantity

Cart state includes:
- Product details (id, title, price, image, etc.)
- Quantity tracking for each product
- Automatic total calculation

## 🌐 Routing

The app uses React Router with two main routes:
- `/` - Home page (product catalog)
- `/cart` - Shopping cart page

## 🚧 Future Enhancements

Potential features to add:
- Product search and filtering
- Product categories filter
- User authentication
- Wishlist functionality
- Product detail pages
- Checkout and payment integration
- Order history
- Backend API integration

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

Built with ❤️ using modern web technologies. Perfect for learning React state management, routing, and building e-commerce interfaces.

---

**Happy Shopping! 🛍️**
