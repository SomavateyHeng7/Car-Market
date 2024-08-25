import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import HighlightedCars from './pages/highlightedCar';
import CarDetails from './pages/CarDetails';
import HomePage from './pages/homepage'; 
import ContactUS from './pages/contactus'; 
import BrandDetails from './pages/BrandDetails';
import './assets/dashboard.css';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/highlighted-cars" element={<HighlightedCars />} />
        <Route path="/home-page" element={<HomePage />} /> 
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/ContactUs" element={<ContactUS />} />
        <Route path="/brand/:brand/:model" element={<BrandDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
