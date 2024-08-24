import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/dashboard';
import HighlightedCars from './pages/highlightedCar';
import CarDetails from './pages/CarDetails';
import HomePage from './pages/homepage'; 
import ContactUS from './pages/contactus'; 
import './assets/dashboard.css';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/highlighted-cars" element={<HighlightedCars />} />
        <Route path="/home-page" element={<HomePage />} /> 
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/ContactUs" element={<ContactUS />} />
      </Routes>
    </Router>
  );
};

export default App;
