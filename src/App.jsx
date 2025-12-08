import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomePage from './pages/home'
import ProductPage from './pages/client/productPage'
import ProductOverviewPage from './pages/client/productOverview'
import CartPage from './pages/client/cart'
import CheckoutPage from './pages/client/checkout'
import AdminPage from './pages/adminPage'
import AdminProductPage from './pages/admin/productPage'
import AdminOrdersPage from './pages/admin/adminOrdersPage'
import AddProductPage from './pages/admin/addProductPage'
import EditProductPage from './pages/admin/editProductPage'
import { GoogleOAuthProvider } from '@react-oauth/google'

import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
    <BrowserRouter>
      <div>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          
          {/* ✅ Client Routes */}
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<div className="w-full min-h-screen flex flex-col"><Header /><h1 className="text-3xl font-bold p-8">About Page</h1></div>} />
          <Route path="/contact" element={<div className="w-full min-h-screen flex flex-col"><Header /><h1 className="text-3xl font-bold p-8">Contact Page</h1></div>} />
          <Route path="/search" element={<div className="w-full min-h-screen flex flex-col"><Header /><h1 className="text-3xl font-bold p-8">Search Page</h1></div>} />
          <Route path="/overview/:Id" element={<ProductOverviewPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* ✅ Admin Routes - Nested */}
          <Route path="/admin" element={<AdminPage />}>
            <Route path="products" element={<AdminProductPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="edit-product" element={<EditProductPage />} />
            <Route path="users" element={<h1>Users Page</h1>} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="reviews" element={<h1>Reviews Page</h1>} />
          </Route>
          
          <Route path="/test" element={<TestPage />} />
          <Route path='/*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App