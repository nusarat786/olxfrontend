import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import listSolid from '../../../Images/list-solid.png';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../Helper/loadingSpinner";
import { useForm } from "react-hook-form";
import ToastmMessage from "../../Helper/ToastmMessage";

const AdminEdit = () => {
    const { id } = useParams();
    const adminEndpoint = `/admin/getAdminById/${id}`;
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
        trigger
    } = useForm({
        mode: 'onChange' // Validate on change for better UX
    });

    const navigate = useNavigate();
    const password = watch("password", "");

    // Custom password validation that only runs when there's a value
    const validatePassword = (value) => {
        if (!value) return true; // Skip validation if empty
        
        if (value.length < 8) {
            return "Password must be at least 8 characters";
        }
        
        // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        //     return "Password must contain at least one uppercase, one lowercase, one number and one special character";
        // }
        
        return true;
    };

    const fetchAdmin = async () => {
        try {
            setIsLoading(true);
            const adminToken = JSON.parse(localStorage.getItem('adminToken'))?.value;
            const response = await axios.get(process.env.REACT_APP_API_URL + adminEndpoint, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                }
            });
            
            const data = response.data?.data?.admin;
            setValue("adminName", data?.adminName);
            setValue("adminEmail", data?.adminEmail);
            setValue("role", data?.role);
            
        } catch (error) {
            setToastObject({
                message: error?.response?.data?.message || 'An error occurred', 
                show: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmin();
    }, []);

    // Only trigger password validation when there's a value
    useEffect(() => {
        if (password) {
            trigger("password");
        }
    }, [password, trigger]);

    const onSubmit = async (data) => {
        try {
            const updateData = {
                adminName: data.adminName,
                adminEmail: data.adminEmail,
                ...(data.password && { password: data.password }),
                role: data.role
            };

            const updateEndpoint = `/admin/putAdmin/${id}`;
            const adminToken = JSON.parse(localStorage.getItem('adminToken'))?.value;

            const res = await axios.put(process.env.REACT_APP_API_URL + updateEndpoint, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                },
            });

            setToastObject({ message: res?.data?.message, show: true });
            setTimeout(() => {
                navigate('/admin/admin');
            }, 2000); 
        } catch (error) {
            setToastObject({
                message: error?.response?.data?.message || 'An error occurred', 
                show: true
            });
        }
    };

    return (
        <div className="container-fluid">
            <LoadingSpinner isSubmitting={isSubmitting || isLoading} />

            {toastObject.show &&
                <ToastmMessage 
                    message={toastObject.message} 
                    show={toastObject.show} 
                    onClose={() => setToastObject({ message: '', show: false })} 
                />
            }
            
            <div className="row">
                <Banner
                    bannerHeading="Edit Admin"
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

                        {/* Password Input (optional for update) */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                New Password (leave blank to keep current)
                            </label>
                            <input
                                type="password"
                                className={`login-input ${errors.password ? "is-invalid" : ""}`}
                                {...register("password", {
                                    validate: validatePassword
                                })}
                            />
                            {/* {errors.password && (
                                <p className="link-primary">{errors.password.message}</p>
                            )} */}
                        </div>

                        {/* Confirm Password Input */}
                        {password && (
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    className={`login-input ${errors.confirmPassword ? "is-invalid" : ""}`}
                                    {...register("confirmPassword", {
                                        validate: value => 
                                            value === password || "Passwords do not match",
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <p className="link-primary">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        )}

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
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Updating...' : 'Update Admin'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEdit;