import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClickableCard from './ClickableCard';

const AdminPortal = ({handleModal}) => {

  
  // Dummy data for demonstration
  const emp = {
    _id: 'EMP123',
    firstName: 'John',
    lastName: 'Doe',
    position: 'Manager',
    employeePhotoo: 'https://via.placeholder.com/120', // Placeholder image URL
  };

  const lreq = [
    { status: 'ACCEPTED' },
    { status: 'REJECTED' },
    { status: 'PENDING' },
    // Add more dummy data as needed
  ];

  const accepted_request = lreq.filter((l) => l.status === 'ACCEPTED').length;
  const rejected_request = lreq.filter((l) => l.status === 'REJECTED').length;
  const pending_request = lreq.filter((l) => l.status === 'PENDING').length;

  const redirectToLink = (link) => {
    window.location.href = link;
  };

  const redirectToLink2 = (link) => {


    const today = new Date();
    const currentDate = `${('0' + today.getDate()).slice(-2)}-${('0' + (today.getMonth() + 1)).slice(-2)}-${today.getFullYear()}`;
    window.location.href = `${link}?date=${currentDate}`;

  };

  return (
    <div className="container-fluid mb-5 v50">
      {/* Admin Portal Section */}
      {/* Employee Portal Section */}
      <div className="row mt-3">
          <ClickableCard
            url={`/admin/category`}
            text={"Category"}
            ficon={"fa-solid fa-list"}
            // handleModal={handleModal}
          />
          <ClickableCard
            url={`/admin/sub-category`}
            text={"Sub Category"}
            ficon={"fa-solid fa-filter"}
        />
        
        <ClickableCard
            url={`/admin/Location`}
            text={"Location"}
            ficon={"fa-solid fa-location-dot"}
        />

      <ClickableCard
            url={`/admin/admin`}
            text={"Admin"}
            ficon={"fa-solid fa-user"}
        />
               

        {/* <ClickableCard
            url={`/admin/user`}
            text={"User"}
            ficon={"fa-solid fa-user"}
        />
        
        <ClickableCard
            url={`/admin/analytix`}
            text={"Analytix"}
            ficon={"fa-solid fa-chart-simple"}
        /> */}

        
        
        {/* <ClickableCard
            url={`/admin/employee/${emp._id}`}
            text={"Click It"}
            imageSrc={"../../Images/admin_png.png"}
        /> */}

        {/* <div className="row p-3 tht">
          <ClickableCard
            url={`/admin/employee/${emp._id}`}
            text={"Category"}
            ficon={"fa-solid fa-list"}
          />
          <ClickableCard
            url={`/admin/employee/${emp._id}`}
            text={"Click It"}
            imageSrc={"../../Images/admin_png.png"}
        />
        
        <ClickableCard
            url={`/admin/employee/${emp._id}`}
            text={"Click It"}
            imageSrc={"../../Images/admin_png.png"}
        />
               
        </div> */}
      </div>
    </div>
  );
};

export default AdminPortal;