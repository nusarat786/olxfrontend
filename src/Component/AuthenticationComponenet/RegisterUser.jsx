import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../Helper/loadingSpinner";
import { setTokenWithExpiry } from "../Helper/functions";
import ImageUploader from "../Helper/ImageUploader";
import ImagePicker from "../Helper/ImagePicker";
import ToastmMessage from "../Helper/ToastmMessage";
const RegisterUser = (props) => {
  const [preview, setPreview] = useState(null);
  const [Image, setImage] = useState(null);


  const [toastObject, setToastObject] = useState({
    message: '',
    show: false,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    //data.profilePicture = data.profilePicture[0];
    console.log('data', data);

    console.log(data)
    //return console.log('data', data);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/userRoutes/register`, data, {
        
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('response', response);
      setToastObject({
        message: response?.data?.message,
        show: true,
      });

      setTimeout(() => {
        navigate('/login')
      }, 2000);

    } catch (error) {
      setToastObject({

        message: error?.response?.data?.message || 'An error occurred',
        show: true,
      });
    }
  };


  //   const handleImageSelect = (event) => {
  //     console.log("File Input Clicked"); // Debugging: Log when the file input is clicked

  //     const file = event.target.files[0]; // Extract the selected file
  //     if (file) {
  //         console.log("Selected File:", file); // Log the selected file details
  //         setSelectedImage(URL.createObjectURL(file)); // Generate a preview URL
  //         setValue("profileImage", file); // Store the file in React Hook Form
  //     }

  //     // Manually call the `onChange` function provided by `register`
  //     if (props.onChange) {
  //         props.onChange(event);
  //     }
  // };



  return (
    <div className="container">

      <LoadingSpinner isSubmitting={isSubmitting} />
      {toastObject.show &&
        <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
      }
      <div className="row">


        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-11 offset-xl-3 offset-lg-3 offset-md-3 offset-sm-1">
          <h2 className="text-center font-h2">ReeBuy</h2>

          <h1 className="font-h1 mt-5">Register</h1>


          <div className="d-flex align-items-center">
            <hr className="flex-grow-1 border border-secondary" />
            <hr className="flex-grow-1 border border-secondary" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate enctype="multipart/form-data">
            <div className="mt-4">
              {/* First Name Input */}
              <div>
                <input
                  type="text"
                  className={`login-input ${errors.firstName ? "is-invalid" : ""}`} // Adds Bootstrap's 'is-invalid' only if error exists
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
                <input
                  type="text"
                  className={`login-input ${errors.lastName ? "is-invalid" : ""}`} // Adds Bootstrap's 'is-invalid' only if error exists
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
                <input
                  type="email"
                  className={`login-input ${errors.email ? "is-invalid" : ""}`} // Adds Bootstrap's 'is-invalid' only if error exists
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

              {/* Password Input */}
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

              {/* Confirm Password Input */}
              <div>
                <input
                  type="text"
                  className={`login-input ${errors.confirmPassword ? "is-invalid" : ""}`}
                  placeholder="Confirm Password"
                  autoComplete="off"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    minLength: {
                      value: 8,
                      message: "Must be at least 8 characters",
                    },
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="link-primary">{errors.confirmPassword.message}</p>
                )}
              </div>


              {/* Phone Number Input */}
              {/* <div>
              <input
                type="text"
                className={`login-input ${errors.phoneNumber ? "is-invalid" : ""}`}
                placeholder="Phone Number"  
                autoComplete="off"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="link-primary">{errors.phoneNumber.message}</p>
              )}
            </div> */}

              <div className="">
                {/* Phone Number Input with Country Code */}
                <div className="d-flex">
                  {/* Phone Code  */}

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
                        value: /^[0-9]{1,3}$/, // Allows only 1 to 3 digits
                        message: "Enter a valid phone code",
                      },
                    })}
                  />

                  {/* Phone Number Field */}
                  <input
                    type="tel"
                    className={`login-input ${errors.phoneNumber ? "is-invalid" : ""}`}
                    placeholder="Phone Number"
                    autoComplete="off"
                    {...register("phone", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[0-9]{10}$/, // Ensures exactly 10 digits
                        message: "Enter a valid phone number",
                      },
                    })}
                  />
                </div>

                {/* Validation Errors */}
                {errors.phoneCode && <p className="link-primary">{errors.phoneCode.message}</p>}
                {errors.phone && <p className="link-primary">{errors.phone.message}</p>}
              </div>

              {/* <div className="mt-3">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect} // Attach your custom handler
                    {...register("profileImage", {
                        required: "Profile image is required",
                    })}
                />

                {errors.profileImage && (
                    <p className="link-primary">{errors.profileImage.message}</p>
                )}
                
                
                <img src={selectedImage} alt="Profile" className="img-fluid" />
            


            </div> */}

              <div>
                <div className="mt-3 mb-3 d-flex justify-content-center">
                  <ImagePicker setValue={setValue} image={Image} setImage={setImage} />
                </div>
                {!Image && (
                  <p className="link-primary">Please upload a profile image</p>
                )}
              </div>

















              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="btn btn-primary login-button"
                  disabled={Object.keys(errors).length > 0}
                >
                  Register
                </button>
              </div>
            </div>


            {/* Links */}
            <div className="text-center mt-3 mb-5">
              <label className="font-primary">Already have an account?</label>
              <Link
                to="/login"

                className="font-primary text-decoration-none link-primary"

              >
                &nbsp;Login
              </Link>
            </div>

            {/* <div className="text-center mt-3">
              <Link
                to="/login"
                className="font-primary text-decoration-none link-primary"
              >
                &nbsp;Login

              </Link>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;








