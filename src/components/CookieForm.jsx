import React, { useState } from "react";

function CookieForm({ onAdd }) {
  const [formData, setFormData] = useState({
    cookieName: "",
    flavor: "",
    price: "",
    quantityAvailable: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.cookieName ||
      !formData.flavor ||
      !formData.price ||
      !formData.quantityAvailable
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    if (parseInt(formData.quantityAvailable) <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    await onAdd({
      ...formData,
      price: parseFloat(formData.price),
      quantityAvailable: parseInt(formData.quantityAvailable),
    });
    setFormData({ cookieName: "", flavor: "", price: "", quantityAvailable: "" });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
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
          min="0.01"
          step="0.01"
          required
        />
        <input
          type="number"
          name="quantityAvailable"
          placeholder="Quantity"
          value={formData.quantityAvailable}
          onChange={handleInputChange}
          min="1"
          required
        />
        <button type="submit">Add Cookie</button>
      </form>
      {error && <div className="error">{error}</div>}
    </>
  );
}

export default CookieForm;
