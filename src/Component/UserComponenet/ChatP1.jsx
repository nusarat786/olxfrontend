import React, { useEffect, useState } from "react";
import { fetchFromApi } from "../Helper/functions";
import { useNavigate } from "react-router-dom";
import './Chat.css'
export default function ChatP1({chatInfo}) {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
    });
    const [isLiked, setIsLiked] = useState(false);


    useEffect(() => {

        fetchFromApi(
            { id:chatInfo.productId },
            "/user/product/getProductById",
            "product",
            setProduct,
            setLoading,
            setToastObject
        )

    }, [])

    const navigate =useNavigate()
    
  return (
    <div className="col-md-12 ">
      {product &&
      <div className="row sec1 m-2">
        <div className="sec1-1-f">
          <img src={product.images[0]} alt={product.name}  className="img-fluid product-image" />
          <p>{product.seller.firstName  + " " + product.seller.lastName}</p>
        </div>
        
      </div>
      }
    </div>
  );
}

