import React, { use, useEffect, useState } from 'react';
import ChatHistoryCard from './ChatHistoryCard';
import styles from './css/ChatHistoryList.module.css';
import LoadingSpinner from '../Helper/loadingSpinner';
import ToastmMessage from '../Helper/ToastmMessage';
import { fetchFromApi } from '../Helper/functions';

let chats2 = [
  
    {
      _id: "67d5ab81096632902ae32675",
      message: "1500",
      status: "sent",
      timestamp: "2025-03-15T16:32:01.717Z",
      product: {
        _id: "67d1d06b696fd4a9e28a175b",
        title: "Vivo 19 Ok",
        description: "Quite Good Quality",
        price: 2500,
        mainCategory: "67d1cefa696fd4a9e28a16c4",
        subCategory: "67d1cf43696fd4a9e28a16c7",
        images: [
          "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803626/products/qdhxj752izbtmyukscf9.jpg",
          "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803627/products/gzuqzseoyksqem0osazi.jpg",
          "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803625/products/h6pits24zq5js2gkrkxy.jpg"
        ],
        geoLocation: {
          type: "Point",
          coordinates: [
            73.22396,
            22.301
          ]
        },
        location: "6797b3eb3fb3b9675889c329",
        condition: "new",
        seller: "67cf0d7529391b9d8c9d6821",
        status: "active",
        viewCount: 0,
        likedBy: [],
        publishedAt: "2025-03-12T18:10:38.194Z",
        dynamicFields: {},
        createdAt: "2025-03-12T18:20:27.296Z",
        updatedAt: "2025-03-12T18:20:27.296Z",
        __v: 0
      },
      sender: {
        _id: "67cf0d7529391b9d8c9d6821",
        firstName: "Nusarat",
        lastName: "Haveliwala",
        email: "nusrathaveliwala2@gmail.com",
        password: "$2a$10$XLIRXn225FKTs6.YxBUPWOYrktqbdHGpghUct6l0GNJlUCvWEziIi",
        phone: "9586213286",
        phoneCode: "91",
        profilePicture: "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741622645/user_profiles/15d477f5-640c-4510-9df4-18a8e1a30aa5-1741622642000-143750876.jpg",
        userType: "user",
        city: null,
        region: null,
        country: null,
        zip: null,
        isPhoneVerified: false,
        isEmailVerified: false,
        authorization: {
          jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2YwZDc1MjkzOTFiOWQ4YzlkNjgyMSIsImVtYWlsIjoibnVzcmF0aGF2ZWxpd2FsYTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaXBBZHJlc3MiOiI6OjEiLCJpYXQiOjE3NDIwMzYxNzAsImV4cCI6MTc0NDYyODE3MH0.fqpLpEsHEftJe-saFrshA16i6eakZZ6U8TXhJXqN834",
          refreshToken: null,
          loginDate: "2025-03-15T10:56:10.180Z",
          logoutDate: null,
          isBlocked: false,
          otp: null,
          otpExpiryTime: null
        },
        forgotPassword: {
          otp: null,
          otpGeneratedTime: null,
          otpExpiryTime: null
        },
        totalProducts: 0,
        premium: {
          premiumStartDate: null,
          premiumExpiryTime: null,
          transactionId: null
        },
        createdAt: "2025-03-10T16:04:05.765Z",
        updatedAt: "2025-03-15T10:56:10.181Z",
        __v: 0
      },
      receiver: {
        _id: "67a2650428a81740c1ec0b2e",
        firstName: "Nusarat",
        lastName: "Haveliwala",
        email: "nusrathaveliwala@gmail.com",
        password: "$2a$10$uf4uraQp.75v5W08/eheFOh3LDKujDHMq1J7rA.LtL2jazI7b5GUy",
        phone: "9586213283",
        phoneCode: "91",
        profilePicture: "https://res.cloudinary.com/dddq4dxfd/image/upload/v1738695940/user_profiles/c950cd75-051b-4fe6-86ea-882b7b0cafe5-1738695937162-918154162.jpg",
        userType: "user",
        city: null,
        region: null,
        country: null,
        zip: null,
        isPhoneVerified: false,
        isEmailVerified: false,
        authorization: {
          jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTI2NTA0MjhhODE3NDBjMWVjMGIyZSIsImVtYWlsIjoibnVzcmF0aGF2ZWxpd2FsYUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6InVzZXIiLCJpcEFkcmVzcyI6Ijo6MSIsImlhdCI6MTc0MTk3MTQzNCwiZXhwIjoxNzQ0NTYzNDM0fQ.JNGtGQoGJZDpJ7xQNCRR-QmSulLGImS44Ty5S8eEVgA",
          refreshToken: null,
          loginDate: "2025-03-14T16:57:14.464Z",
          logoutDate: null,
          isBlocked: false,
          otp: null,
          otpExpiryTime: null
        },
        forgotPassword: {
          otp: null,
          otpGeneratedTime: null,
          otpExpiryTime: null
        },
        createdAt: "2025-02-04T19:05:40.536Z",
        updatedAt: "2025-03-14T16:57:14.464Z",
        __v: 0,
        totalProducts: 0
      },
      isSender: false,
      isSeller: false
    }
  ,
  {
    _id: "67d5ab81096632902ae32675",
    message: "1500",
    status: "sent",
    timestamp: "2025-03-15T16:32:01.717Z",
    product: {
      _id: "67d1d06b696fd4a9e28a175b",
      title: "Vivo 19 Ok",
      description: "Quite Good Quality",
      price: 2500,
      mainCategory: "67d1cefa696fd4a9e28a16c4",
      subCategory: "67d1cf43696fd4a9e28a16c7",
      images: [
        "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803626/products/qdhxj752izbtmyukscf9.jpg",
        "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803627/products/gzuqzseoyksqem0osazi.jpg",
        "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741803625/products/h6pits24zq5js2gkrkxy.jpg"
      ],
      geoLocation: {
        type: "Point",
        coordinates: [
          73.22396,
          22.301
        ]
      },
      location: "6797b3eb3fb3b9675889c329",
      condition: "new",
      seller: "67cf0d7529391b9d8c9d6821",
      status: "active",
      viewCount: 0,
      likedBy: [],
      publishedAt: "2025-03-12T18:10:38.194Z",
      dynamicFields: {},
      createdAt: "2025-03-12T18:20:27.296Z",
      updatedAt: "2025-03-12T18:20:27.296Z",
      __v: 0
    },
    sender: {
      _id: "67cf0d7529391b9d8c9d6821",
      firstName: "Nusarat",
      lastName: "Haveliwala",
      email: "nusrathaveliwala2@gmail.com",
      password: "$2a$10$XLIRXn225FKTs6.YxBUPWOYrktqbdHGpghUct6l0GNJlUCvWEziIi",
      phone: "9586213286",
      phoneCode: "91",
      profilePicture: "https://res.cloudinary.com/dddq4dxfd/image/upload/v1741622645/user_profiles/15d477f5-640c-4510-9df4-18a8e1a30aa5-1741622642000-143750876.jpg",
      userType: "user",
      city: null,
      region: null,
      country: null,
      zip: null,
      isPhoneVerified: false,
      isEmailVerified: false,
      authorization: {
        jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2YwZDc1MjkzOTFiOWQ4YzlkNjgyMSIsImVtYWlsIjoibnVzcmF0aGF2ZWxpd2FsYTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaXBBZHJlc3MiOiI6OjEiLCJpYXQiOjE3NDIwMzYxNzAsImV4cCI6MTc0NDYyODE3MH0.fqpLpEsHEftJe-saFrshA16i6eakZZ6U8TXhJXqN834",
        refreshToken: null,
        loginDate: "2025-03-15T10:56:10.180Z",
        logoutDate: null,
        isBlocked: false,
        otp: null,
        otpExpiryTime: null
      },
      forgotPassword: {
        otp: null,
        otpGeneratedTime: null,
        otpExpiryTime: null
      },
      totalProducts: 0,
      premium: {
        premiumStartDate: null,
        premiumExpiryTime: null,
        transactionId: null
      },
      createdAt: "2025-03-10T16:04:05.765Z",
      updatedAt: "2025-03-15T10:56:10.181Z",
      __v: 0
    },
    receiver: {
      _id: "67a2650428a81740c1ec0b2e",
      firstName: "Nusarat",
      lastName: "Haveliwala",
      email: "nusrathaveliwala@gmail.com",
      password: "$2a$10$uf4uraQp.75v5W08/eheFOh3LDKujDHMq1J7rA.LtL2jazI7b5GUy",
      phone: "9586213283",
      phoneCode: "91",
      profilePicture: "https://res.cloudinary.com/dddq4dxfd/image/upload/v1738695940/user_profiles/c950cd75-051b-4fe6-86ea-882b7b0cafe5-1738695937162-918154162.jpg",
      userType: "user",
      city: null,
      region: null,
      country: null,
      zip: null,
      isPhoneVerified: false,
      isEmailVerified: false,
      authorization: {
        jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTI2NTA0MjhhODE3NDBjMWVjMGIyZSIsImVtYWlsIjoibnVzcmF0aGF2ZWxpd2FsYUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6InVzZXIiLCJpcEFkcmVzcyI6Ijo6MSIsImlhdCI6MTc0MTk3MTQzNCwiZXhwIjoxNzQ0NTYzNDM0fQ.JNGtGQoGJZDpJ7xQNCRR-QmSulLGImS44Ty5S8eEVgA",
        refreshToken: null,
        loginDate: "2025-03-14T16:57:14.464Z",
        logoutDate: null,
        isBlocked: false,
        otp: null,
        otpExpiryTime: null
      },
      forgotPassword: {
        otp: null,
        otpGeneratedTime: null,
        otpExpiryTime: null
      },
      createdAt: "2025-02-04T19:05:40.536Z",
      updatedAt: "2025-03-14T16:57:14.464Z",
      __v: 0,
      totalProducts: 0
    },
    isSender: false,
    isSeller: false
  }


]


const ChatHistoryList = () => {

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastObject, setToastObject] = useState({
    show: false,
    message: '',
  });

  useEffect(() => {
    fetchFromApi(
      {},
      '/user/chat/getUserChat',
      'chats',
      setChats,
      setLoading,
      setToastObject
    );
  }, []);

  return (
    <>
    <LoadingSpinner loading={loading} />
    {toastObject.show &&
                <ToastmMessage message={toastObject.message} show={toastObject.show} onClose={() => setToastObject({ message: '', show: false })} />
            }

    <div className={styles.listContainer}>
      
      <h2 className={'font-h1 size-2 mb-4'}>Conversations</h2>
      {chats.map((chat) => (
        <ChatHistoryCard key={chat._id} chat={chat}  />
      ))}
    </div>
    </>
  );
};

export default ChatHistoryList;