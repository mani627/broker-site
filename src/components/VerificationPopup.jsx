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
import React from 'react';
import { X } from 'lucide-react';
import LoadingAnimation from './Loading';
import { useResetPassword } from '@/customHook/useResetpassword';
import { PhoneStep } from './password/steps/PhoneSetup';
import { OTPStep } from './password/steps/OTPstep';
import LoadingPopup from './LoadingButton';

export function VerificationPopup({ isOpen, onClose, onPasswordReset }) {
    const {
        step,
        setStep,
        phoneNumber,
        setPhoneNumber,
        resetFlow,
        isLoading,
        loadingText
    } = useResetPassword();

    const handleClose = () => {
        if (!isLoading) {
            onClose();
            setTimeout(resetFlow, 300); // Reset flow after closing
        }
    };

    const handlePhoneSubmit = (phone) => {
        setPhoneNumber(phone);
        setStep('otp'); // Move to OTP step
    };

    const handleOTPVerify = () => {
        // Close popup after OTP verification
        setTimeout(() => {
            handleClose(); // Call handleClose to close and reset
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                onClick={handleClose}
            />
            <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 z-10">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                >
                    <X size={24} />
                </button>

                <div className="text-center">
                    {isLoading ? (
                        <div className="py-6">
                            <LoadingPopup />
                            <p className="mt-4 text-gray-600">{loadingText}</p>
                        </div>
                    ) : (
                        <>
                            {step === 'phone' && (
                                <PhoneStep onNext={handlePhoneSubmit} />
                            )}

                            {step === 'otp' && (
                                <OTPStep
                                    phoneNumber={phoneNumber}
                                    onNext={handleOTPVerify} // Call handleOTPVerify after OTP success
                                    onBack={() => setStep('phone')}
                                    onResend={() => handlePhoneSubmit(phoneNumber)}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
