import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <ProductProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)