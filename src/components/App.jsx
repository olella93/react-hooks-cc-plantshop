import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import Search from "./Search";
import NewPlantForm from "./NewPlantForm";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  // Handle searching plants by name
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  // Filter plants based on searchTerm
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new plant
  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => setPlants((prevPlants) => [...prevPlants, data]))
      .catch((err) => console.error("Error adding plant:", err));
  };

  // Handle marking a plant as sold out
  const handleMarkSoldOut = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sold_out: true }),
    })
      .then((res) => res.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === id ? updatedPlant : plant
          )
        );
      })
      .catch((err) => console.error("Error updating plant:", err));
  };

  return (
    <div className="App">
      <h1>🌱 Plantsy</h1>
      <Search handleSearch={handleSearch} /> 
      <NewPlantForm handleAddPlant={handleAddPlant} /> 
      <PlantList
        plants={filteredPlants}
        handleMarkSoldOut={handleMarkSoldOut} 
      /> {/* Plant List */}
    </div>
  );
}

export default App;
