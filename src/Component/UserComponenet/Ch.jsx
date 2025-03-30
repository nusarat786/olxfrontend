import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import LoadingSpinner from '../Helper/loadingSpinner';
import axios from 'axios';
import ToastmMessage from '../Helper/ToastmMessage';
import { useParams } from 'react-router-dom';
import { fetchFromApi } from '../Helper/functions';
import { set } from 'react-hook-form';

const ChatComponent2 = () => {
  const { idS } = useParams();
  const idA = idS.split("_");
  const productId = idA[0];
  const buyerId = idA[1];
  const sellerId = idA[2];
  const senderId = JSON.parse(localStorage.getItem("id")).value;
  const receiverId = senderId === buyerId ? sellerId : buyerId;
  const socketUrl = process.env.REACT_APP_API_URL;

  const [loading, setLoading] = useState(true);
  const [toastObject, setToastObject] = useState({
    message: '',
    show: false,
  });
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [product, setProduct] = useState(null);
  const [reciver,setReciver] = useState(null);
  const endPoint = "/user/product/getProductById";

  const chatBodyRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    const newSocket = io(socketUrl);
    setSocket(newSocket);

    newSocket.emit('joinProductRoom', idS);
    //console.log('Joined product room:', idS);

    const fetchProductDetails = async () => {
      const token = JSON.parse(localStorage.getItem("token")).value;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}${endPoint}`,
          { id: productId },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setProduct(response.data.data['product']);
        //console.log('Product details fetched:', response.data.data['product']);
      } catch (error) {
        //console.error("Error fetching product:", error);
        setToastObject({
          message: error?.response?.data?.message || 'An error occurred',
          show: true,
        });
        setLoading(false);
      }
    };

    const fetchChatHistory = async () => {
      setLoading(true);
      newSocket.emit(
        'getChatHistory',
        {
          productId: productId,
          senderId: senderId,
          receiverId: receiverId,
        },
        (response) => {
          if (response.status === 'success') {
            setChatHistory(response.data);
            //console.log('Chat history fetched:', response.data);
          } else {
            //console.error('Error fetching chat history:', response.message);
            setToastObject({
              message: response.message,
              show: true,
            });
          }
        }
      );
    };

    fetchProductDetails();
    fetchChatHistory();
    fetchFromApi(
      { userId: receiverId },
      "/userRoutes/getUserById",
      "user",
      setReciver,
      setLoading,
      setToastObject

    )

    newSocket.on('receiveMessage', (message) => {
      //console.log('Received new message:', message);
      setChatHistory((prev) => [...prev, message]);
    });

    setLoading(false);

    return () => {
      newSocket.disconnect();
      console.log('Socket disconnected');
    };
  }, [productId, senderId, receiverId]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      const newMessage = {
        productId: productId,
        senderId: senderId,
        receiverId: receiverId,
        message: message,
        status: 'sent',
        timestamp: new Date().toISOString(),
        sender: {
          _id: senderId,
        }
      };

      //console.log('Sending message:', newMessage);
      setChatHistory((prev) => [...prev, newMessage]);
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  return (
    <>
      <LoadingSpinner isSubmitting={loading} />
      {toastObject.show &&
        <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
      }

      {!loading && (
        <div style={{
          backgroundColor: 'var(--background-color-main)',
          borderRadius: '8px',
          boxShadow: 'var(--box-shadow)',
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-primary)',
          padding: '20px',
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'var(--gradient-1l)',
            color: 'white',
            padding: '10px',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <button 
            
            onClick={() => window.history.back()}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.6rem',
              cursor: 'pointer',
              marginRight: '2rem',
              marginLeft:'1rem',
              
            }}>
            
            <i class="fa-solid fa-arrow-left"></i>            
            </button> 
            
            <img src={product?.images[0] || 'https://via.placeholder.com/150'} alt="Product" style={{
              width: '100px',
              height: '100px',
              borderRadius: '8px',
              marginRight: '10px',
              objectFit: 'cover',
          
            }} />
            <div style={{ flex: 1 }}>
              <h5 style={{ margin: 0 }}>{product?.title || 'Product Name'}</h5>
              <p style={{ margin: 0, fontSize: '0.9em' }}>{product?.price || 'Product Price'}</p>
              {reciver &&
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                <img src={reciver?.profilePicture || 'https://via.placeholder.com/150'} alt="Seller" style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  marginRight: '10px',
                  objectFit: 'cover',
                }} />
                <span  >{`${reciver?.firstName} ${reciver?.lastName}`  || 'Seller Name'}</span>
              </div>
              }
            </div>
            {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.9em' }}>
              <span>TODAY</span>
              <span>23:05</span>
            </div> */}
          </div>

          {/* Chat Body */}
          <div ref={chatBodyRef} style={{
            flex: 1,
            padding: '10px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                style={{
                  maxWidth: '90%',
                  margin: '5px 0',
                  padding: '8px',
                  borderRadius: '4px',
                  alignSelf: chat.sender._id === senderId ? 'flex-start' : 'flex-end',
                  background: chat.sender._id === senderId ? 'var(--gradient-1l)' : 'var(--gradient-2l)',
                  color: 'white',
                }}
              >
                <p style={{overflow:'hidden'}} title={chat.message}>{chat.message}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '12px', color: 'white' }}>
                  <span style={{ fontStyle: 'italic' }}>{chat.sender._id === senderId ? 'sent' : 'received'}</span>
                  <span style={{ marginLeft: '10px' }}>{new Date(chat.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Footer */}
          <div style={{
            display: 'flex',
            padding: '10px',
            borderTop: '1px solid var(--border-color)',
            position: 'sticky',
            bottom: 0,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              borderRadius: '25px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              width: '100%',
            }}>
              <textarea
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                rows={1}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  padding: '10px',
                  borderRadius: '25px',
                  resize: 'none',
                  overflowY: 'auto', // Add scrollbar
                  maxHeight: '120px',
                  width: '100%',
                  background : 'var(--gray-color)',  
                  fontFamily: 'var(--font-dosis)',    
                  fontWeight:'600',
                  fontSize:'1.2rem', 
                  letterSpacing:'0.7px',
                   

                }}
              />
              <button onClick={sendMessage} style={{
                backgroundColor: 'var(--gc2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                flexShrink: 0,
                color: 'white',
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="currentColor"
                    d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent2;

// import React, { useEffect, useState, useRef } from 'react';
// import { io } from 'socket.io-client';
// import './Chat.css'; // Import your custom CSS
// import LoadingSpinner from '../Helper/loadingSpinner';
// import axios from 'axios';
// import ToastmMessage from '../Helper/ToastmMessage';
// import { useParams } from 'react-router-dom';
// import { set } from 'react-hook-form';

// const ChatComponent2 = () => {
//   const { idS } = useParams();
//   const idA = idS.split("_");
//   const productId = idA[0];
//   const buyerId = idA[1];
//   const sellerId = idA[2];
//   const senderId = JSON.parse(localStorage.getItem("id")).value;
//   const receiverId = senderId === buyerId ? sellerId : buyerId;
//   const socketUrl = process.env.REACT_APP_API_URL

//   const [loading, setLoading] = useState(true);
//   const [toastObject, setToastObject] = useState({
//     message: '',
//     show: false,
//   });
//   const [socket, setSocket] = useState(null);
//   const [message, setMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [product, setProduct] = useState(null);
//   const endPoint = "/user/product/getProductById";

//   const chatBodyRef = useRef(null);

//   // Fetch product details and chat history on component mount
//   useEffect(() => {
//     setLoading(true);

//     const newSocket = io(socketUrl);
//     setSocket(newSocket);

//     // Join the product room
//     newSocket.emit('joinProductRoom', idS);
//     console.log('Joined product room:', idS);

//     // Fetch product details
//     const fetchProductDetails = async () => {
//       const token = JSON.parse(localStorage.getItem("token")).value;
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_API_URL}${endPoint}`,
//           { id: productId },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             }
//           }
//         );
//         setProduct(response.data.data['product']);
//         console.log('Product details fetched:', response.data.data['product']);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         setToastObject({
//           message: error?.response?.data?.message || 'An error occurred',
//           show: true,
//         });
//         setLoading(false);

//       } finally {
//       }
//     };

//     // Fetch chat history
//     const fetchChatHistory = async () => {
//       setLoading(true);
//       newSocket.emit(
//         'getChatHistory',
//         {
//           productId: productId,
//           senderId: senderId,
//           receiverId: receiverId,
//         },
//         (response) => {
//           if (response.status === 'success') {
//             setChatHistory(response.data);
//             console.log('Chat history fetched:', response.data);
//           } else {
//             console.error('Error fetching chat history:', response.message);
//             setToastObject({
//               message: response.message,
//               show: true,
//             });
//           }
//         }
//       );
//     };

//     fetchProductDetails();
//     fetchChatHistory();

//     // Listen for new messages
//     newSocket.on('receiveMessage', (message) => {
//       console.log('Received new message:', message);
//       setChatHistory((prev) => [...prev, message]);
//     });

//     setLoading(false);

//     // Cleanup on unmount
//     return () => {
//       newSocket.disconnect();
//       console.log('Socket disconnected');
//     };

    
//   }, [productId, senderId, receiverId]);

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     if (chatBodyRef.current) {
//       chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   useEffect(() => {
//     const textarea = document.querySelector('textarea');
//     if (textarea) {
//       textarea.style.height = 'auto'; // Reset height
//       textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
//     }
//   }, [message]); // Trigger when the message changes

//   // Send a message
//   const sendMessage = () => {
//     if (socket && message.trim()) {
//       const newMessage = {
//         productId: productId,
//         senderId: senderId,
//         receiverId: receiverId,
//         message: message,
//         status: 'sent',
//         timestamp: new Date().toISOString(),
//         sender: {
//           _id: senderId,
//         }
//       };

//       console.log('Sending message:', newMessage);

//       // Add the message to the chat history immediately (for the sender)
//       setChatHistory((prev) => [...prev, newMessage]);

//       // Emit the message to the server
//       socket.emit('sendMessage', newMessage);

//       // Clear the input field
//       setMessage('');
//     }
//   };

//   return (
//     <>

//     <style> 
      
      
      
//     </style>
//       <LoadingSpinner isSubmitting={loading} />
//       {toastObject.show &&
//         <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
//       }

//       {loading
//       && <LoadingSpinner isSubmitting={loading} />
//       }

//       {!loading && <div className="chat-container">
//         {/* Chat Header */}
//         <div className="chat-header">
//           <button className="back-button">&larr;</button>
//           <img src={product?.image || 'https://via.placeholder.com/150'} alt="Product" className="product-image" />
//           <div className="header-info">
//             <h5>{product?.name || 'Product Name'}</h5>
//             <p>{product?.price || 'Product Price'}</p>
//             <div className="seller-info">
//               <img src={product?.seller?.profilePicture || 'https://via.placeholder.com/150'} alt="Seller" className="seller-image" />
//               <span>{product?.seller?.name || 'Seller Name'}</span>
//             </div>
//           </div>
//           <div className="chat-time">
//             <span>TODAY</span>
//             <span>23:05</span>
//           </div>
//         </div>

//         {/* Chat Body */}
//         <div className="chat-body" ref={chatBodyRef}>
//           {chatHistory.map((chat, index) => (
//             <div
//               key={index}
//               className={`chat-message ${chat.sender._id === senderId ? 'left' : 'right'}`}
//             >
//               <p>{chat.message}</p>
//               <div className="message-info">
//                 <span className="message-status">{chat.sender._id===senderId? 'sent' :'recived'}</span>
//                 <span className="message-timestamp">
//                   {new Date(chat.timestamp).toLocaleString()}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Chat Footer */}
//         <div className="chat-footer">
//   <div className="input-container">
//     <textarea
//       placeholder="Type a message..."
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//       onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()} // Send message on Enter (without Shift)
//       rows={1} // Start with one row
//       style={{ resize: 'none' }} // Disable manual resizing
//     />
//     <button onClick={sendMessage}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         width="24"
//         height="24"
//       >
//         <path
//           fill="currentColor"
//           d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
//         />
//       </svg>
//     </button>
//   </div>
// </div>

    
       


//       </div>
//       }
//     </>
//   );
// };

// export default ChatComponent2;


// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import './Chat.css'; // Import your custom CSS
// import { fetchFromApi } from '../Helper/functions';
// import LoadingSpinner from '../Helper/loadingSpinner';
// import axios from 'axios';
// import ToastmMessage from '../Helper/ToastmMessage';
// import { useParams } from 'react-router-dom';

// const ChatComponent2 = () => {

//   const {idS} = useParams();
//   const idA = idS.split("_");
//   const productId = idA[0];
//   const buyerId = idA[1];
//   const sellerId = idA[2];
//   const senderId = JSON.parse(localStorage.getItem("id")).value;

//   let receiverId;

//   if(senderId === buyerId){
//     receiverId = sellerId;
//   }else{
//     receiverId = buyerId;
//   }


//   const [loading, setLoading] = useState(true);
//   const [toastObject, setToastObject] = useState({
//     message: '',
//     show: false,
//   });
//   const [socket, setSocket] = useState(null);
//   const [message, setMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [currentUserId, setCurrentUserId] = useState('67a2650428a81740c1ec0b2e'); // Replace with the actual current user ID
//   const [product, setProduct] = useState(null);
//   const endPoint = "/user/product/getProductById";
  
//   // Mock data for product and seller
//   const chatData = {
//     product: {
//       name: 'Samsung Fold 4 512GB',
//       price: '¥ 47,500',
//       image: 'https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803626/products/qdhxj752izbtmyukscf9.jpg',
//     },
//     seller: {
//       name: 'Nusarat Haveliwala',
//       profilePicture:
//         'https://res.cloudinary.com/dddq4dxfd/image/upload/v1741622645/user_profiles/15d477f5-640c-4510-9df4-18a8e1a30aa5-1741622642000-143750876.jpg',
//     },
//   };

//   // Socket.IO connection
//   useEffect(() => {
//     const newSocket = io('http://localhost:4002');
//     setSocket(newSocket);

//     // Join a product room
//     newSocket.emit('joinProductRoom', '64f1b1b1b1b1b1b1b1b1b1b1');

//     // Fetch chat history on connection
//     const fetchChatHistory = async () => {

         
//       setLoading(true);
//       const mainLocation = JSON.parse(localStorage.getItem("mainLocation"));
//       console.log(mainLocation);
//       const token = JSON.parse(localStorage.getItem("token")).value
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_API_URL}${endPoint}`,
//           {id:productId},
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             }
//           }
//         );
//         console.log(response.data.data['product']);
//         setProduct(response.data.data['product']); // Update options with API response
//         setToastObject({
//           message: response?.data?.message,
//           show: true,
//         });
//       } catch (error) {
//         console.error("Error fetching locations:", error);
    
//         setToastObject({
//           message: error?.response?.data?.message || 'An error occurred',
//           show: true,
//         });
    
//       } finally {
//         setLoading(false);
//       }

      

//       newSocket.emit(
//         'getChatHistory',
//         {
//           productId: productId,
//           senderId: senderId,
//           receiverId: receiverId,
//         },
//         (response) => {
//           if (response.status === 'success') {
//             //console.log(response.data);
//             setChatHistory(response.data);
//           } else {
//             console.error('Error:', response.message);
//           }
//         }
//       );
//     };

//     // Fetch chat history on initial connection
//     fetchChatHistory();

//     // Listen for new messages
//     newSocket.on('receiveMessage', (message) => {
//       setChatHistory((prev) => [...prev, message]);
//     });

//     // Cleanup on unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   // Send a message
//   const sendMessage = () => {
//     if (socket && message.trim()) {
//       const newMessage = {
//         productId: productId,
//         senderId: senderId, // Use the current user's ID
//         receiverId: receiverId,
//         message: message,
//         status: 'sent', // Initial status
//         timestamp: new Date().toISOString(), // Add timestamp
//         sent: true, // Add a flag to identify sent messages
//         sender: {
//           _id: senderId,
//         }
//       };


//       // Add the message to the chat history immediately

//       // Emit the message to the server
//       socket.emit('sendMessage', newMessage);
//       newMessage.senderId = "abc";
//       setChatHistory((prev) => [...prev, newMessage]);


//       // Clear the input field
//       setMessage('');
//     }
//   };

//   return (
//     <>
//     <LoadingSpinner isSubmitting={loading} />
//     {toastObject.show &&
//         <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
//       }
//     <div className="chat-container">
//       {/* Chat Header */}
//       <div className="chat-header">
//         <button className="back-button">&larr;</button>
//         <img src={chatData.product.image} alt="Product" className="product-image" />
//         <div className="header-info">
//           <h5>{chatData.product.name}</h5>
//           <p>{chatData.product.price}</p>
//           <div className="seller-info">
//             <img src={chatData.seller.profilePicture} alt="Seller" className="seller-image" />
//             <span>{chatData.seller.name}</span>
//           </div>
//         </div>
//         <div className="chat-time">
//           <span>TODAY</span>
//           <span>23:05</span>
//         </div>
//       </div>

//       {/* Chat Body */}
//       <div className="chat-body">
//         {chatHistory.map((chat, index) => (
//           <div
//             key={index}
//             className={`chat-message ${
//               chat.sender._id === senderId  ? 'left' : 'right'
//             }`}>
//             {console.log(chat)}
//             {console.log(chat.sender._id,senderId,chat.senderId === senderId)}
//             {/* {console.log(chat.senderId,currentUserId,chat.senderId === currentUserId)} */}
//             <p>{chat.message}</p>
//             <div className="message-info">
//               <span className="message-status">{chat.status}</span>
//               <span className="message-timestamp">
//                 {new Date(chat.timestamp).toLocaleString()}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Footer */}
//       <div className="chat-footer">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ChatComponent2;





















// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const ChatComponent2 = () => {
//   const [socket, setSocket] = useState(null);
//   const [message, setMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);

//   // Socket.IO connection
//   useEffect(() => {



//     const newSocket = io('http://localhost:4002');
//     setSocket(newSocket);

//     // Join a product room
//     newSocket.emit('joinProductRoom', '67d1d06b696fd4a9e28a175b');

//     // Fetch chat history on connection
//     const fetchChatHistory = () => {
//       newSocket.emit(
//         'getChatHistory',
//         {
//           productId: '67d1d06b696fd4a9e28a175b',
//           senderId: '67a2650428a81740c1ec0b2e',
//           receiverId: "67cf0d7529391b9d8c9d6821",
//         },
//         (response) => {
//           if (response.status === 'success') {
//             setChatHistory(response.data);
//           } else {
//             console.error('Error:', response.message);
//           }
//         }
//       );
//     };

//     // Fetch chat history on initial connection
//     fetchChatHistory();

//     // Listen for new messages
//     newSocket.on('receiveMessage', (message) => {
//       setChatHistory((prev) => [...prev, message]);
//     });

//     // Cleanup on unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   // Send a message
//   const sendMessage = () => {
//     if (socket && message.trim()) {
//       socket.emit('sendMessage', {
//         productId: '67d1d06b696fd4a9e28a175b',
//         senderId: '67a2650428a81740c1ec0b2e',
//         receiverId: "67cf0d7529391b9d8c9d6821",
//         message: message,
//       });
//       setMessage(''); // Clear input
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Product Chat</h1>
//       <div className="card">
//         <div className="card-body">
//           <div className="chat-history mb-3">
//             {chatHistory.map((chat, index) => (
//               <div key={index} className="mb-2">
//                 <strong>{chat.sender.firstName}:</strong> {chat.message}
//               </div>
//             ))}
//           </div>
//           <div className="input-group">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Type a message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button className="btn btn-primary" onClick={sendMessage}>
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent2;