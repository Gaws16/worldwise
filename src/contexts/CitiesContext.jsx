import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:3001";
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  async function getCurrentCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      alert("An error occurred while fetching cities:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      await response.json();
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("An error occurred while deleting city:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    console.log(newCity);
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      setCurrentCity(data);
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("An error occurred while creating city:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert("An error occurred while fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  const contextValues = {
    cities,
    isLoading,
    currentCity,
    getCurrentCity,
    createCity,
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={contextValues}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}
export { CitiesProvider, useCities };
