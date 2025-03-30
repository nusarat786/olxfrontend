import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../Helper/functions";
import ToastmMessage from "../Helper/ToastmMessage";
import LoadingSpinner from "../Helper/loadingSpinner";
import MapComponent from "../Resuablecomponenet/MapComponent";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
const ProductById = () => {

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
    });
    const id = JSON.parse(localStorage.getItem("id")).value;
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {

        fetchFromApi(
            { id: productId },
            "/user/product/getProductById",
            "product",
            setProduct,
            setLoading,
            setToastObject
        )

        fetchFromApi(
            { id: productId },
            "/checkLike/",
            "like",
            setIsLiked,
            setLoading,
            setToastObject
        )


        const setTemp = (data)=>{
            return true
        }
        
        fetchFromApi(
            {id: productId},
            "/user/viwecount/",
            "product",
            setTemp,
            setTemp,
            setTemp
        )
    }, [])

    const navigate =useNavigate()
    
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setToastObject({
            message: 'Link copied to clipboard!',
            show: true,
        });
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        fetchFromApi(
            { id: productId },
            "/user/likeProduct/",
            "like",
            setIsLiked,
            setLoading,
            setToastObject
        )
    };

    const openChat = () =>{
        const buyerId = JSON.parse(localStorage.getItem("id")).value;
        navigate(`/chat/${product._id}_${buyerId}_${product.seller._id}`);
    }

    const handleCall = () => {
       
        if (product?.seller?.phoneCode && product?.seller?.phone) {
            window.location.href = `tel:+${product.seller.phoneCode}${product.seller.phone}`;
            navigator.clipboard.writeText(`+${product.seller.phoneCode}${product.seller.phone}`);

            setToastObject({
                message: 'Number copied to clipboard!',
                show: true,
            });

        } else {
            console.error("Phone number is missing.");
        }


    };

    

    return (
        <div className="container-fluid p-4" style={{ fontFamily: 'var(--font-primary)' }}>
            {toastObject.show &&
                <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
            }
            <LoadingSpinner isSubmitting={loading} />
            {product && <>
            <div className="row">
                {/* Image Carousel Section */}
                <div className="col-md-6">
                    <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {product.images.map((img, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={img} className="d-block w-100 rounded" alt={`Product view ${index + 1}`} style={{ maxHeight: '550px', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="col-md-6">
                    <h1 className="mb-3 mt-3" style={{ color: 'var(--gc2)' }}>{product.title}</h1>
                    <h2 className="mb-3" style={{ color: 'var(--gc1)' }}>₹{product.price}</h2>
                    <p className="text-muted mb-3">
                        Posted in <strong>
                        {`${product?.neighbourhood?.name ? product?.neighbourhood?.name + ', ' :''} ${product?.city?.name || ''}, ${product?.state?.name || ''}`}
                            
                        </strong> on {new Date(product.publishedAt).toLocaleDateString()}
                    </p>


                    {id !== product.seller._id && 
                    <div className="d-flex gap-3 mb-4">
                        <button className="btn btn-outline-danger" onClick={handleShare}>
                            <i class="fa-solid fa-link"></i> link
                        </button>
                        <button className="btn btn-outline-danger" onClick={handleLike}>
                            {isLiked ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>} Like
                        </button>
                        {product?.seller?.phone &&
                        <button className="btn btn-outline-danger" onClick={handleCall}>
                            <i class="fa-solid fa-phone"></i> Call
                        </button>
                        }   
                    </div>
         }


                    {/* Seller Section */}
                    {id !== product.seller._id && 
                    <div className="mb-4">
                        <h3 className="font-h1 size-2">Seller Information</h3>
                        <div className="d-flex align-items-center mt-4">
                            <img src={product.seller.profilePicture} alt="Seller" className="rounded-circle me-3" style={{ width: '80px', height: '80px' }} />
                            <div>
                                <p className="mb-0">{product.seller.firstName} {product.seller.lastName}</p>
                                <button className="chat-seller-button" onClick={openChat}>Chat with Seller</button>
                            </div>
                        </div>
                    </div>
                    }

                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    {/* Description Section */}
                    <div className="description-container"> {/* Add a container for better control */}
                        <h3 className="font-h1 size-2">Description</h3> {/* Add a custom class for the title */}
                        <pre className="description-content"> {/* Use <pre> tag for text formatting */}
                            {product.description}
                        </pre>
                    </div>
                </div>
            </div>

            {product.dynamicFields && Object.keys(product.dynamicFields).length > 0 && (
                <div className="row mt-4">
                    <div className="col-12">
                        <h3 className="font-h1 size-2">Product Details</h3>
                        <div className="table-responsive"> {/* Add this wrapper for responsiveness */}
                            <table className="table table-bordered custom-table"> {/* Add a custom class for theme styling */}
                                <tbody>
                                    {Object.entries(product.dynamicFields).map(([key, value]) => (
                                        <tr key={key}>
                                            <th>{key}</th>
                                            <td>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}


            {/* Map Section */}
            {/* <div className="row mt-4">
                <div className="col-12">
                    <iframe
                        title="Location Map"
                        width="100%"
                        height="450"
                        style={{ border: 0, borderRadius: '10px' }}
                        src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${product.geoLocation.coordinates[1]},${product.geoLocation.coordinates[0]}&zoom=14`}
                        allowFullScreen>
                    </iframe>
                </div>
            </div> */}
            <div className="row mt-4">
            <MapComponent mainLocation={product.location} />

            </div>
            </>
            }
        </div>
        );

    }
export default ProductById;