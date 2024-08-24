import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar'; 
import '../assets/homepage.css';

const HomePage = () => {
    return (
    <div className="homepage">
    <NavBar />
        <section className="home">
            <div className="home-content">
                <h1>Welcome to the Car Dashboard</h1>
                <p>Manage your car inventory efficiently and with ease.</p>
                <p>One Stop place to all variety of cars.</p>
                <Link to="/highlighted-cars" className="btn-dark">Get Started</Link>
            </div>
        </section>


        <section className="features">
            <h2>Key Features</h2>
            <div className="feature">
                <h3>Real-time Car Data</h3>
                <p>Access up-to-date information on all cars in your inventory, including brand, model, and value.</p>
            </div>
            <div className="feature">
                <h3>Visual Insights</h3>
                <p>Interactive charts and graphs to visualize your car inventory data by brand and model.</p>
            </div>
            <div className="feature">
                <h3>Easy Management</h3>
                <p>Filter, sort, and manage your car listings with a user-friendly dashboard interface.</p>
            </div>
        </section>

        <footer className="footer">
            <p>&copy; 2024 So Cool Car. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default HomePage;
