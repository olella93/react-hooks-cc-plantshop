import React from "react";

function PlantCard({ plant, handleMarkSoldOut, handleDelete, isUpdating }) {
  const isExternalImage = plant.image.startsWith("http");

  return (
    <div className="plant-card" data-testid="plant-item">
      <img src={isExternalImage ? plant.image : `/${plant.image}`} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      
      {plant.sold_out ? (
        <span>Out of Stock</span>
      ) : (
        <button 
          onClick={() => handleMarkSoldOut(plant.id)}
          disabled={isUpdating}
          className="mark-sold-out-btn"
        >
          {isUpdating ? "Marking..." : "In Stock"}
        </button>
      )}

      <button 
        onClick={() => handleDelete(plant.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
}

export default PlantCard;