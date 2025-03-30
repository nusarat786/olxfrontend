import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/ChatHistoryCard.module.css';

const CategoryCard = ({ category,onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => { 
    onClick(category);
  }

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={styles.imageContainer}>
        {/* <img
          className={styles.profileImage}
        /> */}
        <img
          className={styles.productImage}
          alt='product'
          src='https://img.icons8.com/ios/100/product--v1.png'
        />
      </div>
      <div className={styles.detailsContainer}>
        <h4 className={styles.userName}>
            {category.name}
        </h4>
        <p className={styles.productName}>{category?.description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;