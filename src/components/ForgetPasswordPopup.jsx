// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import LoadingAnimation from './Loading';
// import { PhoneInput } from './PhoneInput';
// import { OTPInput } from './OtpInput';
// import { PasswordResetForm } from './PasswordReset';

// export default function ForgotPasswordPopup({ isOpen, onClose, onPasswordReset }) {
//     const [step, setStep] = useState('phone');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     if (!isOpen) return null;

//     const handlePhoneSubmit = async (event, phone) => {
//         event.preventDefault(); // Prevent form submission
//         setIsLoading(true);
//         try {
//             await new Promise((resolve) => setTimeout(resolve, 1500));
//             setPhoneNumber(phone);
//             setStep('otp');
//         } catch (error) {
//             console.error('Error submitting phone:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleOTPVerify = async (event, otp) => {
//         event.preventDefault(); // Prevent form submission
//         setIsLoading(true);
//         try {
//             await new Promise((resolve) => setTimeout(resolve, 1500));
//             setStep('password');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handlePasswordReset = async (event, passwords) => {
//         event.preventDefault(); // Prevent form submission
//         setIsLoading(true);
//         try {
//             await new Promise((resolve) => setTimeout(resolve, 1500));
//             onPasswordReset({ phoneNumber, password: passwords.password });
//             onClose();
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleClose = () => {
//         if (!isLoading) {
//             onClose();
//             setTimeout(() => {
//                 setStep('phone');
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
//                             <LoadingAnimation />
//                             <p className="mt-4 text-gray-600">
//                                 {step === 'phone' && 'Sending verification code...'}
//                                 {step === 'otp' && 'Verifying code...'}
//                                 {step === 'password' && 'Resetting password...'}
//                             </p>
//                         </div>
//                     ) : (
//                         <>
//                             {step === 'phone' && (
//                                 <PhoneInput onSubmit={(event, phone) => handlePhoneSubmit(event, phone)} isLoading={isLoading} />
//                             )}
//                             {step === 'otp' && (
//                                 <OTPInput onComplete={(event, otp) => handleOTPVerify(event, otp)} />
//                             )}
//                             {step === 'password' && (
//                                 <PasswordResetForm onSubmit={(event, passwords) => handlePasswordReset(event, passwords)} isLoading={isLoading} />
//                             )}
//                         </>
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
import { OTPInput } from './OtpInput';
import { PasswordStep } from './password/steps/PasswordStep';
import { OTPStep } from './password/steps/OTPstep';
import LoadingPopup from './LoadingButton';

export function ForgotPasswordPopup({ isOpen, onClose, onPasswordReset }) {
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
            setTimeout(resetFlow, 300);
        }
    };

    const handlePhoneSubmit = (phone) => {
        setPhoneNumber(phone);
        setStep('otp');
    };

    const handleOTPVerify = () => {
        setStep('password');
    };

    const handlePasswordSubmit = (passwords) => {
        onPasswordReset({ phoneNumber, password: passwords.password });
        setTimeout(() => {
            handleClose(); // Call handleClose to close and reset
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={handleClose} />
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
                                    onNext={handleOTPVerify}
                                    onBack={() => setStep('phone')}
                                    onResend={() => handlePhoneSubmit(phoneNumber)}
                                />
                            )}

                            {step === 'password' && (
                                <PasswordStep onComplete={handlePasswordSubmit} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
