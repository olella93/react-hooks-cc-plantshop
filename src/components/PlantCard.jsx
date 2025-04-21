import React from "react";

function PlantCard({ plant, handleMarkSoldOut }) {
  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>Price: ${plant.price}</p>
      <button 
        className="stock-button" 
        onClick={() => handleMarkSoldOut(plant.id)}
      >
        {plant.sold_out ? "Sold Out" : "In Stock"}
      </button>
    </div>
  );
}

export default PlantCard;
