import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/ChatHistoryCard.module.css';

const UserProductCard = ({ product ,handelSold,handeledit}) => {



  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handelEdit = () => {
    //navigate(`/editProduct/${product._id}`);
    handeledit(product)
  }

  return (
    <div className={styles.cardContainer} >
      <div className={styles.imageContainer}>
        <img
          src={product.images[0]}
          alt={product.title}
          className={styles.productImage}
          onClick={handleClick}
        />
      </div>
      <div className={styles.detailsContainer}>
        <h4 className={styles.userName}>
          {/* {otherUser.firstName} {otherUser.lastName} */}
        </h4>
        <p className={styles.productName}>{product.title}</p>
        <p className={styles.lastMessage}>₹ {product.price}</p>
        <p className={styles.productName} >
            <i class='fa-solid fa-heart' style={{color:"var(--gc2)"}}></i> {product?.likedBy?.length || 0}
        </p>
        <p className={styles.productName} >
            <i class='fa-solid fa-eye' style={{color:"var(--gc2)"}}></i> {product?.viewCount || 0}
        </p>

        <p className={styles.productName} >
            <i class='fa-solid fa-signal' style={{color:"var(--gc2)"}}></i> {product?.status }
        </p>
        <p className={styles.productName} >
            <i class='fa-solid fa-upload' style={{color:"var(--gc2)" ,fontSize:'0.8rem'}}></i> 
            &nbsp;
            <b style={{ fontSize:'0.8rem'}}>
              {new Date(product.publishedAt).toLocaleString()}
            </b>
        </p>



      
      </div>
      <div className={styles.imageContainer}>

        {product?.status !== 'sold' &&
        <button style={{border:"none",backgroundColor:"transparent"}} onClick={handelSold}>
        <i class="fa-solid fa-trash font-logo background-color-logo p-2 rounded-circle" style={{fontSize:'1.3rem'}}></i>
        </button>
        }
        {product?.status === 'active' &&
        <button style={{border:"none",backgroundColor:"transparent"}} onClick={handelEdit}>
        <i class="fa-solid fa-pen-to-square font-logo background-color-logo p-2 rounded-circle" style={{fontSize:'1.3rem'}}></i>
        </button>
        }
      </div>
    </div>
  );
};

export default UserProductCard;