import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import carData from '../data/taladrod-cars.min.json';
import '../assets/highlightcar.css';

const HighlightedCars = () => {
  // State for highlighted cars
  const [highlightedCars, setHighlightedCars] = useState(() => {
    const savedCarIds = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    return savedCarIds
      .map(id => carData.Cars.find(car => car.Cid === id))
      .filter(car => car !== undefined);
  });

  // State for selected brand filter
  const [selectedBrand, setSelectedBrand] = useState('All Brands');

  // Save highlighted cars to localStorage whenever it changes
  useEffect(() => {
    const highlightedCarIds = highlightedCars.map(car => car.Cid);
    localStorage.setItem('highlightedCars', JSON.stringify(highlightedCarIds));
  }, [highlightedCars]);

  // Function to toggle highlight status of a car
  const toggleHighlight = (car) => {
    const isHighlighted = highlightedCars.some(c => c.Cid === car.Cid);
    const updatedCars = isHighlighted
      ? highlightedCars.filter(c => c.Cid !== car.Cid)
      : [car, ...highlightedCars];

    setHighlightedCars(updatedCars);
  };

  // Function to handle brand filter change
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  // Filter cars based on the selected brand
  const filteredCars = selectedBrand === 'All Brands' 
    ? carData.Cars 
    : carData.Cars.filter(car => car.NameMMT.split(' ')[0] === selectedBrand);

  // Generate a list of unique brands for the dropdown
  const brands = [...new Set(carData.Cars.map(car => car.NameMMT.split(' ')[0]))];

  return (
    <div className="highlighted-cars-container">
      {/* Brand Filter Dropdown */}
      <div className="brand-filter">
        <label htmlFor="brandFilter">Filter by Brand: </label>
        <select id="brandFilter" value={selectedBrand} onChange={handleBrandChange}>
          <option value="All Brands">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <h3>Highlighted Cars</h3>
      <div className="highlighted-cars-grid">
        {highlightedCars.length > 0 ? (
          highlightedCars.map(car => (
            <div key={car.Cid} className="car-item">
              <img src={car.Img100} alt={car.NameMMT} />
              <h4>{car.NameMMT}</h4>
              <p>{car.Prc} Baht</p>
              <div className="actions">
                <button onClick={() => toggleHighlight(car)}>
                  Remove from Highlight
                </button>
                <Link to={`/cars/${car.Cid}`}>View Details</Link> 
              </div>
            </div>
          ))
        ) : (
          <p>No cars highlighted yet. Select cars to highlight below.</p>
        )}
      </div>

      {/* All Cars Section */}
      <h3>All Cars</h3>
      <div className="highlighted-cars-grid">
        {filteredCars.map(car => (
          <div key={car.Cid} className="car-item">
            <img src={car.Img100} alt={car.NameMMT} />
            <h4>{car.NameMMT}</h4>
            <p>{car.Prc} Baht</p>
            <div className="actions">
              <button onClick={() => toggleHighlight(car)}>
                {highlightedCars.some(c => c.Cid === car.Cid) ? 'Remove from Highlight' : 'Add to Highlight'}
              </button>
              <Link to={`/cars/${car.Cid}`}>View Details</Link> 
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 So Cool Car. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HighlightedCars;
