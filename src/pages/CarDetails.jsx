import Reviews from '../components/Review';  
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import carData from '../data/taladrod-cars.min.json';

const CarDetails = () => {
  const { id } = useParams();  
  const [car, setCar] = useState(null);

  useEffect(() => {
    const selectedCar = carData.Cars.find(car => car.Cid === parseInt(id, 10));
    setCar(selectedCar);
  }, [id]);

  if (!car) {
    return <p>Car not found</p>; 
  }

  return (
    <div>
      <h2>{car.NameMMT}</h2>
      <div className="car-details">
        <img src={car.Img600} alt={car.NameMMT} />
        <div className="car-info">
          <p><strong>Model:</strong> {car.Model}</p>
          <p><strong>Year:</strong> {car.Yr}</p>
          <p><strong>Price:</strong> {car.Prc} Baht</p>
          <p><strong>Mileage:</strong> {car.Mileage} km</p>
          <p><strong>Engine:</strong> {car.Engine} cc</p>
          <p><strong>Transmission:</strong> {car.Transmission}</p>
          <p><strong>Fuel Type:</strong> {car.Fuel}</p>
          <p><strong>Color:</strong> {car.Color}</p>
          
        </div>
      </div>

      <Reviews />

      <style jsx>{`
        .car-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .car-info {
          text-align: center;
          margin-top: 20px;
          color: #333; 
        }

        img {
          width: 100%;
          max-width: 600px;
          height: auto;
          border-radius: 8px;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 10px;
          text-align: center;
          color: #333; 
        }

        p {
          font-size: 1.2rem;
          margin: 5px 0;
          color: #555; 
        }

        p strong {
          font-weight: bold;
          color: #333; 
        }
      `}</style>
    </div>
  );
};

export default CarDetails;
