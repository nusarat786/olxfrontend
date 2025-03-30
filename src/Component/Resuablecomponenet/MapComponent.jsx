import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ mainLocation }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapContainer = document.getElementById("map");
      if (!mapContainer) {
        console.error("Map container not found");
        return;
      }

      // Check if mainLocation is valid
      if (!mainLocation || !mainLocation.latitude || !mainLocation.longitude) {
        console.error("Invalid product location");
        return;
      }

      const productLocation = {
        lat: mainLocation.latitude,
        lng: mainLocation.longitude,
      };

      // Initialize Map if not already initialized
      if (!mapRef.current) {
        mapRef.current = L.map("map", {
          dragging: false, // Disable dragging
          touchZoom: false, // Disable touch zoom
          scrollWheelZoom: false, // Disable scroll wheel zoom
          doubleClickZoom: false, // Disable double-click zoom
          zoomControl: false, // Disable zoom control
          boxZoom: false, // Disable box zoom
          keyboard: false, // Disable keyboard navigation
        }).setView([productLocation.lat, productLocation.lng], 15); // Zoomed in on product location

        // Add OpenStreetMap Tile Layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current);

        // Add a transparent pink circle for the product location
        const pinkCircle = L.circle([productLocation.lat, productLocation.lng], {
          color: "pink", // Circle border color
          fillColor: "pink", // Circle fill color
          fillOpacity: 0.2, // Transparent fill
          radius: 500, // Radius in meters
        }).addTo(mapRef.current);

        // Add a click event to the circle to open Google Maps
        pinkCircle.on("click", () => {
          const url = `https://www.google.com/maps/search/?api=1&query=${productLocation.lat},${productLocation.lng}`;
          window.open(url, "_blank");
        });

        // Add a marker for the product location (optional)
        const productIcon = L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // You can use any icon here
          iconSize: [32, 32],
        });

        L.marker([productLocation.lat, productLocation.lng], { icon: productIcon })
          .bindTooltip("Product Location", { permanent: true, direction: "top" }) // Permanent tooltip
          .addTo(mapRef.current);
      }
    };

    // Delay initialization to ensure the DOM is ready
    const timeoutId = setTimeout(initializeMap, 100); // 100ms delay

    // Cleanup function
    return () => {
      clearTimeout(timeoutId); // Clear timeout
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mainLocation]);

  return (
    <div>
      {/* Map Container */}
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default MapComponent;
// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// const MapComponent = ({ mainLocation }) => {
//   const mapRef = useRef(null);
//   const routingControlRef = useRef(null);
//   const [distance, setDistance] = useState(null);

//   useEffect(() => {
//     const initializeMap = () => {
//       const mapContainer = document.getElementById("map");
//       if (!mapContainer) {
//         console.error("Map container not found");
//         return;
//       }

//       // Check if mainLocation is valid
//       if (!mainLocation || !mainLocation.latitude || !mainLocation.longitude) {
//         console.error("Invalid product location");
//         return;
//       }

//       // Retrieve user's stored location from localStorage
//       const storedLocation = JSON.parse(localStorage.getItem("mainLocation"));
//       if (!storedLocation || !storedLocation.latitude || !storedLocation.longitude) {
//         console.error("Invalid user location in localStorage");
//         return;
//       }

//       const userLocation = {
//         lat: storedLocation.latitude,
//         lng: storedLocation.longitude,
//       };

//       const productLocation = {
//         lat: mainLocation.latitude,
//         lng: mainLocation.longitude,
//       };

//       // Initialize Map if not already initialized
//       if (!mapRef.current) {
//         mapRef.current = L.map("map", {
//           dragging: false, // Disable dragging
//           touchZoom: false, // Disable touch zoom
//           scrollWheelZoom: false, // Disable scroll wheel zoom
//           doubleClickZoom: false, // Disable double-click zoom
//           zoomControl: false, // Disable zoom control
//           boxZoom: false, // Disable box zoom
//           keyboard: false, // Disable keyboard navigation
//         }).setView([userLocation.lat, userLocation.lng], 13);

//         // Add OpenStreetMap Tile Layer
//         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//           attribution: "&copy; OpenStreetMap contributors",
//         }).addTo(mapRef.current);

//         // Add Markers with the same icon
//         const locationIcon = L.icon({
//           iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Same icon for both locations
//           iconSize: [32, 32],
//         });

//         // Add "Your Location" marker
//         L.marker([userLocation.lat, userLocation.lng], { icon: locationIcon })
//           .bindTooltip("Your Location", { permanent: true, direction: "top" }) // Permanent tooltip
//           .addTo(mapRef.current);

//         // Add "Product Location" marker
//         L.marker([productLocation.lat, productLocation.lng], { icon: locationIcon })
//           .bindTooltip("Product Location", { permanent: true, direction: "top" }) // Permanent tooltip
//           .addTo(mapRef.current);

//         // Add Routing Control
//         routingControlRef.current = L.Routing.control({
//           waypoints: [
//             L.latLng(userLocation.lat, userLocation.lng),
//             L.latLng(productLocation.lat, productLocation.lng),
//           ],
//           routeWhileDragging: false,
//           show: false, // Hide the routing control UI
//         }).addTo(mapRef.current);

//         // Listen for routing events
//         routingControlRef.current.on("routesfound", (e) => {
//           const routes = e.routes;
//           const totalDistance = routes[0].summary.totalDistance / 1000; // Convert meters to kilometers
//           setDistance(totalDistance.toFixed(2) + " km");
//         });

//         // Zoom the map to fit both locations
//         const bounds = L.latLngBounds([
//           [userLocation.lat, userLocation.lng],
//           [productLocation.lat, productLocation.lng],
//         ]);
//         mapRef.current.fitBounds(bounds);
//       }
//     };

//     // Delay initialization to ensure the DOM is ready
//     const timeoutId = setTimeout(initializeMap, 100); // 100ms delay

//     // Cleanup function
//     return () => {
//       clearTimeout(timeoutId); // Clear timeout
//       if (routingControlRef.current) {
//         routingControlRef.current.getPlan().setWaypoints([]); // Clear waypoints
//         routingControlRef.current.remove(); // Remove routing control
//       }
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, [mainLocation]);

//   // Function to open Google Maps in a new tab
//   const openGoogleMaps = () => {
//     const { latitude, longitude } = mainLocation;
//     const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <div>
//       {/* Button to open Google Maps */}
//       <button
//         onClick={openGoogleMaps}
//         style={{
//           marginBottom: "10px",
//           padding: "10px 20px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Open Product Location in Google Maps
//       </button>

//       {/* Map Container */}
//       <div id="map" style={{ height: "500px", width: "100%" }}></div>

//       {/* Display Total Distance */}
//       {distance && (
//         <p style={{ marginTop: "10px", fontSize: "16px", fontWeight: "bold" }}>
//           Total Distance: {distance}
//         </p>
//       )}
//     </div>
//   );
// };

// export default MapComponent;