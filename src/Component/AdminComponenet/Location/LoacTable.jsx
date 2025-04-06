import axios from "axios";
import React, { useState } from "react";

const LocTable = ({ data, onEdit, onDelete, onAdd }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [data2, setData2] = useState(data);
  

  const columns = [
    {
        "label": "id",
        "field": "id"
    },
    {
        "label": "name",
        "field": "name"
    },
    {
      "label": "type",
      "field": "type"
    },
   
]
  
  
  const pageSizeOptions = [100, 50, 25, 10, 5];

  // Filter data based on search term
  const filteredData = data2?.filter((row) =>
    columns.some((col) =>
      String(row[col.field]).toLowerCase().includes(searchTerm.toLowerCase())
  ));

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem) || [];

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    await searchLocation(value);
  };

  const searchLocation = async (searchTerm) => {
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
      setData2(response?.data?.data?.location || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setData2([]);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid p-3">
      {/* Search and Page Size Controls */}
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control login-input"
            placeholder="Search..."
            value={searchTerm}
            
            onChange={handleSearch}
          />
          
        </div>

        <select
          className="form-select w-auto"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

      <>
      <button className="category-button mb-4" onClick={onAdd}>
            Add 
      </button>
      </>

      {/* Table */}
      <div className="table-responsive rounded-3 overflow-hidden mb-5">
        <table className="table table-hover mb-0">
          <thead style={{ background: 'var(--gradient-1l)', color: 'white' }}>
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className="text-center py-3"
                  style={{ color: 'white', backgroundColor: 'var(--gc1)' }}
                >
                  {col.label}
                </th>
              ))}
              <th 
                className="text-center py-3"
                style={{ color: 'white', backgroundColor: 'var(--gc1)' }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="text-center align-middle">
                      {row[col.field]}
                    </td>
                  ))}
                  <td className="text-center align-middle">
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className=" category-button"
                        onClick={() => onEdit(row?.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger category-button"
                        onClick={() => onDelete(row?.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4">
                  please search for location
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > itemsPerPage && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            {Array.from(
              { length: Math.ceil(filteredData.length / itemsPerPage) },
              (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className=" category-button"
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default LocTable;