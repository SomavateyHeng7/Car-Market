import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/navbar.css'; 

function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">So Cool Car</div>
      <ul className="nav-links">
        <li><Link to="/Home-page">Home</Link></li>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/highlighted-cars">Highlighted Cars</Link></li>
        <li><Link to="/contactus">Contact US</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
