import React, { use, useEffect } from "react";
import Banner from "./Banner";
import listSolid from '../../Images/list-solid.png';
import DataTable from "./DataTable";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../Helper/loadingSpinner";
import { useForm } from "react-hook-form";

const AdminEditCategory = () => {

    const { id } = useParams(); // Get the id from the URL
    const categoryEndpoint = '/admin/category/getCategories'

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();



    const navigate = useNavigate();
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

        console.log("Fetching Categories", document.location.pathname)
        //fetchData();
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

    const onSubmit = (data) => {
        console.log(data)
    }



    return (
        <div className="container-fluid">
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
                            <input
                                type="text"
                                className={`login-input ${errors.name ? "is-invalid" : ""}`} // Adds Bootstrap's 'is-invalid' only if error exists
                                placeholder="Email"
                                autoComplete="off"
                                {...register("name", {
                                    required: "category name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Must be at least 3 characters",
                                    },
                                })}
                            />
                            {errors.name && (
                                <p className="link-primary">{errors.email.name}</p>
                            )}
                        </div>

                        {/* Description Input */}
                        <div>
                            <input
                                type="password"
                                className={`login-input ${errors.password ? "is-invalid" : ""}`}
                                placeholder="Password"
                                autoComplete="off"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Must be at least 8 characters",
                                    },
                                    pattern: {
                                        value:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
                                        message:
                                            "Must contain at least one uppercase, one lowercase, one number, and one special character",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="link-primary">{errors.password.message}</p>
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