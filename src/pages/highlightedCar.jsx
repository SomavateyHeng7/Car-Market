import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import carData from '../data/taladrod-cars.min.json';
import '../assets/highlightcar.css';
import { Nav } from 'react-bootstrap';
import NavBar from '../components/NavBar';

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState(() => {
    const savedCarIds = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    return savedCarIds
      .map(id => carData.Cars.find(car => car.Cid === id))
      .filter(car => car !== undefined);
  });

  const [selectedBrand, setSelectedBrand] = useState('All Brands');

  useEffect(() => {
    const highlightedCarIds = highlightedCars.map(car => car.Cid);
    localStorage.setItem('highlightedCars', JSON.stringify(highlightedCarIds));
  }, [highlightedCars]);

  const toggleHighlight = (car) => {
    const isHighlighted = highlightedCars.some(c => c.Cid === car.Cid);
    const updatedCars = isHighlighted
      ? highlightedCars.filter(c => c.Cid !== car.Cid)
      : [car, ...highlightedCars];

    setHighlightedCars(updatedCars);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const filteredCars = selectedBrand === 'All Brands'
    ? carData.Cars
    : carData.Cars.filter(car => car.NameMMT.split(' ')[0] === selectedBrand);

  const filteredHighlightedCars = selectedBrand === 'All Brands'
    ? highlightedCars
    : highlightedCars.filter(car => car.NameMMT.split(' ')[0] === selectedBrand);

  const brands = [...new Set(carData.Cars.map(car => car.NameMMT.split(' ')[0]))];

  return (
    <div className="highlighted-cars-container">
      <NavBar />
      <h3>Highlighted Cars</h3>
      <div className="highlighted-cars-grid">
        {filteredHighlightedCars.length > 0 ? (
          filteredHighlightedCars.map(car => (
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
  
      <div className="brand-filter" style={{ marginBottom: '20px', padding: '10px', position: 'relative', zIndex: 100 }}>
        <label htmlFor="brandFilter" style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter by Brand: </label>
        <select
          id="brandFilter"
          value={selectedBrand}
          onChange={handleBrandChange}
          style={{
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#fff',
            color: '#000',
            zIndex: 101,
          }}
        >
          <option value="All Brands">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
  
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
  
      <footer className="footer">
        <p>&copy; 2024 So Cool Car. All rights reserved.</p>
      </footer>
    </div>
  );
  
};

export default HighlightedCars;
