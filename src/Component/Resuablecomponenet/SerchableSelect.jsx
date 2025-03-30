import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./CustomDropdown.css"; // Custom CSS for the dropdown
import getUserLocation from "./getUserLocation.ts";
import { useNavigate } from "react-router-dom";

const CustomDropdown = ({ placeholder = "Select an option", Option }) => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [selectedOption, setSelectedOption] = useState(null); // Selected option state
  const [options, setOptions] = useState(Option || []); // Options state
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const [location, setLocation] = useState(null);

  const navigate =  useNavigate()
  useEffect(() => {
    
    const location = JSON.parse(localStorage.getItem("mainLocation"));
    setLocation(location.name);
    console.log(location);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Function to search locations via API
  const searchLocation = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/location/searchLocation`,
        { searchTerm },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setOptions(response.data.data.location); // Update options with API response
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to get the closest location
  // const getMainLocation = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/admin/location/getClosestLocation`,
  //       data,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );
  //     localStorage.setItem("mainLocation", JSON.stringify(response.data.data.location));
  //     localStorage.setItem("locId", JSON.stringify(response.data.data.location.id));
  //   } catch (error) {
  //     const defaultLocation = {
  //       _id: "67968cba818c479d8c80fbc7",
  //       id: 1000001,
  //       name: "India",
  //       type: "COUNTRY",
  //       longitude: 78.9629,
  //       latitude: 20.5937,
  //     };
  //     localStorage.setItem("mainLocation", JSON.stringify(defaultLocation));
  //     localStorage.setItem("locId", JSON.stringify(defaultLocation.id));
  //   }
  // };

  // Handle clicking outside the dropdown to close it


  // Handle option selection
  const handleSelect = (option) => {
    setSelectedOption(option.name);
    setIsOpen(false); // Close dropdown after selection
    setSearchTerm(""); // Clear search term
    // Store selected option in local storage
    localStorage.setItem("mainLocation", JSON.stringify(option));
    localStorage.setItem("locId", JSON.stringify(option.id));
    document.location.reload();
  };

  // Handle search input change
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 2) {
      await searchLocation(value);
    }
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      {/* Dropdown Toggle */}
      <div
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || placeholder}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          {/* Search Input */}
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {/* Options List */}
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <ul className="options-list">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="option-item"
                  onClick={() => handleSelect(option)}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import "./CustomDropdown.css"; // Custom CSS for the dropdown
// import getUserLocation from "./getUserLocation.ts";

// const CustomDropdown = ({placeholder = "Select an option",Option }) => {
//   const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
//   const [searchTerm, setSearchTerm] = useState(""); // Search term state
//   const [selectedOption, setSelectedOption] = useState(null); // Selected option state
//   const dropdownRef = useRef(null); // Ref for the dropdown container
//   const [location, setLocation] = useState(null);
  
//   const [options,setOptions] = useState(Option)

//   const sarchLocation = async (data) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/location/searchLocation`, data
//         ,{
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       )
//       console.log('response',response);
//       setOptions(response.data.data.location)

//     } catch (error) {
//       console.log(error)
//     }
//   };

  


//   // Filter options based on search term
//   const filteredOptions = async ()=>{
//     await sarchLocation();
//     return options.filter((option) =>
//     option.toLowerCase().includes(searchTerm.toLowerCase())
//   )
// }

//   const getMainLocation = async (data) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/location/getcClosestLocation`, data
//         ,{
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       )
//       console.log('response',response);
//       localStorage.setItem("mainLocation", JSON.stringify(response.data.data.location));
//       localStorage.setItem("locId", JSON.stringify(response.data.data.location.id));

//     } catch (error) {
//       const loc = {
//         _id: "67968cba818c479d8c80fbc7",
//         id: 1000001,
//         name: "India",
//         type: "COUNTRY",
//         longitude: 78.9629,
//         latitude: 20.5937,
//       }
//       localStorage.setItem("mainLocation", JSON.stringify(loc));
//       localStorage.setItem("locId", JSON.stringify(loc.id));

//     }
//   };


//   // Handle clicking outside the dropdown to close it
//   useEffect(() => {

//     const fetchLocation = async () => {
//         try {
//           // Check if location exists in local storage
//           const storedLocation = localStorage.getItem("userLocation");
//           let loc;
//           if (storedLocation) {
//             loc = JSON.parse(storedLocation)
//             setLocation(loc);
//           } else {
//             await getUserLocation()
//             loc = JSON.parse(storedLocation)
//             setLocation(loc);
//           }

//           await getMainLocation(loc)

//         } catch (err) {
//           console.log(err)
//         }
//       };
  
//     fetchLocation();
  
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Handle option selection
//   const handleSelect = (option) => {
//     setSelectedOption(option);
//     setIsOpen(false); // Close dropdown after selection
//     setSearchTerm(""); // Clear search term
//   };

//   return (
//     <div className="custom-dropdown" ref={dropdownRef}>
//       {/* Dropdown Toggle */}
//       <div
//         className="dropdown-toggle"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {selectedOption || placeholder}
//       </div>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="dropdown-menu">
//           {/* Search Input */}
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           {/* Options List */}
//           <ul className="options-list">
//             {filteredOptions.map((option, index) => (
//               <li
//                 key={index}
//                 className="option-item"
//                 onClick={() => handleSelect(option)}
//               >
//                 {option}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomDropdown;