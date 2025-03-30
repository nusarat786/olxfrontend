import React, { useState } from 'react';
import "./productbyId.css"; // Custom CSS for the dropdown

const ProductDetail = () => {
    const [isLiked, setIsLiked] = useState(false);

    const product = {
        geoLocation: {
            type: "Point",
            coordinates: [73.22396, 22.301]
        },
        _id: "67d1d06b696fd4a9e28a175b",
        title: "Vivo 19 Ok",
        description: "Quite Good Quality",
        price: 2500,
        mainCategory: {
            _id: "67d1cefa696fd4a9e28a16c4",
            name: "Mobile",
            description: "Mobile Related Thing",
            subCategories: [
                {
                    _id: "67d1cf43696fd4a9e28a16c7",
                    name: "Mobile",
                    attributes: [
                        { name: "Brand", required: true, type: "string", _id: "67d1cf43696fd4a9e28a16c8" },
                        { name: "RAM", required: true, type: "number", _id: "67d1cf43696fd4a9e28a16c9" },
                        { name: "Color", required: false, type: "string", _id: "67d1cf43696fd4a9e28a16ca" },
                        { name: "Storage", required: true, type: "number", _id: "67d1cf43696fd4a9e28a16cb" },
                        { name: "Battery", required: false, type: "number", _id: "67d1cf43696fd4a9e28a16cc" },
                        { name: "Processor", required: true, type: "string", _id: "67d1cf43696fd4a9e28a16cd" },
                        { name: "Screen Size", required: true, type: "number", _id: "67d1cf43696fd4a9e28a16ce" },
                        { name: "Camera", required: false, type: "string", _id: "67d1cf43696fd4a9e28a16cf" },
                        { name: "Operating System", required: true, type: "string", _id: "67d1cf43696fd4a9e28a16d0" },
                        { name: "Network Type", required: false, type: "string", _id: "67d1cf43696fd4a9e28a16d1" },
                        { name: "Price", required: true, type: "number", _id: "67d1cf43696fd4a9e28a16d2" },
                        { name: "Warranty", required: false, type: "string", _id: "67d1cf43696fd4a9e28a16d3" },
                        { name: "Weight", required: false, type: "number", _id: "67d1cf43696fd4a9e28a16d4" },
                        { name: "Connectivity", required: false, type: "string", _id: "67d1cf43696fd4a9e28a16d5" }
                    ]
                }
            ],
            createdAt: "2025-03-12T18:14:18.390Z",
            __v: 0
        },
        subCategory: "67d1cf43696fd4a9e28a16c7",
        images: [
            "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803626/products/qdhxj752izbtmyukscf9.jpg",
            "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803627/products/gzuqzseoyksqem0osazi.jpg",
            "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803625/products/h6pits24zq5js2gkrkxy.jpg"
        ],
        location: {
            _id: "6797b3eb3fb3b9675889c329",
            id: 5308715,
            name: "Pani Taki Chowk",
            type: "NEIGHBOURHOOD",
            longitude: 73.22396,
            latitude: 22.301,
            parentId: 4058732,
            __v: 0,
            createdAt: "2025-01-27T16:27:27.202Z",
            updatedAt: "2025-01-27T16:27:27.202Z"
        },
        condition: "new",
        seller: {
            _id: "67cf0d7529391b9d8c9d6821",
            firstName: "Nusarat",
            lastName: "Haveliwala",
            email: "nusrathaveliwala2@gmail.com",
            phone: "9586213286",
            phoneCode: "91",
            profilePicture: "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741622645/user_profiles/15d477f5-640c-4510-9df4-18a8e1a30aa5-1741622642000-143750876.jpg",
            userType: "user",
            createdAt: "2025-03-10T16:04:05.765Z"
        },
        status: "active",
        viewCount: 0,
        likedBy: [],
        publishedAt: "2025-03-12T18:10:38.194Z",
        dynamicFields: {
            Brand: "Vivo",
            RAM: 8,
            Storage: 128,
            Processor: "Snapdragon 720G",
            "Screen Size": 6.5,
            "Operating System": "Android 12"
        },
        createdAt: "2025-03-12T18:20:27.296Z",
        updatedAt: "2025-03-12T18:20:27.296Z",
        __v: 0
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className="container-fluid p-4" style={{fontFamily: 'var(--font-primary)' }}>
            <div className="row">
                {/* Image Carousel Section */}
                <div className="col-md-6">
                    <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {product.images.map((img, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={img} className="d-block w-100 rounded" alt={`Product view ${index + 1}`} style={{ maxHeight: '500px', objectFit: 'cover' }} />
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
                        Posted in <strong>{product.location.name}</strong> on {new Date(product.publishedAt).toLocaleDateString()}
                    </p>

                    {/* Share and Like Buttons */}
                    <div className="d-flex gap-3 mb-4">
                        <button className="btn btn-outline-danger" onClick={handleShare}>
                        <i class="fa-solid fa-link"></i> link
                        </button>
                        <button className="btn btn-outline-danger" onClick={handleLike}>
                            {isLiked ? <i class="fa-solid fa-heart"></i>: <i class="fa-regular fa-heart"></i>} Like
                        </button>
                    </div>


                    {/* Seller Section */}
                    <div className="mb-4">
                        <h3 className="font-h1 size-2">Seller Information</h3>
                        <div className="d-flex align-items-center mt-4">
                            <img src={product.seller.profilePicture} alt="Seller" className="rounded-circle me-3" style={{ width: '80px', height: '80px' }} />
                            <div>
                                <p className="mb-0">{product.seller.firstName} {product.seller.lastName}</p>
                                <button className="chat-seller-button">Chat with Seller</button>
                            </div>
                        </div>
                    </div>
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

            {product.dynamicFields && (
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
            <div className="row mt-4">
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
            </div>
        </div>
    );
};

export default ProductDetail;