import React, { use, useEffect, useState } from "react";
import Banner from "../Banner";
import listSolid from '../../../Images/list-solid.png';
import DataTable from "../DataTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Helper/loadingSpinner";
import ToastmMessage from "../../Helper/ToastmMessage";

const AdminCategory = () => {

    const categoryEndpoint = '/admin/category/getCategories'
    
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
          const response = await axios.get(process.env.REACT_APP_API_URL + categoryEndpoint);
          console.log(response.data?.data)
          const data = response?.data?.data?.categories


          let cate = []
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const t = {
              'Sr.no':i+1,
              id:element._id,
              name:element?.name,
              description: element?.description,
            }
            cate.push(t)
            console.log(t)
            console.log(element)
          }

          setCategories(cate)
          setColumns(getColumns(cate,["__v"]))

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

    const editCategory= (id) => {
        navigate(`/admin/category/${id}`)
    }
    
    const deleteCategory = async(id) => {
        
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {

          try {
            setIsSubmitting(true)
            const deleteEndpoint = `/admin/category/deleteCategory/${id}`;
            const adminToken = JSON.parse(localStorage.getItem("adminToken")).value
            const request  =await axios.delete(process.env.REACT_APP_API_URL + deleteEndpoint,{headers: {
                Authorization: `Bearer ${adminToken}`,
            }});
            navigate(0);
            setToastObject({
                message: request?.data?.message,
                show: true,
              });
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
                bannerHeading="Category"
                imageUrl={listSolid}
            />
            <DataTable
                columns={columns}
                data={categories}
                onEdit={editCategory}
                onDelete={deleteCategory}
                onAdd={() => navigate('/admin/category/add')}
            />
            
        </div>
    </div>
   
  );
};


export default AdminCategory;