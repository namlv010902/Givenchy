import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrandProvider, CartProvider, CategoryProvider, CommentProvider, FavoriteProvider, OrderProvider, ProductProvider, SizeProvider, UserProvider } from './store/provider.tsx'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 
      <CategoryProvider>
        <FavoriteProvider>
          <UserProvider>
            <CommentProvider>
              <OrderProvider>
                <CartProvider>
                  <ProductProvider>
                    <SizeProvider>
                      <BrandProvider>
                    <App />
                    </BrandProvider>
                    </SizeProvider>
                  </ProductProvider>
                </CartProvider>
              </OrderProvider>
            </CommentProvider>
          </UserProvider>
        </FavoriteProvider>
      </CategoryProvider>

)
