import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter } from "react-router-dom"
import { CartProvider, CategoryProvider, CommentProvider, OrderProvider, UserProvider } from './store/provider.tsx'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <UserProvider>
          <CommentProvider>
            <OrderProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </OrderProvider>
          </CommentProvider>
        </UserProvider>
      </CategoryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
