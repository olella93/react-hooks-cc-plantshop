import React from "react";

function PlantCard({ plant, handleMarkSoldOut, handleDelete, isUpdating }) {
  const isExternalImage = plant.image.startsWith("http");

  return (
    <div className="plant-card">
      <img 
        src={isExternalImage ? plant.image : `/${plant.image}`}
        alt={plant.name} 
      />
      <h3>{plant.name}</h3>
      <p>Price: ${plant.price}</p>
      <p>Status: {plant.sold_out ? "Sold Out" : "In Stock"}</p>
      
      
      {!plant.sold_out && (
        <button 
          onClick={() => handleMarkSoldOut(plant.id)}
          disabled={isUpdating}
          className="mark-sold-out-btn"
        >
          {isUpdating ? "Marking..." : "Mark as Sold Out"}
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