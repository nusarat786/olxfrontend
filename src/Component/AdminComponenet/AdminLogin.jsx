import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../Helper/loadingSpinner";
import { setTokenWithExpiry, setTokenWithExpiryAdmin } from "../Helper/functions";
import { useState } from "react";
import ToastmMessage from "../Helper/ToastmMessage";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting},

  } = useForm();
  const navigate = useNavigate();

  const [toastObject, setToastObject] = useState({
    message: '',
    show: false,
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/adminLogin`, data
        ,{
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('response',response);
      if (response.data.success === true) {
        setTokenWithExpiryAdmin(response.data.data.token)
        navigate('/adminHome')
      }
      else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Login failed");
      
        setToastObject({
        message: error?.response?.data?.message || error?.message,
        show: true,
        });
      console.error("Login Error:", error);
    }
  };

  


  return (
    <div className="container">
      {toastObject.show &&
        <ToastmMessage message={toastObject.message} show={toastObject.show}  onClose={() => setToastObject({ message: '', show: false })} />
      }
      <LoadingSpinner isSubmitting={isSubmitting} />
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-11 offset-xl-3 offset-lg-3 offset-md-3 offset-sm-1">

          <h2 className="text-center font-h2">ReeBuy</h2>


          <h1 className="font-h1 mt-5">Admin Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mt-4">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  className={`login-input ${errors.email ? "is-invalid" : ""}`} // Adds Bootstrap's 'is-invalid' only if error exists
                  placeholder="Email"
                  autoComplete="off"
                  {...register("adminEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.adminEmail && (
                  <p className="link-primary">{errors.adminEmail.message}</p>
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

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="btn btn-primary login-button"
                  disabled={Object.keys(errors).length > 0}
                >
                    Login
                </button>
              </div>
              
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;


