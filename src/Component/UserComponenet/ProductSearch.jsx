import React, { useEffect, useState } from "react";
import ProductCard from "../Resuablecomponenet/ProductCard";
import axios from "axios";
import LoadingSpinner from "../Helper/loadingSpinner";
import ToastmMessage from "../Helper/ToastmMessage";
import { set } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const ProductSearch = () => {

    const [searchParams] = useSearchParams();
    const search = searchParams.get('text') || '';
    console.log(search);
    const ctsArray = "abc abs";
    const categoryName = ctsArray[0];
    const categoryId = ctsArray[1];
    const category = JSON.parse(localStorage.getItem("selectedCategory"));
    


    const [products, setProducts] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [toastObject, setToastObject] = useState({
        message: '',
        show: false,
    });
    const fetchProduct = async (page, limit, next = false) => {
        console.log(category)
        setLoading(true);
        const mainLocation = JSON.parse(localStorage.getItem("mainLocation"));
        console.log(mainLocation);
        const token = JSON.parse(localStorage.getItem("token")).value
        const categoryId = category?.id || null;
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/searchProduct/`,
                {
                    limit,
                    page: page,
                    categoryId: categoryId,
                    ...mainLocation,
                    searchText: search
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            console.log(response.data.data);
            if (next) {
                const newProducts = response.data.data.products || [];
                setProducts((prevProducts) =>
                    next ? [...prevProducts, ...newProducts] : newProducts
                );

            } else {
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
        fetchProduct(1, 100);
    }, [search,localStorage.getItem("selectedCategory")]);

    const sortByPriceLowToHigh = () => {
        const sortedProducts = products.sort((a, b) => a.price - b.price);
        setProducts([...sortedProducts]);
    }

    const sortByPriceHighToLow = () => {
        console.log('sort by price high to low');
        setLoading(true);
        const sortedProducts = products.map
        setProducts([...sortedProducts]);

        setLoading(false);
    }

    // Function to sort products by date
  const sortProductsByDate = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();

      if (order === 'asc') {
        return dateA - dateB; // Ascending order (oldest to newest)
      } else {
        return dateB - dateA; // Descending order (newest to oldest)
      }
    });

    setProducts(sortedProducts); // Update the state with sorted products
  };

    // Function to sort products by price
    const sortProductsByPrice = (order) => {

        setLoading(true); // Set loading to true

        const sortedProducts = [...products].sort((a, b) => {
          if (order === 'asc') {
            return a.price - b.price;
          } else {
            return b.price - a.price; 
          }
        });
    
        setProducts(sortedProducts); 
        setLoading(false);

      };


    return (
        <div className="container">
            {toastObject.show &&
                <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
            }


            <LoadingSpinner isSubmitting={loading} />
            {products?.length > 0 &&
                <>


                    <div className="row">
                        
                        <h1 className="mt-3 mb-5 font-h1 size-2">
                            {`search results for "${search}"`}
                            {category?.name && ` in "${category?.name}"`} 
                        </h1>

                        <div className="col-xs-10 col-md-6 col-xl-3 mb-4">
                            <button style={{width:'100%' ,fontSize:'1.2rem'}} className="category-button" onClick={() => sortProductsByPrice()}>
                            Sort By Price &nbsp;
                            <i class="fa-solid fa-arrow-up"></i>
                            </button>
                        </div>

                        <div className="col-xs-10 col-md-6 col-xl-3 mb-4">
                            <button style={{width:'100%' ,fontSize:'1.2rem'}} className="category-button" onClick={()=>{sortProductsByPrice('asc')}}>
                            Sort By Price &nbsp;
                            <i class="fa-solid fa-arrow-down"></i>
                            </button>
                        </div>
                        
                        <div className="col-xs-10 col-md-6 col-xl-3 mb-4">
                            <button style={{width:'100%' ,fontSize:'1.2rem'}} className="category-button" onClick={() => sortProductsByDate()}>
                            Sort By Publish Date &nbsp;
                            <i class="fa-solid fa-arrow-up"></i>
                            </button>
                        </div>

                        <div className="col-xs-10 col-md-6 col-xl-3 mb-4">
                            <button style={{width:'100%' ,fontSize:'1.2rem'}} className="category-button" onClick={()=>{sortProductsByDate('asc')}}>
                            Sort By Publish Date &nbsp;
                            <i class="fa-solid fa-arrow-down"></i>
                            </button>
                        </div>
                        

                      
                        
                    </div>


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
                            onClick={() => fetchProduct(nextPage, 100, true)}
                            disabled={nextPage === null}
                        >
                            Load More
                        </button>

                    </div>
                </>
            }
            {products?.length === 0 && loading === false &&
                <h1 className="text-center mt-3 mb-5 font-h1 size-2">No Products Found</h1>
            }
        </div>
    );
};

export default ProductSearch;

