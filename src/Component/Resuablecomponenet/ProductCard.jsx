import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFromApi, getDistance } from "../Helper/functions";

const ProductCard = ({ product  }) => {
  const userId = JSON.parse(localStorage.getItem("id"))?.value;
  const [isLiked, setIsLiked] = useState(product.likedBy.includes(userId || ""));
  const userLocation = JSON.parse(localStorage.getItem("userLocation"));
  const [distance, setDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for demonstration purposes
    const timer = setTimeout(() => {
      const d = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        product.location.latitude,
        product.location.longitude
      );
      setDistance(d);
      setIsLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [userLocation, product.location]);

  if (isLoading) {
    return (
      <div
        className="card mb-4 shadow-sm text-decoration-none text-dark"
        style={{
          background: "var(--background-color-main)",
          borderRadius: "8px",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
      >
        <div className="position-relative">
          {/* Skeleton loader for image */}
          <div
            className="card-img-top"
            style={{
              height: "200px",
              background: "var(--border-color)",
              animation: "pulse 1.5s infinite",
            }}
          ></div>
        </div>
        <div className="card-body">
          {/* Skeleton loader for title */}
          <div
            style={{
              height: "24px",
              background: "var(--border-color)",
              width: "80%",
              marginBottom: "10px",
              animation: "pulse 1.5s infinite",
            }}
          ></div>
          {/* Skeleton loader for price */}
          <div
            style={{
              height: "20px",
              background: "var(--border-color)",
              width: "60%",
              animation: "pulse 1.5s infinite",
            }}
          ></div>
        </div>
        <div
          className="card-footer bg-transparent border-0 d-flex justify-content-end"
          style={{ fontFamily: "var(--font-primary)", color: "black" }}
        >
          {/* Skeleton loader for date */}
          <div
            style={{
              height: "16px",
              background: "var(--border-color)",
              width: "50%",
              animation: "pulse 1.5s infinite",
            }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/product/${product._id}`}
      className="card mb-4 shadow-sm text-decoration-none text-dark"
      style={{
        background: "var(--background-color-main)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "var(--box-shadow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--box-shadow)";
      }}
    >
      <div className="position-relative">
        {/* Product Image */}
        <img
          src={product.images[0]}
          className="card-img-top"
          alt={product.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        {/* Like Button */}
        <button
          className="btn btn-sm position-absolute top-0 end-0 m-2"
          style={{
            background: isLiked ? "var(--gc2)" : "var(--gradient-1l)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation when clicking the like button
            // Handle like/unlike logic here
            setIsLiked(!isLiked);

            const temp = () =>{

            }
            fetchFromApi(
              { id: product?._id },
              "/user/likeProduct/",
              "like",
              setIsLiked,
              temp,
              temp
            )

            const url = document.URL;
            if(url.includes("like")){
              document.getElementById(product._id).style.display = "none";
            }
            console.log("Like button clicked");
          }}
        >
          <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i>
        </button>
      </div>
      <div className="card-body">
        {/* Price */}
        <h5
          className="card-title"
          style={{
            fontFamily: "var(--font-primary)",
            color: "var(--gc2)",
            fontWeight: "bold",
          }}
        >
          ₹{product.price}
        </h5>
        {/* Product Title */}
        <p
          className="card-text"
          style={{
            fontFamily: "var(--font-primary)",
            color: "var(--border-color)",
          }}
        >
          {product.title && product.title.length > 15
            ? product.title.slice(0, 30) + "..." : product.title
          }
        </p>
      </div>
      {/* Published Date */}
      <div
        className="card-footer bg-transparent border-0 d-flex justify-content-end"
        style={{ fontFamily: "var(--font-primary)", color: "black" }}
      >
        <small>
          {new Date(product.publishedAt).toLocaleDateString()}
        </small>
      </div>
      <div
        className="card-footer bg-transparent border-0 d-flex justify-content-satrt"
        style={{ fontFamily: "var(--font-primary)", color: "black" }}
      >
        <small>
            <i className="fa-solid fa-location-dot" style={{color: "var(--gc2)"}}></i> 
            <b style={{color: "var(--gc2)",fontWeight:500}}>&nbsp; 
              {`${product?.nobj?.name ? product?.nobj?.name + ', ' :''} ${product?.cityobj?.name || ''}, ${product?.stateobj?.name || ''}`}
            </b>
            <br />
            <i className="fa-solid fa-plane"></i> {' ' + distance  + " km"}
        </small>
      </div>
    </Link>
  );
};

export default ProductCard;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getDistance } from "../Helper/functions";

// const ProductCard = ({ product }) => {
//   // Get userId from local storage
//   const userId = localStorage.getItem("userId");

//   // Check if the current user has liked the product
  
//   const [isLiked,setIsLiked] = useState(product.likedBy.includes(userId));
//   const userLocation =  JSON.parse(localStorage.getItem("userLocation"));
//   const d = getDistance(userLocation.latitude,userLocation.longitude,product.location.latitude,product.location.longitude)
//   const [distance,setDistance] = useState(d);

  


  
//   return (
//     <Link
//       to={`/product/${product._id}`}
//       className="card mb-4 shadow-sm text-decoration-none text-dark"
//       style={{
//         background: "var(--background-color-main)",
//         borderRadius: "8px",
//         overflow: "hidden",
//         transition: "transform 0.2s, box-shadow 0.2s",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "translateY(-5px)";
//         e.currentTarget.style.boxShadow = "var(--box-shadow)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "translateY(0)";
//         e.currentTarget.style.boxShadow = "var(--box-shadow)";
//       }}
//     >
//       <div className="position-relative">
//         {/* Product Image */}
//         <img
//           src={product.images[0]}
//           className="card-img-top"
//           alt={product.title}
//           style={{ height: "200px", objectFit: "cover" }}
//         />
//         {/* Like Button */}
//         <button
//           className="btn btn-sm position-absolute top-0 end-0 m-2"
//           style={{
//             background: isLiked ? "var(--gc2)" : "var(--gradient-1l)",
//             color: "white",
//             border: "none",
//             borderRadius: "50%",
//             width: "36px",
//             height: "36px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           onClick={(e) => {
//             e.preventDefault(); // Prevent navigation when clicking the like button
//             // Handle like/unlike logic here
//             setIsLiked(!isLiked);
//             console.log("Like button clicked");
//           }}
//         >
//           <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i>
//         </button>
//       </div>
//       <div className="card-body">
//         {/* Price */}
//         <h5
//           className="card-title"
//           style={{
//             fontFamily: "var(--font-primary)",
//             color: "var(--gc2)",
//             fontWeight: "bold",
//           }}
//         >
//           ₹{product.price}
//         </h5>
//         {/* Product Title */}
//         <p
//           className="card-text"
//           style={{
//             fontFamily: "var(--font-primary)",
//             color: "var(--border-color)",
//           }}
//         >
//           {product.title}
//         </p>
//       </div>
//       {/* Published Date */}
//       <div
//         className="card-footer bg-transparent border-0 d-flex justify-content-end"
//         style={{ fontFamily: "var(--font-primary)", color: "black" }}
//       >
//         <small>
//           {new Date(product.publishedAt).toLocaleDateString()}
//         </small>
//       </div>
//       <div
//         className="card-footer bg-transparent border-0 d-flex justify-content-satrt"
//         style={{ fontFamily: "var(--font-primary)", color: "black" }}
//       >
//         <small>
//             <i class="fa-solid fa-location-dot" style={{color: "var(--gc2)"}}></i> 
//             <b style={{color: "var(--gc2)",fontWeight:500}}>&nbsp; {product?.location?.name}</b>
//             <br />
//             <i class="fa-solid fa-plane"></i> {' ' + distance  + " km"}
//         </small>
        
//       </div>

//     </Link>
//   );
// };

// export default ProductCard;