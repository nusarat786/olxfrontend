import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPortal from './AdminPortal';

const AdminHeader = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    document.location.reload()
  };

  const handleHome = () => {
    navigate('/adminHome');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when closed
    }
  }, [isModalOpen]);


  return (
    <div className="container-fluid">

    {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="close-btn" onClick={handleModal}>
                  <i  className="fa-solid fa-xmark font-logo background-color-logo p-2 rounded-circle"></i>
                </button>
                <div className="modal-body mt-4">
                  <AdminPortal /> {/* Your AdminPortal component */}
                </div>
              </div>
            </div>
          )}

  

     

      <header className="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        {/* Logo centered on mobile and tablet, aligned left on desktop */}
        <div className="text-center text-md-start mb-3 mb-md-0">
          <button className="home-admin" onClick={handleHome}>
            <h2 className="text-center font-h2">ReeBuy</h2>
          </button>
        </div>

        {/* Buttons in a row below the logo on mobile and tablet, aligned right on desktop */}
        <div className="d-flex justify-content-center justify-content-md-end">
          
          <button type="button" className="btn btn-link btn-floating mx-1" onClick={handleModal}>
            <i title='menu' className="fa-solid fa-bars font-logo background-color-logo p-2 rounded-circle"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1" onClick={handleLogout}>
            <i title='logout' className="fas fa-sign-out font-logo background-color-logo p-2 rounded-circle"></i>
          </button>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;