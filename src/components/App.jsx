import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import Search from "./Search";
import NewPlantForm from "./NewPlantForm";
import PlantPage from "./PlantPage";

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

 // Handle toggling a plant's sold_out status
 const handleMarkSoldOut = (id) => {
  const plantToUpdate = plants.find((plant) => plant.id === id);
  const updatedSoldOutStatus = !plantToUpdate.sold_out;

  fetch(`http://localhost:6001/plants/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sold_out: updatedSoldOutStatus }),
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

   // Handle deleting a plant
   const handleDelete = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPlants((prevPlants) =>
          prevPlants.filter((plant) => plant.id !== id)
        );
      })
      .catch((err) => console.error("Error deleting plant:", err));
  };

  return (
    <div className="App">
      <h1>🌱 Plantsy</h1>
      <PlantPage
        plants={filteredPlants} 
        handleAddPlant={handleAddPlant} 
        handleSearch={handleSearch} 
        handleMarkSoldOut={handleMarkSoldOut} 
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
