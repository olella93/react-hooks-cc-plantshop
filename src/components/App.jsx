import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import Search from "./Search";
import NewPlantForm from "./NewPlantForm";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingIds, setUpdatingIds] = useState(new Set());

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = () => {
    fetch("https://plantsydbjson.vercel.app/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Error fetching plants:", err));
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPlant = (newPlant) => {
    fetch("https://plantsydbjson.vercel.app/plants", {
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

  const handleMarkSoldOut = async (id) => {
    // Show loading state
    setUpdatingIds(prev => new Set(prev).add(id));
  
    try {
      // Update server
      const response = await fetch(`https://plantsydbjson.vercel.app/plants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sold_out: true }), // Always set to true
      });
  
      if (!response.ok) throw new Error('Update failed');
  
      // Update local state
      setPlants(prevPlants =>
        prevPlants.map(plant =>
          plant.id === id ? { ...plant, sold_out: true } : plant
        )
      );
  
    } catch (err) {
      console.error("Error marking sold out:", err);
    } finally {
      // Remove loading state
      setUpdatingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleDelete = (id) => {
    fetch(`https://plantsydbjson.vercel.app/plants/${id}`, {
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
        updatingIds={updatingIds}
      />
    </div>
  );
}

export default App;