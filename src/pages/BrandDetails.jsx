import React from 'react';
import { useParams, Link } from 'react-router-dom';
import carData from '../data/taladrod-cars.min.json';
import NavBar from '../components/NavBar';
import '../assets/branddetail.css';

const BrandDetails = () => {
  const { brand, model } = useParams();  

  const cars = carData.Cars.filter(car => {
    const carBrand = car.NameMMT.split(' ')[0];
    return carBrand === brand && car.Model === model;
  });

  return (
    <div className="brand-details-container">
      <NavBar />
      <h2>{brand} {model} Cars</h2>
      <div className="car-list">
        {cars.length > 0 ? (
          cars.map(car => (
            <div key={car.Cid} className="car-item">
              <img src={car.Img100} alt={car.NameMMT} />
              <h4>{car.NameMMT}</h4>
              <p>{car.Prc} Baht</p>
              <Link to={`/cars/${car.Cid}`}>View Car Details</Link>
            </div>
          ))
        ) : (
          <p>No cars available for this model.</p>
        )}
      </div>
    </div>
  );
};

export default BrandDetails;
