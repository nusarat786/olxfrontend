import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import listSolid from '../../../Images/list-solid.png';
import DataTable from "../DataTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Helper/loadingSpinner";
import ToastmMessage from "../../Helper/ToastmMessage";

const AdminManagement = () => {
    const adminEndpoint = '/admin/getAllAdmin';
    const [admins, setAdmins] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
    });
    
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setIsSubmitting(true);
            const adminToken = JSON.parse(localStorage.getItem("adminToken"))?.value;
            const response = await axios.post(process.env.REACT_APP_API_URL + adminEndpoint, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                }
            });
            
            const data = response?.data?.data?.admins;
            const adminList = data.map((admin, index) => ({
                'Sr.no': index + 1,
                id: admin._id,
                name: admin.adminName,
                email: admin.adminEmail,
                role: admin.role,
            }));

            setAdmins(adminList);
            setColumns(getColumns(adminList, ["__v"]));

            setToastObject({
                message: response?.data?.message,
                show: true,
            });

        } catch (error) {
            console.error("Error fetching admins:", error);
            setToastObject({
                message: error?.response?.data?.message || 'An error occurred',
                show: true,
            });
        } finally {
            setIsSubmitting(false);   
        }
    };

    const getColumns = (data, skipKeys) => {
        const columns = [];
        if (data.length > 0) {
            const firstItem = data[0];
            for (const key in firstItem) {
                if (firstItem.hasOwnProperty(key)) {
                    if(skipKeys && skipKeys.includes(key)) continue;
                    columns.push({ 
                        label: key === 'Sr.no' ? 'Sr.no' : 
                              key === 'adminName' ? 'Name' : 
                              key === 'adminEmail' ? 'Email' : 
                              key.charAt(0).toUpperCase() + key.slice(1), 
                        field: key 
                    });
                }
            }
        }
        return columns;
    };  

    useEffect(() => {
        fetchData();
    }, []);

    const editAdmin = (id) => {
        navigate(`/admin/admin/${id}`);
    }
    
    const deleteAdmin = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
        if (confirmDelete) {
            try {
                setIsSubmitting(true);
                const deleteEndpoint = `/admin/deleteAdminById/${id}`;
                const adminToken = JSON.parse(localStorage.getItem("adminToken")).value;
                const request = await axios.delete(
                    process.env.REACT_APP_API_URL + deleteEndpoint,
                    {
                        headers: {
                            Authorization: `Bearer ${adminToken}`,
                        }
                    }
                );
                setToastObject({
                    message: request?.data?.message,
                    show: true,
                });

                setTimeout(() => {
                    fetchData();
                }
                , 1000);
            } catch (error) {
                console.error("Error deleting admin:", error);
                setToastObject({
                    message: error?.response?.data?.message || 'An error occurred', 
                    show: true
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    }

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
                    bannerHeading="Admin Management"
                    imageUrl={listSolid}
                />
                <DataTable
                    columns={columns}
                    data={admins}
                    onEdit={editAdmin}
                    onDelete={deleteAdmin}
                    onAdd={() => navigate('/admin/admins/add')}
                    addButtonText="Add New Admin"
                />
            </div>
        </div>
    );
};

export default AdminManagement;