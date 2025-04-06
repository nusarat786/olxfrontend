import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import listSolid from '../../../Images/list-solid.png';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../Helper/loadingSpinner";
import { set, useForm } from "react-hook-form";
import ToastmMessage from "../../Helper/ToastmMessage";
import { fetchFromApi, fetchFromApi2 } from "../../Helper/functions";
import LocationSelect from "./AdminLocationSelect";

const AdminAddLocation = () => {
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [parentLocation, setParentLocation] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        control,
        watch,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const confirmSubmit = window.confirm("Are you sure you want to add this location?");
            if (!confirmSubmit) return;

            setIsLoading(true);

            console.log(data);

            let type = 'CUNTRY';

            if(parentLocation?.type === 'COUNTRY') type = 'STATE';
            if(parentLocation?.type === 'STATE') type = 'CITY';
            if(parentLocation?.type === 'CITY') type = 'NEIGHBOURHOOD';
            

            if(parentLocation?.type === 'NEIGHBOURHOOD'){
                setToastObject({ message: 'Can not add location under neighborhood', show: true });
                return false;
            }

            
            const postData = {
                id: parseInt(new Date().getTime()/1000),
                name: data.name,
                parentId: parentLocation?.id || null,
                latitude: data.latitude,
                longitude: data.longitude,
                type: type
            };

            const adminToken = JSON.parse(localStorage.getItem('adminToken')).value;

            const res = await axios.post(
                process.env.REACT_APP_API_URL + "/admin/location/addLocation",
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        'Content-Type': 'application/json'
                    },
                }
            );

            setToastObject({ message: res?.data?.message, show: true });
            setTimeout(() => {
                navigate('/admin/Location');
            }, 1500);
        } catch (error) {
            setToastObject({ 
                message: error?.response?.data?.message || 'An error occurred while adding location', 
                show: true 
            });
        } finally {
            setIsLoading(false);
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
                    bannerHeading="Add Location"
                    fasSrc="fa-solid fa-location-dot"
                />

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mt-4">
                        {/* Parent Location Select */}
                        <div className="mb-3">
                            <label htmlFor="parentLoc" className="form-label">Parent Location (Optional)</label>
                            <LocationSelect 
                                setLoc={setParentLocation} 
                                value={parentLocation}
                            />
                        </div>

                        {/* Location Name */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Location Name*</label>
                            <input
                                type="text"
                                placeholder="Enter location name"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                {...register("name", {
                                    required: "Location name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Must be at least 2 characters",
                                    },
                                })}
                                autoComplete="off"
                            />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name.message}</div>
                            )}
                        </div>

                        {/* Latitude */}
                        <div className="mb-3">
                            <label htmlFor="latitude" className="form-label">Latitude*</label>
                            <input
                                type="number"
                                step="any"
                                placeholder="Enter latitude"
                                className={`form-control ${errors.latitude ? "is-invalid" : ""}`}
                                {...register("latitude", {
                                    required: "Latitude is required",
                                    valueAsNumber: true,
                                })}
                            />
                            {errors.latitude && (
                                <div className="invalid-feedback">{errors.latitude.message}</div>
                            )}
                        </div>

                        {/* Longitude */}
                        <div className="mb-3">
                            <label htmlFor="longitude" className="form-label">Longitude*</label>
                            <input
                                type="number"
                                step="any"
                                placeholder="Enter longitude"
                                className={`form-control ${errors.longitude ? "is-invalid" : ""}`}
                                {...register("longitude", {
                                    required: "Longitude is required",
                                    valueAsNumber: true,
                                })}
                            />
                            {errors.longitude && (
                                <div className="invalid-feedback">{errors.longitude.message}</div>
                            )}
                        </div>

                       

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary login-button mb-5"
                                disabled={isSubmitting || isLoading || Object.keys(errors).length > 0}
                            >
                                {isLoading ? 'Adding...' : 'Add Location'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAddLocation;