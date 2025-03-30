import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../Helper/loadingSpinner";
import { setTokenWithExpiry } from "../Helper/functions";
import ImageUploader from "../Helper/ImageUploader";
import ImagePicker from "../Helper/ImagePicker";
import ToastmMessage from "../Helper/ToastmMessage";

const EditUser = (props) => {
  const [preview, setPreview] = useState(null);
  const [Image, setImage] = useState(null);
  const [toastObject, setToastObject] = useState({
    message: '',
    show: false,
  });
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const token = JSON.parse(localStorage.getItem("token")).value;
        console.log(token);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/userRoutes/getProfile`,{id:"5"},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        const userData = response?.data?.data?.userProfile;
        setValue("firstName", userData?.firstName);
        setValue("lastName", userData.lastName);
        setValue("email", userData.email);
        setValue("phone", userData.phone);
        setValue("phoneCode", userData.phoneCode);
        setImage(userData.profilePicture); // Assuming profilePicture is the URL of the image
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setToastObject({
          message: error?.response?.data?.message || 'An error occurred',
          show: true,
        });
      }
    };

    fetchUserData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
        const token = JSON.parse(localStorage.getItem("token")).value;
        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('phoneCode', data.phoneCode);
        formData.append('phone', data.phone);
        console.log(data.Image)

        console.log(Image);

        //return true
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/userRoutes/update`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        }
      });
      setToastObject({
        message: response?.data?.message,
        show: true,
      });

      setTimeout(() => {
        // document.location.reload();
        navigate('/home');
      }, 1000);

    } catch (error) {
        console.log("Error updating user data:", error);
      setToastObject({
        message: error?.response?.data?.message || 'An error occurred',
        show: true,
      });
    }
  };

  return (
    <div className="container">
      <LoadingSpinner isSubmitting={isSubmitting} />
      {toastObject.show &&
        <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
      }
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-11 offset-xl-3 offset-lg-3 offset-md-3 offset-sm-1">
          <h1 className="font-h1 ">Profile</h1>
          <div className="d-flex align-items-center">
            <hr className="flex-grow-1 border border-secondary" />
            <hr className="flex-grow-1 border border-secondary" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data">
            <div className="">
              {/* First Name Input */}
              <div>
                <label for="">First Name</label>
                <input
                  type="text"
                  className={`login-input ${errors.firstName ? "is-invalid" : ""}`}
                  placeholder="First Name"
                  autoComplete="off"
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 3,
                      message: "Must be at least 3 characters",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="link-primary">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name Input */}
              <div>
              <label for="">Last Name</label>

                <input
                  type="text"
                  className={`login-input ${errors.lastName ? "is-invalid" : ""}`}
                  placeholder="Last Name"
                  autoComplete="off"
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 3,
                      message: "Must be at least 3 characters",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="link-primary">{errors.lastName.message}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label for="">Email</label>

                <input
                  type="email"
                  className={`login-input ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                  autoComplete="off"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="link-primary">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number Input */}
              <div className="">
                <div className="d-flex">
                    
                   
                  <input
                    type="number"
                    className={`login-input ${errors.phoneCode ? "is-invalid" : ""} me-2 phone-code`}
                    placeholder="Phone Code"
                    autoComplete="off"
                    value={91}
                    readOnly
                    {...register("phoneCode", {
                      required: "Phone Code is required",
                      pattern: {
                        value: /^[0-9]{1,3}$/,
                        message: "Enter a valid phone code",
                      },
                    })}
                  />
                  <input
                    type="tel"
                    className={`login-input ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="Phone Number"
                    autoComplete="off"
                    {...register("phone", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                  />
                </div>
                {errors.phoneCode && <p className="link-primary">{errors.phoneCode.message}</p>}
                {errors.phone && <p className="link-primary">{errors.phone.message}</p>}
              </div>

              {/* Profile Image Upload */}
              <div>
                <div className="mt-3 mb-3 d-flex justify-content-center">
                  <ImagePicker setValue={setValue} image={Image} setImage={setImage} />
                </div>
                {!Image && (
                  <p className="link-primary">Please upload a profile image</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mb-5">
                <button
                  type="submit"
                  className="btn btn-primary login-button"
                  disabled={Object.keys(errors).length > 0}
                >
                  Update
                </button>
              </div>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;