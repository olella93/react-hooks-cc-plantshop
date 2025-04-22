import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ 
  plants, 
  handleAddPlant, 
  handleSearch, 
  handleMarkSoldOut, 
  handleDelete,
  updatingIds  
}) {
  return (
    <main>
      <NewPlantForm handleAddPlant={handleAddPlant} />
      <Search handleSearch={handleSearch} />
      <PlantList
        plants={plants}
        handleMarkSoldOut={handleMarkSoldOut}
        handleDelete={handleDelete}
        updatingIds={updatingIds} 
      />
    </main>
  );
}

export default PlantPage;