import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomerLogin from './templates/customer-login.jsx';
import CustomerSignup from './templates/customer-signup.jsx';
import SellerLogin from './templates/seller-login.jsx';
import SellerIndex from './templates/seller-index.jsx';
import CustomerIndex from './templates/customer-index.jsx';
import Index from './templates/index.jsx';


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/customer-signup" element={<CustomerSignup />} />
        <Route path="/customer-index" element={<CustomerIndex />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/seller-index" element={<SellerIndex />} />
      </Routes>
    </Router>
  );
}

export default App;