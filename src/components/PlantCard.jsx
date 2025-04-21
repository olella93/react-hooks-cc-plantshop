import React from "react";

function PlantCard({ plant }) {
  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>Price: ${plant.price}</p>
      <button className="stock-button">In Stock</button>
    </div>
  );
}

export default PlantCard;
