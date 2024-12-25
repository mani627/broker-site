// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import { PhoneInput } from './PhoneInput';
// import { OTPInput } from '../OTPInput';
// import { LoadingSpinner } from '../LoadingSpinner';

// export function VerificationPopup({
//     isOpen,
//     onClose,
//     onVerificationComplete,
//     type = 'phone-first',
// }) {
//     const [step, setStep] = useState(type === 'phone-first' ? 'phone' : 'otp');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     if (!isOpen) return null;

//     const handlePhoneSubmit = async (phone) => {
//         setIsLoading(true);
//         try {
//             // Simulate API call to send OTP
//             await new Promise((resolve) => setTimeout(resolve, 1500));
//             setPhoneNumber(phone);
//             setStep('otp');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleOTPVerify = async (otp) => {
//         setIsLoading(true);
//         try {
//             await new Promise((resolve) => setTimeout(resolve, 1500));
//             onVerificationComplete({ phoneNumber, otp });
//             onClose();
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleClose = () => {
//         if (!isLoading) {
//             onClose();
//             // Reset state after animation
//             setTimeout(() => {
//                 setStep(type === 'phone-first' ? 'phone' : 'otp');
//                 setPhoneNumber('');
//             }, 300);
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={handleClose} />
//             <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 z-10">
//                 <button
//                     onClick={handleClose}
//                     className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
//                     disabled={isLoading}
//                 >
//                     <X size={24} />
//                 </button>

//                 <div className="text-center">
//                     {isLoading ? (
//                         <div className="py-6">
//                             <LoadingSpinner />
//                             <p className="mt-4 text-gray-600">
//                                 {step === 'phone' ? 'Sending verification code...' : 'Verifying your code...'}
//                             </p>
//                         </div>
//                     ) : step === 'phone' ? (
//                         <PhoneInput onSubmit={handlePhoneSubmit} isLoading={isLoading} />
//                     ) : (
//                         <div>
//                             <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
//                             <p className="text-gray-600 mb-6">We've sent a code to {phoneNumber}</p>
//                             <OTPInput onComplete={handleOTPVerify} />
//                             <div className="mt-6 flex flex-col gap-2">
//                                 <button
//                                     className="text-sm text-blue-600 hover:text-blue-800"
//                                     onClick={() => setStep('phone')}
//                                     disabled={isLoading}
//                                 >
//                                     Change phone number
//                                 </button>
//                                 <button
//                                     className="text-sm text-blue-600 hover:text-blue-800"
//                                     onClick={() => handlePhoneSubmit(phoneNumber)}
//                                     disabled={isLoading}
//                                 >
//                                     Resend code
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
// import React, { useEffect, useState } from 'react';
// import { X } from 'lucide-react';
// import LoadingAnimation from './Loading';
// import { useResetPassword } from '@/customHook/useResetpassword';
// import { PhoneStep } from './password/steps/PhoneSetup';
// import { OTPStep } from './password/steps/OTPstep';
// import LoadingPopup from './LoadingButton';
// import { OTP } from '@/data/dummyData';
// import { useLoadingState } from '@/customHook/useLoadingState';
// import { useNavigate } from 'react-router-dom';
// import { verifyOTP } from '@/api/helperAPI';

// export function VerificationPopup({ isOpen, onClose, onPasswordReset ,number }) {

//     const navigate = useNavigate()

//     const [OTPDetails, setOTPDetails] = useState({
//         load:false,
//         error:null,
//         text:""
//     });
//     const {
//         step,
//         setStep,
//         phoneNumber,
//         setPhoneNumber,
//         resetFlow,
//         isLoading,
//         loadingText
//     } = useResetPassword();
 
//     useEffect(() => {
//        if(number !=null) {
//         setStep('otp')
//         setPhoneNumber(number);
//        }
//        return () => {
//             handleClose()
//        };
//     }, [number]);

// console.log(phoneNumber)

//     const handleClose = () => {
//         if (!isLoading) {
//             onClose();
//             setTimeout(resetFlow, 300); // Reset flow after closing
//         }
//     };

//     const handlePhoneSubmit = (phone) => {
//         setPhoneNumber(phone);
//         setStep('otp'); // Move to OTP step
//     };
//     const handleOTPVerify = async(otp) => {
//         // Verify OTP here
//         setOTPDetails({...OTPDetails,load:true,text:"Verifing..."}) 
//         await verifyOTP({otp,phoneNumber}).then(res=>{
//             setOTPDetails({...OTPDetails,load:false,text:"Verified Success ✅",})
//             setTimeout(() => {
//                 setOTPDetails({load:false,text:"",error:"",})
//                 navigate('/sign-in')
//             }, 8000);
//         }).catch(err => {
//             setOTPDetails({...OTPDetails,load:false,text:"",error:"Invalid OTP"})
//             console.log(err)
//         })

    
     
//         // setOTPDetails({...OTPDetails,load:true,text:"Verifing..."})
        
//         // if(OTP.includes(otp)) {
//         //     setTimeout(() => {
//         //         setOTPDetails({...OTPDetails,load:false,text:"Verified Success ✅",})
//         //         // Place your task logic here
//         //     }, 4000);
//         //     setTimeout(() => {
//         //         setOTPDetails({load:false,text:"",error:"",})
//         //         navigate('/sign-in')
//         //         // Place your task logic here
//         //     }, 8000);
//         //     return;
//         // }
//         // setTimeout(() => {
//         //     setOTPDetails({...OTPDetails,load:false,text:"",error:"Invalid OTP"})
//         //     // Place your task logic here
//         // }, 4000);

    

//         // Close popup after OTP verification
//         // setTimeout(() => {
//         //     handleClose(); // Call handleClose to close and reset
//         // }, 300);
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div
//                 className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                
//             />
//             <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 z-10">
//                 <button
//                     onClick={handleClose}
//                     className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
//                     disabled={isLoading}
//                 >
//                     <X size={24} />
//                 </button>

//                 <div className="text-center">
//                     {isLoading ? (
//                         <div className="py-6">
//                             <LoadingPopup />
//                             <p className="mt-4 text-gray-600">{loadingText}..</p>
//                         </div>
//                     ) : (
//                         <>
//                             {step === 'phone' && (
//                                 <PhoneStep onNext={handlePhoneSubmit} />
//                             )}

//                             {step === 'otp' && (
//                                 <OTPStep
//                                 others={OTPDetails}
//                                     phoneNumber={phoneNumber}
//                                     onNext={handleOTPVerify} // Call handleOTPVerify after OTP success
//                                     onBack={() => handleClose()}
//                                     onResend={() => handlePhoneSubmit(phoneNumber)}
//                                 />
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '@/api/helperAPI';
import {OTPInput} from '@/components/OtpInput';

export function VerificationPopup({ isOpen, onClose, phoneNumber }) {
  const navigate = useNavigate();

  const [otpDetails, setOtpDetails] = useState({
    isLoading: false,
    message: '',
    error: null,
  });

  useEffect(() => {
    return () => {
      if (!otpDetails.isLoading) {
        handleClose();
      }
    };
  }, []);

  const handleClose = () => {
    if (!otpDetails.isLoading) {
      onClose();
    }
  };

  const handleOTPVerify = async (otp) => {
    setOtpDetails({ isLoading: true, message: 'Verifying...', error: null });

    try {
      await verifyOTP({ otp, phoneNumber });
      setOtpDetails({ isLoading: false, message: 'Verified successfully ✅', error: null });
      setTimeout(() => {
        navigate('/auth/sign-in');
      }, 6000);
    } catch (error) {
      setOtpDetails({ isLoading: false, message: '', error: 'Invalid OTP' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={otpDetails.isLoading}
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
          <p className="text-gray-600 mb-4">We've sent a code to {phoneNumber}</p>

          <OTPInput
            disabled={otpDetails.isLoading}
            onComplete={handleOTPVerify}
          />

          {otpDetails.message && (
            <div className="text-gray-600 mt-2">{otpDetails.message}</div>
          )}

          {otpDetails.error && (
            <div className="text-red-600 mt-2">{otpDetails.error}</div>
          )}

          {otpDetails.isLoading && (
            <div className="mt-4">
              <LinearProgress color="secondary" />
            </div>
          )}

          <button
            onClick={handleClose}
            className="text-sm text-blue-600 hover:text-blue-800 mt-4"
          >
            Change phone number
          </button>
        </div>
      </div>
    </div>
  );
}