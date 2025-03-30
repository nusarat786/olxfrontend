 import axios from "axios";
 const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude || "Not available",
            accuracy: position.coords.accuracy,
          };

  
          // Save to local storage
          localStorage.setItem("userLocation", JSON.stringify(locationData));
  
          resolve(locationData);
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  };

  const getMainLocation = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/location/getcClosestLocation`, data
        ,{
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('response',response);
      if (response.data.success === true) {

      }
      else {
        console.log("Login failed");
      }
    } catch (error) {
      
    }
  };
export default getUserLocation