import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/delete/loaded":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    case "city/create/loaded":
      return {
        ...state, // makes no sense right now but if we add more state this would be better
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    //TODO add error state
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
const BASE_URL = "http://localhost:3001";
function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const getCurrentCity = useCallback(async function getCurrentCity(id) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      alert("An error occurred while fetching cities:", error);
    }
  }, []);

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      await response.json();
      dispatch({ type: "city/delete/loaded", payload: id });
    } catch (error) {
      alert("An error occurred while deleting city:", error);
    }
  }

  async function createCity(newCity) {
    console.log(newCity);
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      dispatch({ type: "city/create/loaded", payload: data });
    } catch (error) {
      alert("An error occurred while creating city:", error);
    }
  }
  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        alert("An error occurred while fetching cities:", error);
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
