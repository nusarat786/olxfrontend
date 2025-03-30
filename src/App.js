import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CDN is in index.html
import './App.css';
import LoginWithEmail from './Component/AuthenticationComponenet/LoginWithEmail';
import RegisterUser from './Component/AuthenticationComponenet/RegisterUser';
import ForgotPassword from './Component/AuthenticationComponenet/ForgotPassword';
import GoogleAuth from './Component/AuthenticationComponenet/GoogleAuth';
import Header from './Component/Resuablecomponenet/Header';
import AdminLogin from './Component/AdminComponenet/AdminLogin';
import AdminSideBar from './Component/AdminComponenet/AdminSideBar';
import Admin from './Component/AdminComponenet/Admin';
import AdminHeader from './Component/AdminComponenet/AdminHeader';
import AdminHome from './Component/AdminComponenet/AdminHome';
import AdminCategory from './Component/AdminComponenet/AdminCategory';
import AdminEditCategory from './Component/AdminComponenet/AdminEditCategory';
import UserHeader from './Component/UserComponenet/UserHeader';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GeolocationComponent from './Component/Resuablecomponenet/GeoLocationComponent';
import { useEffect } from 'react';
import getUserLocation from './Component/Resuablecomponenet/getUserLocation.ts';
import axios from 'axios';
import { useState } from 'react';
import LoadingSpinner from "./Component//Helper/loadingSpinner";
import ProductCardList from './Component/UserComponenet/UserProductList.jsx';
import ProductById from './Component/UserComponenet/ProductById';
import ProductDetail from './Component/UserComponenet/ProductDetails';
import ChatComponent2 from './Component/UserComponenet/Ch.jsx';
import ChatHistory from './Component/UserComponenet/ChatHistory.jsx';
import ChatHistoryList from './Component/UserComponenet/ChatHistoryList.jsx';
import Sell from './Component/UserComponenet/Sell Screen/Sell.jsx';
import UserProduct from './Component/UserComponenet/UserProduct/UserProduct.jsx';
import EditProduct from './Component/UserComponenet/UserProduct/Sell.jsx';
import ProductByCategory from './Component/UserComponenet/ProductByCategory.jsx';
import ProductSearch from './Component/UserComponenet/ProductSearch.jsx';
import ProductLiked from './Component/UserComponenet/LikeProduct.jsx';
import EditUser from './Component/AuthenticationComponenet/EditUser.jsx';
function Home() {
  return(
  <>
  <GeolocationComponent/>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>
    <h2 className="text-center mt-4">Welcome to the Home Page</h2>

  </>
  )
}


function About() {
  return <h2 className="text-center mt-4">About Us</h2>;
}

function Contact() {
  return <h2 className="text-center mt-4">Contact Us</h2>;
}
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/home" />;
  }
  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/adminLogin" />;
  }
  return children;
};

const AdminPublicRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    return <Navigate to="/adminHome" />;
  }
  return children;
};

const useHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return <UserHeader />;
  }
  return null;
}

const useAdminHeader = () => {
  const token = localStorage.getItem('adminToken');
  const path= document.location.pathname;

  if ((token && path.includes('admin'))) {
    return <AdminHeader />;
  }
  
  // else if(path.includes('adminHome')){
  //   return <AdminHeader/>;
  // }
  return null;
}
function App() {

  const [isLoading, setIsLoading] = useState(false);

  const getMainLocation = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/location/getcClosestLocation`, data
        ,{
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('response',response);
      localStorage.setItem("mainLocation", JSON.stringify(response.data.data.location));
      localStorage.setItem("locId", JSON.stringify(response.data.data.location.id));

    } catch (error) {
      const loc = {
        _id: "67968cba818c479d8c80fbc7",
        id: 1000001,
        name: "India",
        type: "COUNTRY",
        longitude: 78.9629,
        latitude: 20.5937,
      }
      localStorage.setItem("mainLocation", JSON.stringify(loc));
      localStorage.setItem("locId", JSON.stringify(loc.id));

    }
  };
  



  

  useEffect(() => {

  
    const fetchLocation = async () => {

      if(localStorage.getItem('mainLocation')){
        setIsLoading(false);
        return;
      }

      try {
        // Check if location exists in local storage
        const storedLocation = localStorage.getItem("userLocation");
        let loc;
        if (storedLocation) {
          loc = JSON.parse(storedLocation)
        } else {
          setIsLoading(true);

          await getUserLocation()
          const storedLocation = localStorage.getItem("userLocation");

          loc = JSON.parse(storedLocation)
        }

        console.log(loc)
        await getMainLocation(loc)
      } catch (err) {
        console.log(err)
      }finally {
        setIsLoading(false);
      }
    };

  fetchLocation();

  }, []);

  if (isLoading) {
    // Show loading screen until location is fetched
    return (
      <LoadingSpinner isSubmitting={isLoading} />
    );
  }
  
 
  


  return (
    <Router className="container-fluid main-div">
      
      {/* {useHeader()} */}
      {/* {useAdminHeader()} */}
      <Routes>
        <Route path="/test" element={  <Admin />} />
        <Route path="/login" 
        element={<PublicRoute><LoginWithEmail /></PublicRoute>} 
        />
        <Route path="/register" element={<PublicRoute><RegisterUser /></PublicRoute>} />
        <Route path="/forgetPassword" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/GoogleAuth/" element={<GoogleAuth />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<ProtectedRoute>  <Header/> <ProductCardList/></ProtectedRoute>} />
        <Route path="/productByCategory/:cts" element={<ProtectedRoute>  <Header/> <ProductByCategory/></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute>  <Header/> <ProductSearch/></ProtectedRoute>} />

        <Route path="/product/:productId" element={<ProtectedRoute>  <Header/> <ProductById/></ProtectedRoute>} />
        {/* <Route path="/product/:productId" element={<ProtectedRoute>  <Header/> <ProductDetail/></ProtectedRoute>} /> */}
        <Route path="/chat/:idS" element={<ProtectedRoute>  <ChatComponent2/></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Header/>   <ChatHistoryList/></ProtectedRoute>} />
        <Route path="/sell" element={<ProtectedRoute> <Sell/></ProtectedRoute>} />
        <Route path="/myProducts" element={<ProtectedRoute> <Header/> <UserProduct/></ProtectedRoute>} />
        <Route path="/editProduct/:productId" element={<ProtectedRoute> <EditProduct/> </ProtectedRoute>} />

        <Route path="/likeProducts" element={<ProtectedRoute>  <Header/> <ProductLiked/></ProtectedRoute>} />
        <Route path="/editDetails" element={<ProtectedRoute>  
          <Header/>
          <EditUser/>
        </ProtectedRoute>} 
        />

        <Route path="/adminLogin" element={<AdminPublicRoute><AdminLogin /></AdminPublicRoute>} />
        <Route 
        path="/adminHome" 
        element={
          <AdminProtectedRoute>
            <AdminHeader/>
            <AdminHome />
          </AdminProtectedRoute>
        }
        />
        <Route 
        path="/admin/category" 
        element={
          <AdminProtectedRoute>
            <AdminHeader/>
            <AdminCategory />
          </AdminProtectedRoute>
        }
        />
        <Route 
        path="/admin/category/:id" 
        element={
          <AdminProtectedRoute>
            <AdminHeader/>
            <AdminEditCategory />
          </AdminProtectedRoute>
        }
        />
        <Route path="*" 
        element={<PublicRoute><LoginWithEmail /></PublicRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
