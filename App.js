import React, { useState, useEffect } from 'react';
import { addCookie, getAllCookies } from './services/api';

function App() {
  const [cookies, setCookies] = useState([]);
  const [formData, setFormData] = useState({
    cookieName: '',
    flavor: '',
    price: '',
    quantityAvailable: ''
  });

  useEffect(() => {
    fetchCookies();
  }, []);

  const fetchCookies = async () => {
    try {
      const response = await getAllCookies();
      setCookies(response.data);
    } catch (error) {
      console.error('Error fetching cookies:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCookie({
        ...formData,
        price: parseFloat(formData.price),
        quantityAvailable: parseInt(formData.quantityAvailable)
      });
      setFormData({ cookieName: '', flavor: '', price: '', quantityAvailable: '' });
      fetchCookies();
    } catch (error) {
      console.error('Error adding cookie:', error);
    }
  };

  return (
    <div>
      <h1>Cookie Store Management</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cookieName"
          placeholder="Cookie Name"
          value={formData.cookieName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="flavor"
          placeholder="Flavor (Chocolate, Vanilla...)"
          value={formData.flavor}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantityAvailable"
          placeholder="Quantity"
          value={formData.quantityAvailable}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Cookie</button>
      </form>

      <select defaultValue="All Cookies">
        <option value="All Cookies">All Cookies</option>
      </select>

      {cookies.length === 0 ? (
        <p>No cookies available</p>
      ) : (
        <div>
          {cookies.map(cookie => (
            <div key={cookie.id}>
              <h3>{cookie.cookieName}</h3>
              <p>Flavor: {cookie.flavor}</p>
              <p>Price: ${cookie.price}</p>
              <p>Quantity: {cookie.quantityAvailable}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;