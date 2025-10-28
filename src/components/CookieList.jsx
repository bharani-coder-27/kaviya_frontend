import React from "react";

function CookieList({ cookies, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <div className="error">{error}</div>;
  if (!cookies || cookies.length === 0) return <p>No cookies available</p>;

  return (
    <div className="cookies-grid">
      {cookies.map((cookie) => (
        <div key={cookie.id} className="cookie-card">
          <h3>{cookie.cookieName}</h3>
          <p>Flavor: {cookie.flavor}</p>
          <p>Price: ${cookie.price}</p>
          <p>Quantity: {cookie.quantityAvailable}</p>
        </div>
      ))}
    </div>
  );
}

export default CookieList;
