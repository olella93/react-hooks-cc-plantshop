import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ plants, handleAddPlant, handleSearch, handleMarkSoldOut, handleDelete }) {
  return (
    <main>
      <NewPlantForm handleAddPlant={handleAddPlant} /> 
      <Search handleSearch={handleSearch} /> 
      <PlantList
        plants={plants}
        handleMarkSoldOut={handleMarkSoldOut}
        handleDelete={handleDelete} 
      /> {/* Plant List */}
    </main>
  );
}

export default PlantPage;
