import React, { use, useEffect, useState } from 'react';
import styles from '../css/ChatHistoryList.module.css';
import LoadingSpinner from '../../Helper/loadingSpinner';
import UserProductCard from './UserProductCard';
import ToastmMessage from '../../Helper/ToastmMessage';
import { fetchFromApi, fetchFromApi2 } from '../../Helper/functions';
import { useNavigate } from 'react-router-dom';



const UserProduct = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastObject, setToastObject] = useState({
    show: false,
    message: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchFromApi(
      {},
      '/user/product/',
      'userProducts',
      setProducts,
      setLoading,
      setToastObject
    );
  }, []);

  const handelSold = async (id) => {
    setLoading(true);

    const temp = () => {
    }
    
    fetchFromApi(
      { id: id },
      '/user/productStatus/',
      'product',
      temp,
      setLoading,
      setToastObject
    );

    setTimeout(() => {
      document.location.reload();
    }, 2000);
    document.location.reload();

  }

  const handelEdit = (product) => {
    
    if(product.status !== 'active'){
      setToastObject({ message: 'Product staus is not active can not be edited', show: true });
      return;
    }
    navigate(`/editProduct/${product._id}`);
  }

  return (
    <>
    <LoadingSpinner loading={loading} />
    {toastObject.show &&
                <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
            }

    <div className={styles.listContainer}>
      
      <h2 className={'font-h1 size-2 mb-4'}>My Products</h2>
      {products.map((product) => (
        <UserProductCard key={product._id} product={product} handeledit={()=>{handelEdit(product)}}  handelSold={()=>{handelSold(product._id)}} />
        
      ))}
    </div>
    </>
  );
};

export default UserProduct;