import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CookieForm from "./components/CookieForm";
import CookieList from "./components/CookieList";
import {
  addCookie,
  getAllCookies,
  getCookiesByFlavor,
  getCookiesSortedByPrice,
} from "./services/api";
import "./App.css";

function App() {
  const [cookies, setCookies] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [flavorFilter, setFlavorFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCookies = async () => {
    setLoading(true);
    setError("");
    try {
      let response;
      if (filterOption === "flavor" && flavorFilter) {
        response = await getCookiesByFlavor(flavorFilter);
      } else if (filterOption === "price") {
        response = await getCookiesSortedByPrice();
      } else {
        response = await getAllCookies();
      }
      setCookies(response.data);
    } catch (err) {
      setError("Failed to fetch cookies");
      console.error("Error fetching cookies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCookie = async (cookieData) => {
    try {
      await addCookie(cookieData);
      fetchCookies();
    } catch (err) {
      setError("Failed to add cookie");
      console.error("Error adding cookie:", err);
    }
  };

  useEffect(() => {
    fetchCookies();
  }, [filterOption, flavorFilter]);

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    if (e.target.value !== "flavor") {
      setFlavorFilter("");
    }
  };

  const handleFlavorFilterChange = (e) => {
    setFlavorFilter(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Cookie Store Management</h1>

        <CookieForm onAdd={handleAddCookie} />

        <div className="filters">
          <label>View Options:</label>
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="all">All Cookies</option>
            <option value="flavor">Filter by Flavor</option>
            <option value="price">Sort by Price</option>
          </select>

          {filterOption === "flavor" && (
            <input
              type="text"
              placeholder="Enter flavor (e.g., Chocolate, Vanilla)"
              value={flavorFilter}
              onChange={handleFlavorFilterChange}
            />
          )}
        </div>

        <CookieList cookies={cookies} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;
