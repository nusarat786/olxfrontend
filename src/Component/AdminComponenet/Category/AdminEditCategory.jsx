import React, { use, useEffect, useState } from "react";
import Banner from "../Banner";
import listSolid from '../../../Images/list-solid.png';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../Helper/loadingSpinner";
import { set, useForm } from "react-hook-form";
import ToastmMessage from "../../Helper/ToastmMessage";

const AdminEditCategory = () => {

    const { id } = useParams(); // Get the id from the URL
    const categoryEndpoint = `/admin/category/getCategoryById/${id}`;
    const [toastObject, setToastObject] = useState({
            message: '',
            show: false,
          });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm();



    const navigate = useNavigate();
    

    const fetchCategory = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + categoryEndpoint);
            console.log(response.data)
            const data = response.data?.data?.category
            console.log(data)
            setValue("name", data?.name);
            setValue("description", data?.description);

    
        } catch (error) {
            setToastObject({message: error?.response?.data?.message || 'An error occurred', show: true});
        }finally{
            
        }
    };


    // const fetchData = async () => {
    //     try {
    //       setIsSubmitting(true)
    //       const response = await axios.get(process.env.REACT_APP_API_URL + categoryEndpoint);
    //       console.log(response.data)
    //       const data = response.data?.data

    //       const cat = data.map((d)=>{
    //         return {
    //             name: d.name,
    //             description: d.description,
    //             _id: d._id,
    //             createdAt: d.createdAt,
    //         }
    //       })

    //       setCategories(cat)

    //       setColumns(getColumns(cat,["__v"]))
    //       console.log(response.data?.data)
    //     } catch (error) {
    //       console.error("Error fetching categories:", error);
    //       console.error("Error fetching categories:", error);
    //     }finally{
    //       setIsSubmitting(false)   
    //     }
    // };




    useEffect(() => {

        fetchCategory();

    }, []);

    const editCategory = (data) => {
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

    const onSubmit = async (data) => {

        try{

        const updateEndpoint = `/admin/category/putCategory/${id}`;
        const adminToken = JSON.parse(localStorage.getItem('adminToken')).value;

        const res = await axios.put(process.env.REACT_APP_API_URL + updateEndpoint, data, {
            contenType: 'application/json',
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
        })

        setToastObject({message: res?.data?.message, show: true});
        navigate('/admin/category');
    }catch(error){
        setToastObject({message: error?.response?.data?.message || 'An error occurred', show: true});
    }finally{
        
    }



    }



    return (
        <div className="container-fluid">
            <LoadingSpinner isSubmitting={isSubmitting} />

            {toastObject.show &&
            <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
            }
            {/* <LoadingSpinner isSubmitting={isSubmitting} /> */}
            <div className="row">
                <Banner
                    bannerHeading="Edit Category"
                    imageUrl={listSolid}
                />

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mt-4">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="name" className="form-label">
                                Category Name
                            </label>
                            <input
                                type="text"
                                className={`login-input ${errors.name ? "is-invalid" : ""}`} // Adds Bootstrap's 'is-invalid' only if error exists
                                {...register("name", {
                                    required: "category name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Must be at least 3 characters",
                                    },
                                })}
                                autoComplete="off"
                            />
                            {errors.name && (
                                <p className="link-primary">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Description Input */}
                        <div>

                            <label htmlFor="description" className="form-label">
                                Category Description
                            </label>
                            <input
                                type="text"
                                className={`login-input ${errors.description ? "is-invalid" : ""}`}
                                autoComplete="off"
                                {...register("description", {
                                    required: "Description  is required",
                                    minLength: {
                                        value: 8,
                                        message: "Must be at least 8 characters",
                                    },
                                    
                                })}
                            />
                            {errors.password && (
                                <p className="link-primary">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="btn btn-primary login-button"
                                disabled={Object.keys(errors).length > 0}
                            >
                                Submit
                            </button>
                        </div>

                    </div>
                </form>



            </div>
        </div>

    );
};


export default AdminEditCategory;