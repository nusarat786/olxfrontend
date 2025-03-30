import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Helper/loadingSpinner';
import axios from 'axios';
import ToastmMessage from '../Helper/ToastmMessage';
import { setTokenWithExpiry } from '../Helper/functions';

const GoogleAuth = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);  
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
    });

    const navigate = useNavigate();
    const location = useLocation();

    
    useEffect(() => {
        console.log("Query Params:", location.search);
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");
        console.log("Token:", token);

        if (!token) {
            console.log("No token found in query params");
            return;
        }

        console.log("Token found:", token); 
        
        setIsSubmitting(true);

        const verifyToken = async () => {
            console.log('Verifying token:', token);
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/userRoutes/verifyToken/`, { token },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                console.log('Response:', response);
                setToastObject({ message: response.data.message, show: true });
                setTokenWithExpiry(token);
                navigate('/home');
            } catch (error) {
                console.error('Error:', error);
                setToastObject({ message: error.response.data.message + " (please try again)", show: true });
                setTimeout(() => {
                    navigate('/login');
                }, 3000);

            }finally{
                setIsSubmitting(false);
            }


        }   


        verifyToken();

    }, [location.search]);

    return (
        <div className='container-fluid'>
            {toastObject.show && (
                <ToastmMessage 
                    message={toastObject.message} 
                    show={toastObject.show} 
                    onClose={() => setToastObject({ message: '', show: false })} 
                />
            )}
            <LoadingSpinner className='bg-light' isSubmitting={isSubmitting} />
        </div>
    );
};

export default GoogleAuth;

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../Helper/loadingSpinner';
// import axios from 'axios';
// import ToastmMessage from '../Helper/ToastmMessage';
// import { setTokenWithExpiry } from '../Helper/functions';

// const GoogleAuth = () => {
//         const [isSubmitting, setIsSubmitting] = useState(false);  
        
//         const [toastObject, setToastObject] = useState({
//             message: '',
//             show: false,
//           });

//     const navigate = useNavigate();
//     // ✅ Get query parameters
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const token = queryParams.get("token"); // Get the `token` from query params


//     useEffect(() => {
//         setIsSubmitting(true);

//         console.log("Token:", token);
        
//         const verifyToken = async () => {
//             console.log('Verifying token:', token);
//             try {
//                 const response = await axios.post(`${process.env.REACT_APP_API_URL}/userRoutes/verifyToken/`,{token:token});
//                 console.log('Response:', response);
//                 setIsSubmitting(false);
//                 setToastObject({ message: response.data.message, show: true });
//                 setTokenWithExpiry(token);
//                 navigate('/home');

//             } catch (error) {
//                 console.log('Error:', error);
//                 setToastObject({ message: error.response.data.message, show: true });
//             }finally{
//                 setIsSubmitting(false);
//             }

//         }

//         verifyToken();


//     }, [token]); // 👈 Depend on token, so it updates when token changes

//     return (
//         <div className='container-fluid'>
//             {toastObject.show && <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />}
//             <LoadingSpinner className='bg-light' isSubmitting={isSubmitting} />
//         </div>
//     );

// };

// export default GoogleAuth;
