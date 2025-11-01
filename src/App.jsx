import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import HomePage from './pages/home'
import AdminPage from './pages/adminPage'
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
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path='/*' element={<h1>404 Not Found</h1>} />
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App