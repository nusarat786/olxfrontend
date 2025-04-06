import React, { use, useEffect, useState } from "react";
import Banner from "../Banner";
import listSolid from '../../../Images/list-solid.png';
// import filter from '../../../Images/'
import DataTable from "../DataTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Helper/loadingSpinner";
import ToastmMessage from "../../Helper/ToastmMessage";
import LocTable from "./LoacTable";

const AdminLocation = () => {

    const categoryEndpoint = '/admin/category/getAllCategory'
    
    const [categories, setCategories] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
      });
    
    const navigate =useNavigate( );
    const fetchData = async () => {
        try {
          setIsSubmitting(true)
          const response = await axios.post(process.env.REACT_APP_API_URL + '/admin/location/getPaginatedLocations');
          console.log(response.data?.data)
          const data = response?.data?.data?.loc

          setCategories(data)
          //setColumns(getColumns(data,["__v"]))

          setToastObject({
            message: response?.data?.message,
            show: true,
          });
    
        } catch (error) {
          console.error("Error fetching categories:", error);
          console.error("Error fetching categories:", error);
          setToastObject({
            message: error?.response?.data?.message || 'An error occurred',
            show: true,
          });
        }finally{
          setIsSubmitting(false)   
        }
    };


    const getColumns = (data,skipKeys) => {
        const columns = [];
        if (data.length > 0) {
          const firstItem = data[0];
          for (const key in firstItem) {
            if (firstItem.hasOwnProperty(key)) {
              if(skipKeys && skipKeys.includes(key)) continue;
              columns.push({ label: key, field: key });
            }
          }
        }
        console.log(columns)    
        return columns;
      };  


    useEffect( () => {
        fetchData();
      }, []);

    const editLocation= (id) => {
        navigate(`/admin/location/${id}`)
    }
    
    const deleteCategory = async(id) => {
        
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {

          try {
            setIsSubmitting(true)
            const deleteEndpoint = `/admin/location/deleteLocation`;
            const adminToken = JSON.parse(localStorage.getItem("adminToken")).value
            const request  =await axios.post(process.env.REACT_APP_API_URL + deleteEndpoint,{id:id} ,
              {headers: {
                Authorization: `Bearer ${adminToken}`,
            }});
              setToastObject({
                message: request?.data?.message,
                show: true,
              });
              setTimeout(() => {
                navigate(0);
              }, 1500);
            
            } catch (error) {
                console.error("Error deleting category:", error);
                setToastObject({message: error?.response?.data?.message || 'An error occurred', show: true});
            }finally{
                setIsSubmitting(false)
            }
        }
    }

  

  return (
    <div className="container-fluid">
        <LoadingSpinner isSubmitting={isSubmitting} />

        {toastObject.show &&
        <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
      }
        

        <div className="row">
            <Banner
                bannerHeading="Locations "
                // imageUrl={listSolid}
                fasSrc="fa-solid fa-location-dot"
            />
            <LocTable
                columns={columns}
                data={categories}
                onEdit={editLocation}
                onDelete={deleteCategory}
                onAdd={() => navigate('/admin/loaction/add')}
            />
            
        </div>
    </div>
   
  );
};


export default AdminLocation;