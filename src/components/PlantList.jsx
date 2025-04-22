import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, handleMarkSoldOut, handleDelete, updatingIds }) {
  return (
    <div className="cards">
      {plants.map(plant => (
        <PlantCard
          key={plant.id}
          plant={plant}
          handleMarkSoldOut={handleMarkSoldOut}
          handleDelete={handleDelete}
          isUpdating={updatingIds.has(plant.id)} 
        />
      ))}
    </div>
  );
}

export default PlantList;