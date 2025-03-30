import React, { use, useEffect } from "react";
import Banner from "./Banner";
import listSolid from '../../Images/list-solid.png';
import DataTable from "./DataTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Helper/loadingSpinner";

const AdminCategory = () => {

    const categoryEndpoint = '/admin/category/getCategories'
    
    const [categories, setCategories] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    const navigate =useNavigate( );
    const fetchData = async () => {
        try {
          setIsSubmitting(true)
          const response = await axios.get(process.env.REACT_APP_API_URL + categoryEndpoint);
          console.log(response.data)
          const data = response.data?.data

          const cat = data.map((d)=>{
            return {
                name: d.name,
                description: d.description,
                _id: d._id,
                createdAt: d.createdAt,
            }
          })

          setCategories(cat)
          
          setColumns(getColumns(cat,["__v"]))
          console.log(response.data?.data)
        } catch (error) {
          console.error("Error fetching categories:", error);
          console.error("Error fetching categories:", error);
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

    const editCategory= (data) => {
        navigate(`/admin/category/${data._id}`)
    }
    
    const deleteCategory = (data) => {
        
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            const deleteEndpoint = `/admin/category/deleteCategory/${data._id}`;
            // axios.delete(process.env.REACT_APP_API_URL + deleteEndpoint)
            // .then((response) => {
            //     console.log(response.data);
            //     fetchData();
            // })
            // .catch((error) => {
            //     console.error("Error deleting category:", error);
            // });
            navigate(0);
        }
    }

  

  return (
    <div className="container-fluid">
        <LoadingSpinner isSubmitting={isSubmitting} />

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
            />
            
        </div>
    </div>
   
  );
};


export default AdminCategory;