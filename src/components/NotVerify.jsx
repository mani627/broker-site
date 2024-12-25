import React, { useState } from 'react';
import { LinearProgress } from '@mui/material';
import {OTPInput} from '@/components/OtpInput';
import { useAuth } from '@/context/authContext';

function NotVerify() {
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');

  const {logOut} = useAuth()
  const handleResend = async () => {
    setIsResending(true);
    setMessage('');

    try {
      // Simulate API call for resending OTP
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessage('OTP has been resent successfully!');
    } catch (error) {
      setMessage('Failed to resend OTP. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (otp) => {
    setIsLoading(true);
    setVerificationStatus('');

    try {
      // Simulate OTP verification API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Example condition: mock success if OTP is "1234"
      if (otp === '123456') {
        setVerificationStatus('success');
        setMessage('OTP verified successfully!');
      } else {
        setVerificationStatus('error');
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setVerificationStatus('error');
      setMessage('Verification failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logOut()

    // Add logout logic here (e.g., clearing tokens, redirecting)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50">
    
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium text-gray-800">Verifying OTP...</p>
            <LinearProgress color="secondary" className="mt-4" />
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Phone Verification</h1>
        <p className="text-gray-600 text-sm mb-6">
          You have not verified your phone number <span className='italic font-bold'>+919597439871</span> . Please enter your OTP below.
        </p>

        <OTPInput onComplete={handleVerify}  disabled={isResending || isLoading} />

        {isResending && (
          <div className="my-4">
            <LinearProgress color="secondary" />
          </div>
        )}

        {message && (
          <p
            className={`mt-2 text-sm ${
              verificationStatus === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        <button
          className="mt-6 w-full px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition"
          onClick={handleResend}
          disabled={isResending || isLoading}
        >
          Resend OTP
        </button>

        <button
          className="mt-4 px-6 py-2  text-gray-900 rounded-lg transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default NotVerify;
