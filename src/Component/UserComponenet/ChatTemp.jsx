import React from 'react';
import './Chat.css'; // Import your custom CSS

const chatData = {
  product: {
    name: "Samsung Fold 4 512GB",
    price: "¥ 47,500",
    image: "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803626/products/qdhxj752izbtmyukscf9.jpg"
  },
  seller: {
    name: "Nusarat Haveliwala",
    profilePicture: "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741622645/user_profiles/15d477f5-640c-4510-9df4-18a8e1a30aa5-1741622642000-143750876.jpg"
  },
  messages: [
    { id: 1, sender: 'buyer', text: 'hello' },
    { id: 2, sender: 'seller', text: 'Hi, how can I help you?' },
    { id: 3, sender: 'buyer', text: 'is it available?' },
    { id: 4, sender: 'seller', text: 'Yes, it is available.' },
    { id: 5, sender: 'buyer', text: 'okay' },
    { id: 6, sender: 'buyer', text: 'no problem' },
    { id: 7, sender: 'buyer', text: 'please reply' },
    { id: 8, sender: 'seller', text: 'Sure, let me know if you have any questions.' },
    { id: 9, sender: 'buyer', text: 'not interested' }
  ]
};

const ChatComponent = () => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button">&larr;</button>
        <img src={chatData.product.image} alt="Product" className="product-image" />
        <div className="header-info">
          <h5>{chatData.product.name}</h5>
          <p>{chatData.product.price}</p>
          <div className="seller-info">
            <img src={chatData.seller.profilePicture} alt="Seller" className="seller-image" />
            <span>{chatData.seller.name}</span>
          </div>
        </div>
        <div className="chat-time">
          <span>TODAY</span>
          <span>23:05</span>
        </div>
      </div>
      <div className="chat-body">
        {chatData.messages.map(message => (
          <div key={message.id} className={`chat-message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;