
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchFromApi, fetchFromApi2, fetchFromApi3, fetchFromApi4 } from "../../Helper/functions";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import ImagePicker2 from "../Sell Screen/imagePicker";
import LoadingSpinner from "../../Helper/loadingSpinner";
import ToastmMessage from "../../Helper/ToastmMessage";

const EditProduct = () => {
  const {productId} = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastObject, setToastObject] = useState({
    show: false,
    message: '',
  });
  const [subCategories, setSubCategories] = useState([]);
  const [showCategory, setShowCategory] = useState(true);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [subcategory, setSubcategory] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [neighbourHoods, setNeighbourHoods] = useState(null);
  const [category,setCategory] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  useEffect(() => {

    const fetchProduct = async () => {
      const token = JSON.parse(localStorage.getItem('token')).value;
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/product/getProductById`, { id: productId }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log(response.data.data.product);
        setProduct(response.data.data.product);

        fetchFromApi(
          { parentId: response.data.data.product.country },
          '/admin/location/getlocationByParentId',
          'locations',
          setStates,
          setLoading,
          setToastObject,
        );

        fetchFromApi(
          { parentId: response.data.data.product.state },
          '/admin/location/getlocationByParentId',
          'locations',
          setCities,
          setLoading,
          setToastObject,
        );

        fetchFromApi(
          { parentId: response.data.data.product.city },
          '/admin/location/getlocationByParentId',
          'locations',
          setNeighbourHoods,
          setLoading,
          setToastObject,
        );

        console.log('product', response.data.data.product);
        fetchFromApi4(
            {},
            `/admin/category/getSubCategoryById/${response.data.data.product.subCategory}`,
            'subCategory',
            setSubcategory,
            setLoading,
            setToastObject,
            setValue
          )

        const  product = response.data.data.product;
        setValue('title', product.title);
        setValue('description', product.description);
        setValue('price', product.price);
        //setValue('country', 'India');
        setValue('state', product.state._id);
        setValue('city', product.city._id);
        
        if(product?.neighbourhood){
          setValue('neighbourhood', product.neighbourhood._id);
        }

        setValue('mainCategory', product.mainCategory._id);
        setValue('subCategory', product.subCategory);
 

        const dynamicFields = product?.dynamicFields;
        for(const key in dynamicFields){
          setValue(key, dynamicFields[key]);
        }

        


        
      } catch (error) {
        console.error("Error fetching locations:", error);
        setToastObject({
          message: error?.response?.data?.message || 'An error occurred',
          show: true,
        });
      } finally {
        setLoading
        (false);
      }
    }

    fetchProduct();


    fetchFromApi2(
      {},
      '/admin/category/getOnlyCategories',
      'categories',
      setCategories,
      setLoading,
      setToastObject
    );



    fetchFromApi2(
      {}, 
      '/admin/location/getCountries', 
      'countries', 
      setCountries, 
      setLoading, 
      setToastObject
    );
  }, []);

  const handleCategory = (category) => {
    fetchFromApi2(
      { category },
      `/admin/category/getSubCategories/${category._id}`,
      'subCategories',
      setSubCategories,
      setLoading,
      setToastObject)
    setShowCategory(false);
    setShowSubCategory(true);
    setCategory(category);
  }

  const handleCategoryBack = () => {
    setShowCategory(true);
    setShowSubCategory(false);
    setCategory(null);
  }

  const handleSubCategory = (subcategory) => {
    console.log('subcategory', subcategory);
    setSubcategory(subcategory);
    setShowSubCategory(false);
    setShowCategory(false);
  }

  const handleSubCategoryBack = () => {
    setSubcategory(null);
    setShowSubCategory(true);
    setSubcategory(null);
  }

  const onSubmit = async (data) => {

    // if (!validateImages()) return; 

    setLoading(true);
    
    console.log('images', images);
    console.log('imageFile', imageFile);
    //const imagesWithoutNull = imageFile.filter((image) => image !== null);
    //data.images = imagesWithoutNull;

    const location = data.neighbourhood || data.city || data.state || data.country;
    data.location = location;
    data.condition = 'new';
    console.log('data', data);
    
    const token = JSON.parse(localStorage.getItem('token')).value;

    const formData = new FormData();

    // Append non-file fields using a for loop
    for (const key in data) {
      if (key !== 'images') { // Skip the 'images' field for now
        formData.append(key, data[key]);
      }
    }

    // // Append files (images) using a for loop
    // for (let i = 0; i < data.images.length; i++) {
    //   formData.append('images', data.images[i]); // Use 'images' as the field name
    // }

    const attrinutes = subcategory.attributes;

    const dynamicFields = {};

    for(let i = 0; i < attrinutes.length; i++){
      const attr = attrinutes[i];
      dynamicFields[attr.name] = data[attr.name];
    }

    console.log('dynamicFields', dynamicFields);

    formData.append('dynamicString', JSON.stringify(dynamicFields));

    console.log('formData', formData);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/product/updateProduct/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setToastObject({
        message: response?.data?.message,
        show: true,
      });

      console.log('response', response.data);
      setTimeout(() => {
        navigate(`/product/${productId}`);
      }, 1000);

    } catch (error) {
      setToastObject({
        message: error.response?.data?.message || 'An error occurred while registering. Please try again.',
        show: true,
      });
    }finally{
      setLoading(false);
    }
  };

  const fetchStatesByCountryId = (parentId) => {
    console.log('parentId', parentId);

    if(!parentId){
      setStates(null);
      setCities(null);
      setNeighbourHoods(null);
      return;
    }

    fetchFromApi(
      { parentId: parentId },
      '/admin/location/getlocationByParentId',
      'locations',
      setStates,
      setLoading,
      setToastObject
    );

    setCities(null);
    setNeighbourHoods(null);
  };

  const fetchCitiesByStateId = (parentId) => {
    fetchFromApi(
      { parentId: parentId },
      '/admin/location/getlocationByParentId',
      'locations',
      setCities,
      setLoading,
      setToastObject
    );

    setNeighbourHoods(null);
  }

  const fetchNeighbourhoodByCityId = (parentId
    ) => {
    fetchFromApi(
      { parentId: parentId },
      '/admin/location/getlocationByParentId',
      'locations',
      setNeighbourHoods,
      setLoading,
      setToastObject
    );
  }

  const [images, setImages] = useState(Array(8).fill(null));
  const [imageFile, setImageFiles] = useState(Array(8).fill(null));
  const [error, setError] = useState(""); // State for error message

  // Update image at a specific index
  const updateImage = (index, newImage) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = newImage;
      return updatedImages;
    });
    setError(""); // Clear error when an image is uploaded
  };

    // Update image at a specific index
  const updateImageFile = (index, newImage) => {
      setImageFiles((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = newImage;
        return updatedImages;
      });
      setError(""); // Clear error when an image is uploaded
    };

  // Validate if at least one image is uploaded
  const validateImages = () => {
    const isAtLeastOneImageUploaded = images.some((image) => image !== null);
    if (!isAtLeastOneImageUploaded) {
      setError("Please upload at least one image."); // Set error message
      return false;
    }
    setError(""); // Clear error if validation passes
    return true;
  };

  return (
    <>
    <LoadingSpinner isSubmitting={loading}/>
      {toastObject.show &&
       <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
      }

      <div style={{
        background: 'var(--gradient-1l)',
        color: 'white',
        padding: '10px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}>
        <button
          onClick={() => window.history.back()}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.6rem',
            cursor: 'pointer',
            marginRight: '2rem',
            marginLeft: '1rem',
          }}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', fontWeight: 'bold', fontSize: '1.6rem' }}>
          <span>Edit Product</span>
        </div>
      </div>

      {subcategory && 
      <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data">
                <div className="mt-4">
                {/* <div>
                    <input
                      type="text"
                      className={`login-input`}
                      placeholder="Product Name"
                      autoComplete="off"
                      valu
                    />
          
                </div> */}
                  <div>
                    <label htmlFor="state">Product Name</label>

                    <input
                      type="text"
                      className={`login-input ${errors.title ? "is-invalid" : ""}`}
                      placeholder="Product Name"
                      autoComplete="off"
                      {...register("title", {
                        required: "product name is required",
                        minLength: {
                          value: 10,
                          message: "Must be at least 10 characters",
                        },
                      })}
                    />
                    {errors.title && (
                      <p className="link-primary">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state">Description</label>

                    <textarea
                      className={`login-input ${errors.description ? "is-invalid" : ""}`}
                      placeholder="Description"
                      autoComplete="off"
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 12,
                          message: "Must be at least 12 characters",
                        },
                        maxLength: {
                          value: 100,
                          message: "Must be at most 100 characters",
                        },
                      })}
                    ></textarea>
                    {errors.description && (
                      <p className="link-primary">{errors.description.message}</p>
                    )}
                  </div>

                  <div className="">
                    <label htmlFor="state">Price</label>

                    <input
                      type="number"
                      className={`login-input ${errors.price ? "is-invalid" : ""} me-2 phone-code`}
                      placeholder="Price"
                      autoComplete="off"
                      {...register("price", {
                        required: "price is required",
                        min: {
                          value: 1,
                          message: "price can not be less than 1",
                        },
                      })}
                    />
                    {errors.price && <p className="link-primary">{errors.price.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="country">Select Country:</label>
                    <select
                      id="country"
                      className={`login-input ${errors.country ? "is-invalid" : ""}`}
                      {...register("country", {
                        required: "Country selection is required",
                        onChange: (e) => fetchStatesByCountryId(e.target.value),
                      })}
                    >
                      <option value="">Select a country</option>
                      <option selected value={product?.country?._id}>{product?.country?.name}</option>

                      {/* {countries.map((country) => (
                        <option key={country._id} value={country._id}>
                          {country.name}
                        </option>
                      ))} */}
                    </select>
                    {errors.country && (
                      <p className="link-primary">{errors.country.message}</p>
                    )}
                  </div>

                  {states && 
                    <div>
                    <label htmlFor="state">Select state:</label>
                    <select
                      id="state"
                      className={`login-input ${errors.state ? "is-invalid" : ""}`}
                      {...register("state", {
                        required: "State selection is required",
                        onChange: (e) => fetchCitiesByStateId(e.target.value),
                      })}
                    >

                      <option value="">Select a state</option>
                      {/* <option selected value={product?.state?._id}>{product?.state?.name}</option> */}
                      {states.map((state) => (
                        <option key={state._id} value={state._id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="link-primary">{errors.state.message}</p>
                    )}
                    </div>
                  }

                  {cities && 
                    <div>
                    <label htmlFor="city">Select City:</label>
                    <select
                      id="city"
                      className={`login-input ${errors.city ? "is-invalid" : ""}`}
                      {...register("city", {
                        required: "City selection is required",
                         onChange: (e) => fetchNeighbourhoodByCityId(e.target.value),
                      })}
                    >
                      <option value="">Select a city</option>

                      {/* <option selected value={product?.city?._id}>{product?.city?.name}</option> */}
                      {cities.map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="link-primary">{errors.city.message}</p>
                    )}
                    </div>
                  }

                  {neighbourHoods && 
                    <div>
                    <label htmlFor="neighbourhood">Select Neigbour Hood:</label>
                    <select
                      id="neighbourhood"
                      className={`login-input ${errors.neighbourhood ? "is-invalid" : ""}`}
                      {...register("neighbourhood", {
                        required: "neighbourhood selection is required",
                        // onChange: (e) => fetchStatesByStateId(e.target.value),
                      })}
                    >
                      <option value="">Select a neighbourhood</option>
                      
                      {product?.neighbourhood &&
                      <option selected value={product?.n?._id}>{product?.neighbourhood?.name}</option>
                  }
                      {neighbourHoods.map((neighbourhood) => (
                        <option key={neighbourhood._id} value={neighbourhood._id}>
                          {neighbourhood.name}
                        </option>
                      ))}
                    </select>
                    {errors.neighbourhood && (
                      <p className="link-primary">{errors.neighbourhood.message}</p>
                    )}
                    </div>
                  }

                  {/* <div className="row ">
                    <h3 className=" "> </h3>
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="col-6 col-md-6 col-lg-3 mb-3" // Responsive columns
                      >
                        <ImagePicker2
                          setValue={(newImageFile) => updateImageFile(index, newImageFile)}
                          image={image}
                          setImage={(newImage) => updateImage(index, newImage)}
                          fieldName={`profilePicture${index + 1}`} 
                          isRequired={index === 0} 
                        />
                      </div>
                    ))}
                  </div> */}

                  {/* Display error message if no image is uploaded */}
                  {error && <p className="text-danger">{error}</p>}                  

                  {subcategory.attributes &&  subcategory.attributes.map((attr) => (
               <div key={attr._id}>
               <label>{attr.name}</label>
               {attr.type === 'string' ? (
                 <input
                   type="text"
                   className={`login-input ${errors[attr.name] ? "is-invalid" : ""}`}
                   placeholder={attr.name}
                   {...register(attr.name, {
                     required: attr.required ? `${attr.name} is required` : false,
                     minLength: {
                       value: 3,
                       message: `${attr.name} must be at least 3 characters`,
                     },
                   })}
                 />
               ) : (
                 <input
                   type="number"
                   className={`login-input ${errors[attr.name] ? "is-invalid" : ""}`}
                   placeholder={attr.name}
                   {...register(attr.name, {
                     required: attr.required ? `${attr.name} is required` : false,
                     min: {
                       value: 0,
                       message: `${attr.name} must be at least 0`,
                     },
                   })}
                 />
               )}
               {errors[attr.name] && (
                 <p className="link-primary">{errors[attr.name].message}</p>
               )}
             </div>
                  ))}  
          
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary login-button"
                      disabled={Object.keys(errors).length > 0}
                    >
                      Post
                    </button>
                  </div>
                </div>

           
              </form>
            </div>

          </div>
      </div>
    }
    </>
  );
}

export default EditProduct;

