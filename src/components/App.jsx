import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants on mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  // Add new plant
  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => setPlants((prevPlants) => [...prevPlants, data]));
  };

  // Mark plant as sold out
  const handleMarkSoldOut = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sold_out: true }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === id ? updatedPlant : plant
          )
        );
      });
  };

  return (
    <div>
      <h1>Plantsy Admin</h1>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <PlantList
        plants={plants}
        searchTerm={searchTerm}
        handleMarkSoldOut={handleMarkSoldOut}
      />

      <NewPlantForm handleAddPlant={handleAddPlant} />
    </div>
  );
}

export default App;
