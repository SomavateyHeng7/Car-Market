import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import carData from "../data/taladrod-cars.min.json";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../assets/dashboard.css";
import NavBar from "../components/NavBar";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [brandData, setBrandData] = useState({});
  const [modelData, setModelData] = useState({});
  const [selectedBrand, setSelectedBrand] = useState("All Brands");

  useEffect(() => {
    const brands = {};
    const models = {};

    carData.Cars.forEach((car) => {
      const brand = car.NameMMT.split(" ")[0];
      const model = car.Model;

      if (!brands[brand]) {
        brands[brand] = { count: 0, totalValue: 0 };
      }
      if (!models[brand]) {
        models[brand] = {};
      }
      if (!models[brand][model]) {
        models[brand][model] = { count: 0, totalValue: 0 };
      }

      const value = parseInt(car.Prc.replace(/,/g, ""));
      brands[brand].count += 1;
      brands[brand].totalValue += value;
      models[brand][model].count += 1;
      models[brand][model].totalValue += value;
    });

    setBrandData(brands);
    setModelData(models);
  }, []);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const filteredBrands =
    selectedBrand === "All Brands"
      ? brandData
      : { [selectedBrand]: brandData[selectedBrand] };
  const filteredModels =
    selectedBrand === "All Brands"
      ? modelData
      : { [selectedBrand]: modelData[selectedBrand] };

  const brandChartData = {
    labels: Object.keys(filteredBrands),
    datasets: [
      {
        label: "Number of Cars",
        data: Object.values(filteredBrands).map((brand) => brand.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const modelChartData = {
    labels: Object.keys(filteredModels),
    datasets: Object.keys(filteredModels).map((brand) => ({
      label: brand,
      data: Object.values(filteredModels[brand]).map((model) => model.count),
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    })),
  };

  return (
    <div className="dashboard-container">
      <NavBar />

      <h2>Dashboard</h2>

      <div className="brand-filter">
        <label htmlFor="brandFilter">Filter by Brand: </label>
        <select
          id="brandFilter"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          <option value="All Brands">All Brands</option>
          {Object.keys(brandData).map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Number of Cars</th>
            <th>Value (Baht)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(filteredBrands).map((brand) => (
            <React.Fragment key={brand}>
              <tr>
                <td>{brand}</td>
                <td colSpan="3">
                  {filteredBrands[brand].count} cars,{" "}
                  {filteredBrands[brand].totalValue.toLocaleString()} Baht
                </td>
              </tr>
              {Object.keys(filteredModels[brand]).map((model) => (
                <tr key={model}>
                  <td></td>
                  <td>{model}</td>
                  <td>{filteredModels[brand][model].count}</td>
                  <td>
                    {filteredModels[brand][model].totalValue.toLocaleString()}{" "}
                    Baht
                  </td>
                  <td>
                    <Link to={`/brand/${brand}/${model}`}>View Details</Link>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
        f
      </table>

      <div className="chart-container">
        <div className="chart">
          <h3>Cars Distribution by Brand</h3>
          <Pie data={brandChartData} />
        </div>

        <div className="chart">
          <h3 style={{ color: "black" }}>Models Distribution within Brands</h3>
          <Bar
            data={modelChartData}
            options={{
              scales: {
                x: { stacked: true },
                y: { stacked: true },
              },
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Car Models by Brand" },
              },
            }}
          />
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2024 So Cool Car. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
