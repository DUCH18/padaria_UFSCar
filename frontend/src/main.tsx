import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import ProductStock from './components/product-stock/ProductStock'
import EditProduct from './components/edit-product/EditProduct'
import CreateProduct from './components/create-product/CreateProduct'
import App from './App'
import { CreateProductProvider } from './contexts/create-product-ctx/CreateProductProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<ProductStock />} />
          <Route
            path="/produto/:id"
            element={
              <CreateProductProvider>
                <EditProduct />
              </CreateProductProvider>
            }
          />
        </Route>
        <Route
          path="/novo"
          element={
            <CreateProductProvider>
              <CreateProduct />
            </CreateProductProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
