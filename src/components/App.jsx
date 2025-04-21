import React, { useEffect, useState } from "react";

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  return (
    <div className="App">
      <h1>🌱 Plantsy</h1>
      <h2>All Plants</h2>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            {plant.name} - ${plant.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
