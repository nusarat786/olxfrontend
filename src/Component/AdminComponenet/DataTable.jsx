import React, { useState } from "react";

const DataTable = ({ columns, data, onEdit, onDelete, onAdd }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100); // Default items per page
  const [searchTerm, setSearchTerm] = useState("");

  // Page size options
  const pageSizeOptions = [100, 50, 25, 10, 5];

  // Filter data based on search term
  const filteredData = data?.filter((row) =>
    columns.some((col) =>
      String(row[col.field]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div>
      {/* Search and Page Size Dropdown */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control login-input "
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}

        />

      </div>

      {/* Search and Page Size Dropdown */}
      <div className="d-flex justify-content-between mb-3">
        <button className="category-button" onClick={onAdd}>
          Add
        </button>


        <select
          className="form-select w-auto "
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table ">
          <thead className=""
            style={{ background: 'var(--gradient-1l)', color: 'white' }}

          >

            <tr style={{ background: 'var(--gradient-1l)' }} >
              {columns.map((col, index) => (
                <th key={index} className="text-center"
                  style={{ color: 'white', backgroundColor: 'var(--gc1)' }}
                >
                  {col.label}
                </th>
              ))}
              <th
                // style={{color:'white',backgroundColor:'var(--gc2)'}}
                className="text-center "
                style={{ color: 'white', backgroundColor: 'var(--gc1)' }}

              >Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="text-center">
                    {row[col.field]}
                  </td>
                ))}
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary mx-1 mt-2 category-button"
                    onClick={() => onEdit(row?.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger mx-1 mt-2 category-button"
                    onClick={() => onDelete(row?.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "category-button" : ""
                  }`}
              >
                <button
                  className="category-button"
                  // category-button
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default DataTable;
