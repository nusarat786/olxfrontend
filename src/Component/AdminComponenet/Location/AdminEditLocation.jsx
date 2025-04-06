import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import listSolid from '../../../Images/list-solid.png';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../Helper/loadingSpinner";
import { set, useForm } from "react-hook-form";
import ToastmMessage from "../../Helper/ToastmMessage";

const AdminEditLocation = () => {
    const { id } = useParams();
    const locationEndpoint = `/admin/location/getLocationById`;
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [loc,setLoc] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm();

    const navigate = useNavigate();

    const fetchLocation = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(process.env.REACT_APP_API_URL + locationEndpoint, {
                "locationId": id,
            },{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('adminToken')).value}`,
                },
            });
            const data = response.data?.data?.location;
            setLoc(data);
            setValue("name", data?.name);
            setValue("latitude", data?.latitude);
            setValue("longitude", data?.longitude);
        } catch (error) {
            console.error("Error fetching location:", error);
            setToastObject({message: error?.response?.data?.message || 'An error occurred', show: true});
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    const onSubmit = async (data) => {
        try {
            const updateData = {
                name: data.name,
                latitude: parseFloat(data.latitude),
                longitude: parseFloat(data.longitude),
                id: loc?.id,
                parentId: loc?.parentId,
                type: loc?.type,
            };

            const updateEndpoint = `/admin/location/updateLocation`;
            const adminToken = JSON.parse(localStorage.getItem('adminToken')).value;

            const res = await axios.post(process.env.REACT_APP_API_URL + updateEndpoint, updateData, {
                contentType: 'application/json',
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });

            setToastObject({message: res?.data?.message, show: true});
            navigate('/admin/Location');
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
                    bannerHeading="Edit Location"
                    imageUrl={listSolid}
                />

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mt-4">
                        {/* Name Input */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Location Name
                            </label>
                            <input
                                type="text"
                                className={`login-input ${errors.name ? "is-invalid" : ""}`}
                                {...register("name", {
                                    required: "Location name is required",
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

                        {/* Latitude Input */}
                        <div className="mb-3">
                            <label htmlFor="latitude" className="form-label">
                                Latitude
                            </label>
                            <input
                                type="number"
                                step="any"
                                className={`login-input ${errors.latitude ? "is-invalid" : ""}`}
                                {...register("latitude", {
                                    required: "Latitude is required",
                                    min: {
                                        value: -90,
                                        message: "Latitude must be between -90 and 90"
                                    },
                                    max: {
                                        value: 90,
                                        message: "Latitude must be between -90 and 90"
                                    }
                                })}
                            />
                            {errors.latitude && (
                                <p className="link-primary">{errors.latitude.message}</p>
                            )}
                        </div>

                        {/* Longitude Input */}
                        <div className="mb-3">
                            <label htmlFor="longitude" className="form-label">
                                Longitude
                            </label>
                            <input
                                type="number"
                                step="any"
                                className={`login-input ${errors.longitude ? "is-invalid" : ""}`}
                                {...register("longitude", {
                                    required: "Longitude is required",
                                    min: {
                                        value: -180,
                                        message: "Longitude must be between -180 and 180"
                                    },
                                    max: {
                                        value: 180,
                                        message: "Longitude must be between -180 and 180"
                                    }
                                })}
                            />
                            {errors.longitude && (
                                <p className="link-primary">{errors.longitude.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary login-button mb-5"
                                disabled={isSubmitting || Object.keys(errors).length > 0}
                            >
                                Update Location
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditLocation;