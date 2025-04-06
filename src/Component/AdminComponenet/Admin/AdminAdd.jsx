import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import listSolid from '../../../Images/list-solid.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Helper/loadingSpinner";
import { useForm } from "react-hook-form";
import ToastmMessage from "../../Helper/ToastmMessage";

const AdminAdd = () => {
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();

    const navigate = useNavigate();
    const password = watch("password", "");

    const onSubmit = async (data) => {
        try {
            const createEndpoint = `/admin/postAdmin/`;
            const adminToken = JSON.parse(localStorage.getItem('adminToken'))?.value;

            const adminData = {
                adminName: data.adminName,
                adminEmail: data.adminEmail,
                password: data.password,
                role: data.role
            };

            const res = await axios.post(process.env.REACT_APP_API_URL + createEndpoint, adminData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                },
            });

            setToastObject({ message: res?.data?.message, show: true });
            navigate('/admin/admin');
        } catch (error) {
            setToastObject({
                message: error?.response?.data?.message || 'An error occurred', 
                show: true
            });
        }
    };

    return (
        <div className="container-fluid">
            <LoadingSpinner isSubmitting={isSubmitting} />

            {toastObject.show &&
                <ToastmMessage 
                    message={toastObject.message} 
                    show={toastObject.show} 
                    onClose={() => setToastObject({ message: '', show: false })} 
                />
            }

            <div className="row">
                <Banner
                    bannerHeading="Add Admin"
                    imageUrl={listSolid}
                />

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mt-4">
                        {/* Admin Name Input */}
                        <div className="mb-3">
                            <label htmlFor="adminName" className="form-label">
                                Admin Name
                            </label>
                            <input
                                type="text"
                                className={`login-input ${errors.adminName ? "is-invalid" : ""}`}
                                {...register("adminName", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Must be at least 3 characters",
                                    },
                                })}
                                autoComplete="off"
                            />
                            {errors.adminName && (
                                <p className="link-primary">{errors.adminName.message}</p>
                            )}
                        </div>

                        {/* Email Input */}
                        <div className="mb-3">
                            <label htmlFor="adminEmail" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className={`login-input ${errors.adminEmail ? "is-invalid" : ""}`}
                                {...register("adminEmail", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                autoComplete="off"
                            />
                            {errors.adminEmail && (
                                <p className="link-primary">{errors.adminEmail.message}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className={`login-input ${errors.password ? "is-invalid" : ""}`}
                                {...register("password", {
                                    required: "Password is required",
                                    autoComplete: "off",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
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
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className={`login-input ${errors.confirmPassword ? "is-invalid" : ""}`}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => 
                                        value === password || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="link-primary">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Role Selection */}
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">
                                Role
                            </label>
                            <select
                                className={`login-input ${errors.role ? "is-invalid" : ""}`}
                                {...register("role", {
                                    required: "Role is required",
                                })}
                            >
                                <option value="">Select Role</option>
                                <option value="ADMIN">Admin</option> 
                                <option value="SUPERADMIN">Super Admin</option>
                            </select>
                            {errors.role && (
                                <p className="link-primary">{errors.role.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary login-button mb-5"
                                disabled={isSubmitting || Object.keys(errors).length > 0}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Admin'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAdd;