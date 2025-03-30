import React, { useEffect, useState } from "react";
import ProductCard from "../Resuablecomponenet/ProductCard";
import axios from "axios";
import LoadingSpinner from "../Helper/loadingSpinner";
import ToastmMessage from "../Helper/ToastmMessage";
import { set } from "react-hook-form";

const ProductCardList = () => {

    const [products,setProducts] = useState([]);
    const [nextPage,setNextPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
      });
    const fetchProduct = async (page,limit,next=false) => {
        setLoading(true);
        const mainLocation = JSON.parse(localStorage.getItem("mainLocation"));
        console.log(mainLocation);
        const token = JSON.parse(localStorage.getItem("token")).value
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/product/getProductsHome`,
            {limit, page:page,...mainLocation},
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
            }
          );
          console.log(response.data.data);
          if(next){
            const newProducts = response.data.data.products || [];
            setProducts((prevProducts) =>
              next ? [...prevProducts, ...newProducts] : newProducts
            );
      
        }else{
            setProducts(response.data.data.products);
          }
          setNextPage(response.data.data.paginationInfo.nextPage);
          setToastObject({
            message: response?.data?.message,
            show: true,
          });
        } catch (error) {
          console.error("Error fetching locations:", error);

          setToastObject({
            message: error?.response?.data?.message || 'An error occurred',
            show: true,
          });
    
        } finally {
          setLoading(false);
        }
      };
    
    useEffect(() => {
        fetchProduct(1,25);
    },[])


      return (
        <div className="container">

            {toastObject.show &&
                <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
            }
            <LoadingSpinner isSubmitting={loading}/>
        {products?.length > 0 &&
          <div className="row">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ProductCard product={product} />
              </div>
            ))}

              <button
                className="btn btn-primary login-button mb-5"
                onClick={() => fetchProduct(nextPage, 25,true)}
                disabled={nextPage === null}
              >
                Load More
              </button>
            
          </div>
    }
          {products?.length === 0 && loading === false &&
                <h1 className="text-center mt-3 mb-5 font-h1 size-2">No Products Found</h1>
          }
        </div>
      );
    };
    
export default ProductCardList;

