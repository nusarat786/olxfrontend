import axios from "axios";
const setTokenWithExpiry = (token) => {
    const expiryTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const tokenData = {
      value: token,
      expiry: expiryTime,
    };
    localStorage.setItem("token", JSON.stringify(tokenData));
  };

  const setTokenWithExpiryAdmin = (token) => {
    const expiryTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const tokenData = {
      value: token,
      expiry: expiryTime,
    };
    localStorage.setItem("adminToken", JSON.stringify(tokenData));
  };
  

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2); // Distance in km
}


const fetchFromApi = async (data,endPoint,dataname ,setData,setLoading,setToastObject) => {
  setLoading(true);
  const mainLocation = JSON.parse(localStorage.getItem("mainLocation"));
  console.log(mainLocation);
  const token = JSON.parse(localStorage.getItem("token")).value
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${endPoint}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    console.log(response.data.data[dataname]);
    setData(response.data.data[dataname]); // Update options with API response
    setToastObject({
      message: response?.data?.message,
      show: true,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);

    setToastObject({
      message: error?.response?.data?.message || 'An error occurred',
      show: true,
    });

  } finally {
    setLoading(false);
  }
};


const fetchFromApi2 = async (data,endPoint,dataname ,setData,setLoading,setToastObject) => {
  setLoading(true);
  const mainLocation = JSON.parse(localStorage.getItem("mainLocation"));
  console.log(mainLocation);
  const token = JSON.parse(localStorage.getItem("token"))?.value
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${endPoint}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    console.log(response.data.data[dataname]);
    setData(response.data.data[dataname]); // Update options with API response
    setToastObject({
      message: response?.data?.message,
      show: true,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);

    setToastObject({
      message: error?.response?.data?.message || 'An error occurred',
      show: true,
    });

  } finally {
    setLoading(false);
  }
};

const fetchFromApi3 = async (data,endPoint,dataname ,setData,setLoading,setToastObject,setCategory) => {
  setLoading(true);
  const mainLocation = JSON.parse(localStorage.getItem("mainLocation"));
  console.log(mainLocation);
  const token = JSON.parse(localStorage.getItem("token")).value
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${endPoint}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    console.log(response.data.data[dataname]);
    setData(response.data.data[dataname]); // Update options with API response
    setToastObject({
      message: response?.data?.message,
      show: true,
    });


  } catch (error) {
    console.error("Error fetching locations:", error);

    setToastObject({
      message: error?.response?.data?.message || 'An error occurred',
      show: true,
    });

  } finally {
    setLoading(false);
  }
};
// const fetchFromApi3 = async (data,endPoint,dataname ,setData,setLoading,setToastObject,setStates,setCities) => {
//   setLoading(true);
//   const mainLocation = JSON.parse(localStorage.getItem("mainLocation"));
//   console.log(mainLocation);
//   const token = JSON.parse(localStorage.getItem("token")).value
//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_URL}${endPoint}`,
//       data,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         }
//       }
//     );
//     console.log(response.data.data[dataname]);
//     setData(response.data.data[dataname]); // Update options with API response
//     setToastObject({
//       message: response?.data?.message,
//       show: true,
//     });
//   } catch (error) {
//     console.error("Error fetching locations:", error);

//     setToastObject({
//       message: error?.response?.data?.message || 'An error occurred',
//       show: true,
//     });

//   } finally {
//     setLoading(false);
//   }
// };


const fetchFromApi4 = async (data,endPoint,dataname ,setData,setLoading,setToastObject,setValue) => {
  setLoading(true);
  const mainLocation = JSON.parse(localStorage.getItem("mainLocation"));
  console.log(mainLocation);
  const token = JSON.parse(localStorage.getItem("token")).value
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${endPoint}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    console.log(response.data.data[dataname]);
    setData(response.data.data[dataname]); // Update options with API response
    setToastObject({
      message: response?.data?.message,
      show: true,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);

    setToastObject({
      message: error?.response?.data?.message || 'An error occurred',
      show: true,
    });

  } finally {
    setLoading(false);
  }
};

const setUserId = (id) => {
  const expiryTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  const tokenData = {
    value: id,
    expiry: expiryTime,
  };
  localStorage.setItem("id", JSON.stringify(tokenData));
};
  export {fetchFromApi4, fetchFromApi3,fetchFromApi2, setTokenWithExpiry,setTokenWithExpiryAdmin,getDistance,fetchFromApi,setUserId };