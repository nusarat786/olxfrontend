import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/ChatHistoryCard.module.css';

const ChatHistoryCard = ({ chat }) => {
  const navigate = useNavigate();

  // Determine the user you're chatting with
  const otherUser = chat.isSender ? chat.receiver : chat.sender;
 
  const sellerId = chat.product.seller;
  const buyerId = chat.sender._id===sellerId ? chat.receiver._id : chat.sender._id;
  const handleClick = () => {
    navigate(`/chat/${chat.product._id}_${buyerId}_${sellerId}`);
  };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={styles.imageContainer}>

        <img
          src={chat.product.images[0]}
          alt={chat.product.title}
          className={styles.productImage}
        />
        <img
          src={otherUser.profilePicture}
          alt={otherUser.firstName}
          className={styles.profileImage}
        />
      </div>
      <div className={styles.detailsContainer}>
        <h4 className={styles.userName}>
          {otherUser.firstName} {otherUser.lastName}
        </h4>
        <p className={styles.productName}>{chat.product.title} </p>
        <p className={styles.lastMessage}>{chat.message}</p>
        <p className={styles.lastMessage } style={{color:'var(--gc1)',fontSize:'0.8rem'}}>
          {new Date(chat?.timestamp).toLocaleString()} &nbsp; 
          {chat?.isSender ? 
          <i class="fa-solid fa-arrow-up" style={{color:'var(--gc2)',fontWeight:'bold'}}></i>
          : 
          <i class="fa-solid fa-arrow-down" style={{color:'var(--gc2)',fontWeight:'bold'}}></i>
          }
        </p>
        
        {chat.isSeller 
        ?<h2 className="font-h1 size-2 mb-4 mt-1" style={{fontSize:'1.3rem'}}> BUY</h2>
        :<h2 className="font-h1 size-2 mb-4 mt-1" style={{fontSize:'1.3rem'}}> SELL</h2>
  }
      </div>

    </div>
  );
};

export default ChatHistoryCard;