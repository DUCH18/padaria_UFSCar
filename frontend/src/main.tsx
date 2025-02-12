import App from './App'
import './global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ProductStock } from './components/product-stock/ProductStock'
import { EditProduct } from './components/edit-product/EditProduct'
import { CreateProduct } from './components/create-product/CreateProduct'

import { SharedContextProvider } from './contexts/shared-context/SharedContextProvider'
import { CreateProductProvider } from './contexts/create-product/CreateProductProvider'
import { EditProductProvider } from './contexts/edit-product/EditProductProvider'
import { ProductReports } from './components/product-reports/ProductReports'
import { HandleChartsProvider } from './contexts/charts/HandleChartsProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<ProductStock />} />
          <Route
            path="/produto/:id"
            element={
              <SharedContextProvider>
                <EditProductProvider>
                  <EditProduct />
                </EditProductProvider>
              </SharedContextProvider>
            }
          />
          <Route
            path='/relatorio'
            element={
              <HandleChartsProvider>
                <ProductReports />
              </HandleChartsProvider>
            }
          />
        </Route>
        <Route
          path="/novo"
          element={
            <SharedContextProvider>
              <CreateProductProvider>
                <CreateProduct />
              </CreateProductProvider>
            </SharedContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);