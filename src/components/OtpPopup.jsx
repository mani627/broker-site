import React, { useState } from 'react';
import { X } from 'lucide-react';
import { OTPInput } from './OTPInput';
import { LoadingSpinner } from './LoadingSpinner';
import LoadingAnimation from './Loading';

export function OTPPopup({ isOpen, onClose, onVerify }) {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleVerify = async (otp) => {
        setIsLoading(true);
        try {
            await onVerify(otp);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 z-10">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                >
                    <X size={24} />
                </button>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</h2>
                    <p className="text-gray-600 mb-6">
                        Please enter the verification code sent to your device
                    </p>

                    {isLoading ? (
                        <div className="py-6">
                            <LoadingAnimation />
                            <p className="mt-4 text-gray-600">Verifying your code...</p>
                        </div>
                    ) : (
                        <OTPInput onComplete={handleVerify} />
                    )}

                    <div className="mt-6">
                        <button
                            className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                            onClick={() => {
                                // Handle resend logic
                            }}
                            disabled={isLoading}
                        >
                            Didn't receive the code? Resend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
