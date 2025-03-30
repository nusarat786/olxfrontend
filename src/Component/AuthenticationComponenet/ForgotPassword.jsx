import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../Helper/loadingSpinner";
import { setTokenWithExpiry } from "../Helper/functions";
import { useState } from "react";
import ToastmMessage from "../Helper/ToastmMessage";
import { Button } from "bootstrap";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },

  } = useForm();
  const navigate = useNavigate();

  const [toastObject, setToastObject] = useState({
    message: '',
    show: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [isResentOtp, setIsResentOtp] = useState(false);


  const resentOtp = async () => {
    setIsResentOtp(true);
    setOtpSent(false);
    console.log('fgf')
    console.log('watch("email")', watch("email"));
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/userRoutes/forgetPassword`, { email: watch("email") })
      console.log('response', response);
      setToastObject({
        message: response.data.message,
        show: true,
      });
      setOtpSent(true);

    } catch (error) {
      setToastObject({
        message: error?.response?.data?.message,
        show: true,
      });
      console.error("Login Error:", error);
    } finally {
      setIsResentOtp(false);
    }
  }


  const onSubmit = async (data) => {
    console.log('data', data);
    try {

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/userRoutes/forgetPassword`, data)
      console.log('response', response);
      setToastObject({
        message: response.data.message,
        show: true,
      });
      setOtpSent(true);

    } catch (error) {
      setToastObject({
        message: error?.response?.data?.message,
        show: true,
      });
      console.error("Login Error:", error);
    }
  };

  const resetPassword = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/userRoutes/resetPassword`, data)
      console.log('response', response);
      setToastObject({
        message: response.data.message,
        show: true,
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setToastObject({
        message: error?.response?.data?.message,
        show: true,
      });

      console.error("Login Error:", error);
    }
  };





  return (
    <div className="container">
      {toastObject.show &&
        <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
      }
      <LoadingSpinner isSubmitting={isSubmitting || isResentOtp} />
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-11 offset-xl-3 offset-lg-3 offset-md-3 offset-sm-1">

          <h2 className="text-center font-h2">ReeBuy</h2>


          <h1 className="font-h1 mt-5">Forgot Password</h1>



          <form onSubmit={otpSent ? handleSubmit(resetPassword) : handleSubmit(onSubmit)} noValidate>
            <div className="mt-4">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  className={`login-input ${errors.email ? "is-invalid" : ""}`} // Adds Bootstrap's 'is-invalid' only if error exists
                  placeholder="Email"
                  autoComplete="off"
                  disabled={otpSent}
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
              {/* <div>
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
              </div> */}

              {otpSent && (

                <div>

                  <div>
                    <input
                      type="number"
                      className={`login-input ${errors.phoneCode ? "is-invalid" : ""} me-2 phone-code`}
                      placeholder="OTP"
                      autoComplete="off"
                      {...register("otp", {
                        required: "OTP is required",
                        pattern: {

                          value: /^[0-9]{6}$/, // Allows only 1 to 3 digits
                          message: "Enter a valid phone code",
                        },
                      })}
                    />
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



                  <div className="d-flex justify-content-end mb-2 ">

                    <button
                      type="button"
                      className="font-primary text-decoration-none link-primary btn-no-border"
                      onClick={() => resentOtp()}
                    >
                      &nbsp;Resend OTP
                    </button>
                  </div>
                </div>
              )}



              {/* Submit Button */}

              <div>
                <button
                  type="submit"
                  className="btn btn-primary login-button"
                  disabled={Object.keys(errors).length > 0}
                >
                  {otpSent ? "Verify OTP" : "Send OTP"}
                </button>

              </div>


            </div>


            <div className="text-center mt-3">
              <Link
                to="/login"
                className="font-primary text-decoration-none link-secondary"
              >
                &nbsp;Back to Login

              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;