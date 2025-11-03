import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomePage from './pages/home'
import AdminPage from './pages/adminPage'

import AdminProductPage from './pages/admin/adminProductPage'  // ✅ Correct
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast';

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
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />}>
            <Route path="products" element={<AdminProductPage />} />  {/* ✅ Add nested route */}
          </Route>
          
          <Route path="/test" element={<TestPage />} />
          <Route path='/*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

//https://lldezvxoqwqrjjijpadi.supabase.co

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZGV6dnhvcXdxcmpqaWpwYWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjAzMTUsImV4cCI6MjA3NzczNjMxNX0.YO20WIJO9_JIKe8IIbXIRYj5Lq1Urse59w7uKMTMWXw