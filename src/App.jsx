import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import ProfilePage from './Pages/ProfilePage';
import PreviousOrdersPage from './Pages/PreviousOrdersPage';
import PrevOderViewPage from './Pages/PrevOderViewPage';
import ProductViewPage from './Pages/ProductViewPage';
import SignInPage from './Pages/Auth/SignInPage'
import SignUpPage from './Pages/Auth/SignUpPage'
import Verify from './Pages/Auth/Verify'
import ProductView from './Features/ProductView/ProductView';
import Checkout from './Pages/Payments/CheakOutPage';
import Protect from './Features/Auth/protect';
function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/verify" element={<Verify />} />
        <Route path="/productview" element={<ProductView />} />
        <Route path="/cart" element={<Protect><CartPage /></Protect>} />
        <Route path="/myprofile" element={<Protect><ProfilePage /></Protect>} />
        <Route path="/myorders" element={<Protect><PreviousOrdersPage /></Protect>} />
        <Route path="/orders/:id" element={<PrevOderViewPage />} />
        <Route path="/product/:id" element={<ProductViewPage />} />
        <Route path="/cart/cheakout" element={<Protect><Checkout /></Protect>} />
      </Routes>
    </Router>
  )
}

export default App
