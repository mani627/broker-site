import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLoading } from './loadingContext';
import Subscription from '@/pages/dashboard/Subscription';

import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import api from '@/api/BaseURL';
import { signInAPI, signUpAPI } from '@/api/authAPI';
import LoadingPopup from '@/components/LoadingButton';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {

  const [userInfo, setUserInfo] = useState({
    auth: null,
    subscription: true,
    roll: "", // admin or seller
    data: null,
    verified:false
  });

  const [pageHeading, setpageHeading] = useState({
    title: 'Pages',
    backURL: null
  });

  const { isLoading, setLoading, loadingText, setLoadingText, } = useLoading()
  const isValidToken = (token) => {
    try {
      // Decode the token
      const decoded = jwtDecode(token);

      // Check if the token has an expiration time
      if (!decoded.exp) {
        console.error('Token does not have an expiration time.');
        return false;
      }

      // Check if the token is expired
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decoded.exp < currentTime) {
        console.error('Token is expired.');
        return false;
      }

      return true; // Token is valid
    } catch (error) {
      console.error('Invalid token:', error.message);
      return false;
    }
  };
  const navigate = useNavigate()



  // UseEffect
  useEffect(() => {


    if (localStorage.getItem("token")) {
      // fetch user Infomation then set Auth True

      const valid = isValidToken(localStorage.getItem("token"))
      if (valid) {
        const decodeValue = jwtDecode(localStorage.getItem("token"))
        setUserInfo({ ...userInfo, auth: true, subscription: true, roll: decodeValue.role, data: { id: decodeValue.id, phoneNumber: decodeValue.phoneNumber } })
      } else {
        setUserInfo({ ...userInfo, auth: false })
        localStorage.removeItem("token")
      }
    }
    else {
      setUserInfo({ ...userInfo, auth: false })
    }
    return () => {

    };
  }, []);


  const login = async ({ phoneNumber, password }) => {

    if (!phoneNumber || !password) {
      toast.error('All fields are required')
      return null
    }

    setLoading(true);
    await signInAPI({ phoneNumber, password }).then((res) => {
      setUserInfo({ ...userInfo, auth: true, subscription: true, roll: res?.data?.seller?.roll || 'user', data: res?.data?.seller || null })
      setLoading(false)
      navigate('/dashboard/home')
    })
      .catch(error => {
        const errorMessage = error?.response?.data?.message || "Invalid credentials"
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false)
        setUserInfo({ ...userInfo, auth: false })
      })

    // Login Funtionality
  }

  const logOut = async () => {
    // Logout Funtionality
    setLoading(true)

    localStorage.removeItem("token")
    setLoading(false)
    navigate('/auth/sign-in')
    setUserInfo({
      auth: false,
      subscription: null,
      roll: "", // admin or seller
      data: null,
      verified:true
    })


  }

  const signUp = async ({name,companyName,phoneNumber,emailId,password,accessToken,domainName}) => {

    setLoading(true)
    const data ={
      sellerName:name,
      companyName,
      phoneNumber :"+91"+phoneNumber,
      email:emailId,
      password,
      shipmentPerMonth: "100",
      shopifyAccessToken:accessToken,
      shopifyDomainURL:domainName,
      role: "user",
      pickupDate: 3,
      pickupTime: "07:00:00",
      pickupPackageCount: 10
    }
return await new Promise(async(resolve, reject) =>{
  await signUpAPI(data).then(res=>{
   
    resolve(res)
    setLoading(false)
  }) .catch(error => {
   
    reject(error)
    setLoading(false)

  })
})
  
  }


  return (
    <AuthContext.Provider value={{ login,signUp, pageHeading, setpageHeading, logOut, userInfo, setUserInfo }}>
      {userInfo.auth == null ? <div className='fixed top-0 bottom-0 left-0 right-0  z-50'>
        <LoadingPopup
          isLoading={true}
          size="md" // Can be 'sm', 'md', or 'lg'
          type="gif" // Can be 'spinner' or 'gif'
          gifSrc="/img/icon_img.gif" // Path to custom GIF
        />
      </div>
        :
        children}

    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a AuthContext');
  }
  return context;
}


// Dummy User for development


export const dummyUser = {
  roll: "seller",
  name: "John Doe",
  company: "Doe Enterprises",
  phoneNumber: "+1-123-456-7890",
  email: "johndoe@example.com",
  address: {
    street: "123 Main Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    country: "USA"
  },

  taxId: "TAX123456",

  pickupDetails: {
    packageCount: 10,
    pickupDate: "2024-12-15",
    pickupLocation: {
      street: "456 Elm Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62702",
      country: "USA"
    },
    specialInstructions: "Handle with care, fragile items."
  },
  subscription: {
    subscribe: true,
    plans: {
      planName: "Premium Plan",
      price: 99.99,
      duration: "3 months",
      benefits: ["Priority Support", "Advanced Analytics", "Free Upgrades"],
      startDate: "2024-12-01",
      endDate: "2025-02-28"
    },
    paymentInfo: {
      paymentMethod: "Credit Card",
      cardLastFour: "5678",
      billingAddress: {
        street: "123 Main Street",
        city: "Springfield",
        state: "IL",
        zipCode: "62701",
        country: "USA"
      }
    }
  },
  preferences: {
    communication: {
      email: true,
      sms: false,
      phoneCall: true
    },
    notifications: ["Order Updates", "Promotions", "Newsletter"]
  }
};


