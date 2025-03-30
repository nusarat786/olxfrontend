import React, { use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Custom CSS for the layout
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SearchableSelect from "./SerchableSelect";
import { fetchFromApi2 } from "../Helper/functions";
import LoadingSpinner from "../Helper/loadingSpinner";
import ToastmMessage from "../Helper/ToastmMessage";
import { set } from "react-hook-form";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure the modal is above other content
  },
  modalContent: {
    backgroundColor: '#fff', // White background
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a shadow for better visibility
    width: '500px', // Set a fixed width for the modal
    textAlign: 'center',
    zIndex: 1001, // Ensure the modal content is above the overlay

  },
};


const Modal = ({ isOpen, onClose, categoryName }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{categoryName}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


const Navbar = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('text') || '';
  
  const url = document.URL;
  const serchCat = url.includes("search");

  console.log(serchCat);
  //const [serchCat,setSerchCat] = useState(url.includes("search"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const loc = JSON.parse(localStorage.getItem("mainLocation")).name;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [searchText, setSearchText] = useState(decodeURIComponent(search));

  const navigate = useNavigate();

  const [toastObject, setToastObject] = useState({
    show: false,
    message: '',
  });

  useEffect(() => {

    fetchFromApi2(
      {},
      '/admin/category/getCategories',
      'categories',
      setCategories,
      setLoading,
      setToastObject
    );
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  const handleLogout = () => {
    toggleDrawer();
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    document.location.reload();
  };

  // Example categories (can be dynamically populated via props or API)
  const categories2 = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Vehicles",
    "Sports",
    "Toys",
    "Books",
    "Pets",
  ];

  const locations = [
    "Bangalore",
    "Chennai",
    "Delhi",
    "Hyderabad",
    "Mumbai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
  ];

  const navigatTo = (endPoint) => {
    navigate(endPoint);
  }


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const categorySelect = (e ,cat) => {
    e.preventDefault()
    if(serchCat){
      closeModal();
      setToastObject({ message: `Category Selected  ${cat.name}`, show: true });
      localStorage.setItem("selectedCategory", JSON.stringify({name:cat.name,id:cat._id}));

      //navigate(`/search/?text=${searchText}&catId=${cat._id}`);
      if(searchText){
        document.location.href = `/search?text=${searchText}`;
        //navigate(`/search?text=${searchText}`);
      }
  }else{
    closeModal();
    setToastObject({ message: `Category Selected  ${cat.name}`, show: true });
    document.location.href = `/productByCategory/${cat.name}_${cat._id}`;
    };
  }

  const selectParentCat = () => {
    if(serchCat){
      closeModal();
      setToastObject({ message: `Category Selected  ${selectedCategory.name}`, show: true });
      localStorage.setItem("selectedCategory", JSON.stringify({name:selectedCategory.name,id:selectedCategory._id}));


      console.log(searchText);
      //navigate(`/search/?text=${searchText}&catId=${cat._id}`);
      if(searchText){
        document.location.href = `/search?text=${searchText}`;
        //navigate(`/search?text=${searchText}`);
      }
  }else{
    closeModal();
    setToastObject({ message: `Category   ${selectedCategory.name}`, show: true });
    document.location.href = `/productByCategory/${selectedCategory.name}_${selectedCategory._id}`;
    };
  }
  // const o

  return (
    <>

      <LoadingSpinner isSubmitting={loading} />
      {toastObject.show &&
        <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
      }
      {/* Navbar */}
      <nav className="navbar navbar-light bg-nav px-3 position-sticky top-0">
        {/* First Row */}
        <div className="navbar-row">
          {/* Hamburger Menu and Logo (Grouped Together) */}
          <div className="hamburger-logo-group">
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleDrawer}
              aria-label="Toggle navigation"
            >
              <i class="fa-solid fa-bars"></i>
            </button>

            {/* Brand Logo */}
            <Link className="navbar-brand" to={"/home"}>
              {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/42/OLX_New_Logo.png"
                alt="OLX Logo"
                width="40"
                loading="lazy"
              /> */}
              <h2 class="text-center font-h2">ReeBuy</h2>
            </Link>
          </div>

          {/* Logout Button (Rightmost) */}
          <div className="logout-button">

            {/* <select className="form-select location-selector" aria-label="Default select example">
              <option selected>India</option>
              {locations.map((location, index) => (
                <option key={index}>{location}</option>
              ))}
            </select> */}

            <SearchableSelect options={locations} placeholder={loc} />

          </div>
        </div>

        {/* Second Row (Search Form) */}
        <div className="search-row">
          <div className="search-form">
            <input
              className="form-control login-input"
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />

            
            <button
              className="btn btn-outline-secondary border-none"
              // type="submit"
              aria-label="Search"
              onClick={
              () =>{ 
                //const catId  = JSON.parse(localStorage.getItem("selectedCategory"))?._id;
                document.location.href = `/search?text=${searchText}`;
                //navigate(`/search?text=${searchText}`);
              }}
            >
              <i class="fa fa-search font-logo background-color-logo p-2 rounded-circle" aria-hidden="true" style={{fontSize:'1.3rem'}}></i>
            </button>

            {search &&
            <button
              className="btn btn-outline-secondary border-none"
              // type="submit"
              aria-label="Search"
              onClick={
              () =>{ 
                //const catId  = JSON.parse(localStorage.getItem("selectedCategory"))?._id;
                //document.location.href = `/search?text=${searchText}`;
                localStorage.removeItem("selectedCategory");
                setToastObject({ message: `Category Filter Removed`, show: true });
                document.location.href = `/search?text=${searchText}`;
              }}
            >
              <i class="fa-solid fa-circle-xmark font-logo background-color-logo p-2 rounded-circle" aria-hidden="true" style={{fontSize:'1.3rem'}}></i>
            </button>
            }
            {/* <button
              className="btn btn-outline-secondary border-none"
              type="submit"
              aria-label="Search"
            >
              <i class="fa fa-search font-logo background-color-logo p-2 rounded-circle" aria-hidden="true"></i>            
            </button> */}


          </div>
        </div>

        {/* First Row */}
        {/* Third Row (Category Buttons) */}
        {/* {categories?.length > 0 && !serchCat && */}
          <div className="category-row">
            <div className="category-buttons">
              <button className="category-button" onClick={() => navigatTo("/sell")}>
                <i class="fa-solid fa-plus"></i> Sell
              </button>

              {categories.map((category, index) => (
                <button key={category._id} className="category-button" onClick={() => handleCategoryClick(category)}>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        {/* } */}
{/* 
        {serchCat &&
          <div className="category-row">
            <div className="category-buttons">
              <select 
              name="" id=""
              className='select-cat'
              >
                <option style={{background:'var(--lg2)'}} className="option-cat" value="1">1</option>
              </select>


        
            </div>
          </div>
        } */}


        {/* <div className="category-row">
          <div className="category-buttons">
            {categories.map((category, index) => (
              <button key={index} className="category-button">
                {category}
              </button>
            ))}
          </div>
        </div> */}


      </nav>

      {/* Navigation Drawer */}
      <div className={`navigation-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-header" style={{ background: 'var(--gradient-1l)' }}>
          <h5 className="" style={{ color: 'white', fontFamily: 'var(--font-dosis)', fontSize: '1.5rem', fontWeight: '700' }}>Menu</h5>
          <button className="close-btn" onClick={toggleDrawer}>
            <i class="fa-solid fa-xmark"
              style={{
                color: 'white',
                fontSize: '1.7rem'
              }}>
            </i>
          </button>
        </div>
        <ul className="drawer-menu">
          <li>
            <Link className="link-header" to={"/home"} onClick={toggleDrawer} >Home</Link>
          </li>
          <li>
            <Link className="link-header" to={"/chat"} onClick={toggleDrawer}>Chat</Link>
          </li>
          <li>
            <Link className="link-header" to={"/myProducts"} onClick={toggleDrawer}>My Product</Link>
          </li>
          <li>
            <Link className="link-header" to={"/likeProducts"} onClick={toggleDrawer}>Like</Link>
          </li>
          <li>
            <Link className="link-header" to={"/sell"} onClick={toggleDrawer}>Post Product</Link>
          </li>

          <li>
            <Link className="link-header" to={"/editDetails"} onClick={toggleDrawer}>Profile</Link>
          </li>

          <li>
            <Link className="link-header" to={"/home"} onClick={handleLogout}>Logout</Link>
          </li>

        </ul>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="overlay" onClick={toggleDrawer}></div>
      )}


      {/* Bootstrap Modal
       <div
        className={`modal fade ${isModalOpen ? 'show' : ''}`}
        style={{ display: isModalOpen ? 'block' : 'none' }}
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">
                {selectedCategory}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <p>
                This is the content for {selectedCategory}. You can add as much
                text or components here as needed. The modal will become
                scrollable if the content exceeds the height.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                More content to make the modal scrollable. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        
      </div> */}
      {/* Bootstrap Modal */}
      <div
        className={`modal fade ${isModalOpen ? 'show' : ''}`}
        style={{ display: isModalOpen ? 'block' : 'none' }}
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable col-10 col-md-8 col-lg-6">
          <div className="modal-content" style={{ width: '80%', margin: 'auto' }}>
            <div className="modal-header" style={{ background: 'var(--gradient-1l)' }}>
              <h5 className="modal-title " id="modalLabel" style={{ color: 'white', fontFamily: 'var(--font-dosis)', fontSize: '1.5rem', fontWeight: '700' }}>
                {selectedCategory?.name}
              </h5>
              <button
                type="button"
                className=""
                onClick={closeModal}
                aria-label="Close"
                style={{backgroundColor:'transparent',border:'none'}}
              >
              <i class="fa-solid fa-xmark"
              style={{
                color: 'white',
                fontSize: '1.7rem'
              }}>
            </i>
  
              </button>
            </div>
            <div className="modal-body">
              <ul className="drawer-menu">

                {selectedCategory && selectedCategory?.subCategories?.length > 0 && 
                selectedCategory?.subCategories.map((subCategory, index) => (
                <li>
                  <button className="link-header" 
                  style={{border:'none',background:'transparent',fontSize:'1.2rem'}} 
                  // to={`/productByCategory/${subCategory.name}_${subCategory._id}`} 
                  onClick={(e)=>{categorySelect(e,subCategory)}}>{subCategory?.name} </button>
                </li>
                ))}
                <li>
                  <button  
                  style={{border:'none',background:'transparent',fontSize:'1.2rem'}} 
                  className="link-header" onClick={()=>{selectParentCat()}}>All</button>
                </li>
                
              </ul>


            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn "
                onClick={closeModal}
                style={{ background: 'var(--gradient-1l)', color: 'white' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {isModalOpen && <div className="modal-backdrop fade show"></div>}



    </>
  );
};

export default Navbar;