import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, handleMarkSoldOut }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <li key={plant.id}>
          <PlantCard
            plant={plant}
            handleMarkSoldOut={handleMarkSoldOut}
          />
        </li>
      ))}
    </ul>
  );
}

export default PlantList;
