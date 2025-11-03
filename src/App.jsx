import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomePage from './pages/home'
import AdminPage from './pages/adminPage'
import AdminProductPage from './pages/admin/adminProductPage'
import AddProductPage from './pages/admin/addProductPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position="top-right" />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          
          {/* ✅ Admin Routes - Nested */}
          <Route path="/admin" element={<AdminPage />}>
            <Route path="products" element={<AdminProductPage />} />
            <Route path="add-product" element={<AddProductPage />} />  {/* ✅ Fixed: nested under /admin */}
            <Route path="users" element={<h1>Users Page</h1>} />
            <Route path="orders" element={<h1>Orders Page</h1>} />
            <Route path="reviews" element={<h1>Reviews Page</h1>} />
          </Route>
          
          <Route path="/test" element={<TestPage />} />
          <Route path='/*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App