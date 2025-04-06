import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import listSolid from '../../../Images/list-solid.png';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../Helper/loadingSpinner";
import { set, useForm } from "react-hook-form";
import ToastmMessage from "../../Helper/ToastmMessage";

const AdminEditSubCategory = () => {
    const { id } = useParams();
    const categoryEndpoint = `/admin/category/getSubCategoryById/${id}`;
    const [attributes, setAttributes] = useState([]);
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [mainCates, setMainCategory] = useState([]);
    

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm();

    const navigate = useNavigate();

    const addAttribute = () => {
        setAttributes([...attributes, { name: '', required: false, type: 'string' }]);
    };

    const removeAttribute = (index) => {
        const newAttributes = [...attributes];
        newAttributes.splice(index, 1);
        setAttributes(newAttributes);
    };

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = [...attributes];
        newAttributes[index][field] = field === 'required' ? value === 'true' : value;
        setAttributes(newAttributes);
    };

    const fetchSubCategory = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(process.env.REACT_APP_API_URL + categoryEndpoint);
            const data = response.data?.data?.subCategory;
            
            setValue("name", data?.name);
            
            // Set attributes if they exist in the response
            if (data?.attributes && Array.isArray(data.attributes)) {
                setAttributes(data.attributes);
            }
        } catch (error) {
            setToastObject({message: error?.response?.data?.message || 'An error occurred', show: true});
        } finally {
            setIsLoading(false);
        }
    };

    
    const fetchMainCategories = async () => {
        try{
        setIsLoading(true);
        const request = await axios.get(process.env.REACT_APP_API_URL + "/admin/category/getOnlyCategories");
        setMainCategory(request.data.data.categories);
        setToastObject({ message: request?.data?.message, show: true });
        console.log(request.data.data.categories)
        }
        catch(error){
            setToastObject({ message: error?.response?.data?.message || 'An error occurred', show: true });
            console.error("Error fetching categories:", error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubCategory();
        fetchMainCategories();
    }, []);

    const onSubmit = async (data) => {
        try {
            const updateData = {
                name: data.name,
                description: data.description,
                attributes: attributes.map(attr => ({
                    name: attr.name,
                    required: attr.required,
                    type: attr.type
                }))
            };

            const updateEndpoint = `/admin/category/putSubCategory/${id}`;
            const adminToken = JSON.parse(localStorage.getItem('adminToken')).value;

            const res = await axios.put(process.env.REACT_APP_API_URL + updateEndpoint, updateData, {
                contentType: 'application/json',
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });

            setToastObject({message: res?.data?.message, show: true});
            navigate('/admin/sub-category');
        } catch (error) {
            setToastObject({message: error?.response?.data?.message || 'An error occurred', show: true});
        }
    };

    return (
        <div className="container-fluid">
            <LoadingSpinner isSubmitting={isSubmitting || isLoading} />

            {toastObject.show &&
                <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
            }
            
            <div className="row">
                <Banner
                    bannerHeading="Edit Sub Category"
                    imageUrl={listSolid}
                />

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mt-4">

                    {/* {mainCates &&
                        <div>
                            <label htmlFor="maincatgory">Select Main Category:</label>
                            <select
                                id="maincatgory"
                                className={`login-input ${errors.maincatgory ? "is-invalid" : ""}`}
                                {...register("maincatgory", {
                                    required: "main category is required",
                                    // onChange: (e) => fetchStatesByCountryId(e.target.value),
                                })}
                            >
                                {mainCates.map((mcat) => (
                                    <option key={mcat._id} value={mcat._id}>
                                        {mcat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.maincatgory && (
                                <p className="link-primary">{errors.maincatgory.message}</p>
                            )}
                        </div>
                } */}
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="form-label">
                                Category Name
                            </label>
                            <input
                                type="text"
                                className={`login-input ${errors.name ? "is-invalid" : ""}`}
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

                     
                        {/* Dynamic Attributes Section */}
                        <div className="mt-4">
                            <button type="button" className="btn btn-secondary mb-3 category-button" onClick={addAttribute}>
                                Add Attribute
                            </button>

                            {attributes.map((attribute, index) => (
                                <div key={index} className="card mb-3 p-3">
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <label htmlFor={`attribute-name-${index}`} className="form-label">
                                                Attribute Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control login-input"
                                                value={attribute.name}
                                                onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor={`attribute-required-${index}`} className="form-label">
                                                Required
                                            </label>
                                            <select
                                                className="form-select login-input"
                                                value={attribute.required}
                                                onChange={(e) => handleAttributeChange(index, 'required', e.target.value)}
                                            >
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor={`attribute-type-${index}`} className="form-label">
                                                Type
                                            </label>
                                            <select
                                                className="form-select login-input"
                                                value={attribute.type}
                                                onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
                                            >
                                                <option value="string">String</option>
                                                <option value="number">Number</option>
                                                <option value="boolean">Boolean</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-end">
                                            <button
                                                type="button"
                                                className="btn btn-danger category-button"
                                                onClick={() => removeAttribute(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary login-button mb-5"
                                disabled={isSubmitting || Object.keys(errors).length > 0}
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

export default AdminEditSubCategory;

// import React, { use, useEffect, useState } from "react";
// import Banner from "../Banner";
// import listSolid from '../../../Images/list-solid.png';
// import axios from "axios";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import LoadingSpinner from "../../Helper/loadingSpinner";
// import { set, useForm } from "react-hook-form";
// import ToastmMessage from "../../Helper/ToastmMessage";

// const AdminEditSubCategory = () => {

//     const { id } = useParams(); // Get the id from the URL
//     const categoryEndpoint = `/admin/category/getSubCategoryById/${id}`;
//     const [toastObject, setToastObject] = useState({
//             message: '',
//             show: false,
//           });
//     const [isLoading, setIsLoading] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//         setValue,
//     } = useForm();



//     const navigate = useNavigate();
    

//     const fetchSubCategory = async () => {
//         try {
//             setIsLoading(true)
//             const response = await axios.get(process.env.REACT_APP_API_URL + categoryEndpoint);
//             console.log(response.data)
//             const data = response.data?.data?.subCategory
//             console.log(data)
//             setValue("name", data?.name);
//             setValue("description", data?.description);
//         } catch (error) {
//             setToastObject({message: error?.response?.data?.message || 'An error occurred', show: true});
//         }finally{
//             setIsLoading(false)
//         }
//     };


//     // const fetchData = async () => {
//     //     try {
//     //       setIsSubmitting(true)
//     //       const response = await axios.get(process.env.REACT_APP_API_URL + categoryEndpoint);
//     //       console.log(response.data)
//     //       const data = response.data?.data

//     //       const cat = data.map((d)=>{
//     //         return {
//     //             name: d.name,
//     //             description: d.description,
//     //             _id: d._id,
//     //             createdAt: d.createdAt,
//     //         }
//     //       })

//     //       setCategories(cat)

//     //       setColumns(getColumns(cat,["__v"]))
//     //       console.log(response.data?.data)
//     //     } catch (error) {
//     //       console.error("Error fetching categories:", error);
//     //       console.error("Error fetching categories:", error);
//     //     }finally{
//     //       setIsSubmitting(false)   
//     //     }
//     // };




//     useEffect(() => {

//         fetchSubCategory();

//     }, []);

//     const editCategory = (data) => {
//         navigate(`/admin/category/${data._id}`)
//     }

//     const deleteCategory = (data) => {

//         const confirmDelete = window.confirm("Are you sure you want to delete this category?");
//         if (confirmDelete) {
//             const deleteEndpoint = `/admin/category/deleteCategory/${data._id}`;
//             // axios.delete(process.env.REACT_APP_API_URL + deleteEndpoint)
//             // .then((response) => {
//             //     console.log(response.data);
//             //     fetchData();
//             // })
//             // .catch((error) => {
//             //     console.error("Error deleting category:", error);
//             // });
//             navigate(0);
//         }
//     }

//     const onSubmit = async (data) => {

//         try{

//         const updateEndpoint = `/admin/category/putCategory/${id}`;
//         const adminToken = JSON.parse(localStorage.getItem('adminToken')).value;

//         const res = await axios.put(process.env.REACT_APP_API_URL + updateEndpoint, data, {
//             contenType: 'application/json',
//             headers: {
//                 Authorization: `Bearer ${adminToken}`,
//             },
//         })

//         setToastObject({message: res?.data?.message, show: true});
//         navigate('/admin/category');
//     }catch(error){
//         setToastObject({message: error?.response?.data?.message || 'An error occurred', show: true});
//     }finally{
        
//     }



//     }



//     return (
//         <div className="container-fluid">
//             <LoadingSpinner isSubmitting={isSubmitting || isLoading} />

//             {toastObject.show &&
//             <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
//             }
//             {/* <LoadingSpinner isSubmitting={isSubmitting} /> */}
//             <div className="row">
//                 <Banner
//                     bannerHeading="Edit Sub Category"
//                     imageUrl={listSolid}
//                 />

//                 <form onSubmit={handleSubmit(onSubmit)} noValidate>
//                     <div className="mt-4">
//                         {/* Email Input */}
//                         <div>
//                             <label htmlFor="name" className="form-label">
//                                 Category Name
//                             </label>
//                             <input
//                                 type="text"
//                                 className={`login-input ${errors.name ? "is-invalid" : ""}`} // Adds Bootstrap's 'is-invalid' only if error exists
//                                 {...register("name", {
//                                     required: "category name is required",
//                                     minLength: {
//                                         value: 3,
//                                         message: "Must be at least 3 characters",
//                                     },
//                                 })}
//                                 autoComplete="off"
//                             />
//                             {errors.name && (
//                                 <p className="link-primary">{errors.name.message}</p>
//                             )}
//                         </div>

//                         {/* Description Input */}
//                         <div>

//                             <label htmlFor="description" className="form-label">
//                                 Category Description
//                             </label>
//                             <input
//                                 type="text"
//                                 className={`login-input ${errors.description ? "is-invalid" : ""}`}
//                                 autoComplete="off"
//                                 {...register("description", {
//                                     required: "Description  is required",
//                                     minLength: {
//                                         value: 8,
//                                         message: "Must be at least 8 characters",
//                                     },
                                    
//                                 })}
//                             />
//                             {errors.password && (
//                                 <p className="link-primary">{errors.description.message}</p>
//                             )}
//                         </div>

//                         {/* Submit Button */}
//                         <div>
//                             <button
//                                 type="submit"
//                                 className="btn btn-primary login-button"
//                                 disabled={Object.keys(errors).length > 0}
//                             >
//                                 Submit
//                             </button>
//                         </div>

//                     </div>
//                 </form>



//             </div>
//         </div>

//     );
// };


// export default AdminEditSubCategory;