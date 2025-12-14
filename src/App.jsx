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
import Contacts from './pages/client/contacts'
import About from './pages/client/about'
import ReviewForm from './pages/client/reviewForm'
import Reviews from './pages/client/reviews'
import AdminPage from './pages/adminPage'
import AdminProductPage from './pages/admin/productPage'
import AdminOrdersPage from './pages/admin/adminOrdersPage'
import AddProductPage from './pages/admin/addProductPage'
import EditProductPage from './pages/admin/editProductPage'
import UsersPage from './pages/admin/usersPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPasswordPage from './pages/forgetPassword'
import SearchProductPage from './pages/client/searchProducts'
import Footer from './components/footer'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          {/* Global Toaster */}
          <Toaster position="top-right" />

          {/* Routes / Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/forget" element={<ForgetPasswordPage />} />

              {/* ✅ Client Routes */}
              <Route path="/overview/:id" element={<ProductOverviewPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/search" element={<SearchProductPage />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/about" element={<About />} />
              <Route path="/review" element={<ReviewForm />} />
              <Route path="/reviews" element={<Reviews />} />

              {/* ✅ Admin Routes - Nested */}
              <Route path="/admin" element={<AdminPage />}>
                <Route path="products" element={<AdminProductPage />} />
                <Route path="add-product" element={<AddProductPage />} />
                <Route path="edit-product" element={<EditProductPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="reviews" element={<h1>Reviews Page</h1>} />

              </Route>

              <Route path="/test" element={<TestPage />} />
              <Route path="/*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
          <ChatBot />

          {/* ✅ Global Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
