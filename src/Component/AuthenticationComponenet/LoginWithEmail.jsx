import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingSpinner from "../Helper/loadingSpinner";
import { setTokenWithExpiry ,setUserId} from "../Helper/functions";
import { useState } from "react";
import ToastmMessage from "../Helper/ToastmMessage";
const LoginWithEmail = () => {
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/userRoutes/loginWithIP`, data)
      console.log('response',response);
      if (response.data.success === true) {
        setTokenWithExpiry(response.data.data.token)
        setUserId(response.data.data.user._id)
        navigate('/home')
      }
      else {
        console.log("Login failed");
      }
    } catch (error) {
      
        setToastObject({
        message: error?.response?.data?.message,
        show: true,
        });
      console.error("Login Error:", error);
    }
  };

  const googleLogin = async () => {
    try {
      window.location.href = `${process.env.REACT_APP_API_URL}/userRoutes/auth/google`
      //console.log('response',response);
    } catch (error) {
      console.error("Login Error:", error);
    }

  }


  return (
    <div className="container">
      {toastObject.show &&
        <ToastmMessage message={toastObject.message} show={toastObject.show}  onClose={() => setToastObject({ message: '', show: false })} />
      }
      <LoadingSpinner isSubmitting={isSubmitting} />
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-11 offset-xl-3 offset-lg-3 offset-md-3 offset-sm-1">

          <h2 className="text-center font-h2">ReeBuy</h2>


          <h1 className="font-h1 mt-5">Login With Email</h1>

          <div className="social-login">
            <div className="social-login-button mt-4">
              <label className="font-primary">
                Login with one of the following options
              </label>
              <div className="text-center mt-3">
                <button type="button" className="btn btn-link btn-floating mx-1" onClick={googleLogin}>
                  <i className="fab fa-google font-logo background-color-logo p-2 rounded-circle"></i>
                </button>

                <Link to="/" className="btn btn-link btn-floating mx-1">
                  <i className="fa-solid fa-phone font-logo background-color-logo p-2 rounded-circle"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <hr className="flex-grow-1 border border-secondary" />
            <span className="mx-2 text-secondary">or</span>
            <hr className="flex-grow-1 border border-secondary" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mt-4">
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

            {/* Links */}
            <div className="text-center mt-3">
              <label className="font-primary">Don't have an account?</label>
              <Link
                to="/register"
                className="font-primary text-decoration-none link-primary"
              >
                &nbsp;Sign up
              </Link>
            </div>
            <div className="text-center mt-3">
              <Link
                to="/forgetPassword"
                className="font-primary text-decoration-none link-primary"
              >
                &nbsp;Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginWithEmail;


// import React from "react";
// import google from '../../Images/Google.png'
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";

// const LoginWithEmail = () => {

//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const onSubmit = (data) => {
//         console.log(data);
//     };




//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-6 col-lg-6 col-md-6 col-sm-11 offset-xl-3 offset-lg-3 offset-md-3 offset-sm-1">
//                     <h2 className="text-center font-h2">ReeBuy</h2>
//                     <h1 className="font-h1 mt-5">Login With Email</h1>
//                     <div className="social-login"> 
//                         <div className="social-login-button mt-4">
//                             <label className="font-primary">Login with one of the following options</label>
//                             <div className="text-center mt-3 ">
                                
//                                 <button type="button" className="btn btn-link btn-floating mx-1 ">
//                                     <i className="fab fa-google font-logo background-color-logo p-2 rounded-circle"></i>
//                                 </button>

//                                 <Link to="/" className="btn btn-link btn-floating mx-1">
//                                     <i className="fa-solid fa-phone font-logo background-color-logo p-2 rounded-circle"></i>
//                                 </Link>

//                             </div>

//                         </div>

//                     </div>
//                     <div class="d-flex align-items-center">
//                         <hr class="flex-grow-1 border border-secondary"/>
//                         <span class="mx-2 text-secondary">or</span>
//                         <hr class="flex-grow-1 border border-secondary" />
//                     </div>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className=" mt-4">
//                         <div className="">
//                             <input 
//                             type="email" 
//                             className="login-input" 
//                             placeholder="Email" 
//                             {...register("email", { 
//                                 required: true,
//                                 pattern: {
//                                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                     message: "Invalid email address"
//                                 }
//                             })}
//                             />
//                             {errors.email && <p className="text-danger">{errors.email.message}</p>}
//                         </div>

//                         <div className="">
//                             <input 
//                             type="password" 
//                             className="login-input " 
//                             placeholder="Password" 
//                             {...register("password", { 
//                                 required: true,
//                                 minLength: {
//                                     value: 8,
//                                     message: "Password must be at least 8 characters long"
//                                 },
//                                 pattern: {
//                                     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
//                                     message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//                                 }
//                             })}
                            
//                             />
//                             {errors.password && <p className="text-danger">{errors.password.message}</p>}

//                         </div>
//                         <div className="">
//                             <button type="submit" className="btn btn-primary login-button" disabled={errors.email || errors.password}>Login</button>
//                         </div>

//                     </div>
//                     <div className="text-center mt-3">
//                         <label className="font-primary">Don't have an account?  </label>
//                         <Link to="/register" className="font-primary text-decoration-none link-primary">
//                             &nbsp;Sign up
//                         </Link>
//                     </div>
//                     <div className="text-center mt-3">
//                         <Link to="/register" className="font-primary text-decoration-none link-primary">
//                             &nbsp;Forget Password?
//                         </Link>
//                     </div>
//                     </form>
//                 </div>
//             </div>
//         </div>



//     )
// }



// export default LoginWithEmail