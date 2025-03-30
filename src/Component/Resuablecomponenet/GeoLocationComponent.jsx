import React, { useState, useEffect } from "react";

const GeolocationComponent = () => {
  const [latitude, setLatitude] = useState(null); // State for latitude
  const [longitude, setLongitude] = useState(null); // State for longitude
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Check if Geolocation is supported
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success callback
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => {
        // Error callback
        setError("Unable to retrieve your location.");
        console.error(err);
      }
    );
  }, []); // Run only once on component mount

  return (
    <div>
      <h1>Get User Location</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeolocationComponent;