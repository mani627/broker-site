import { OTPInput } from '@/components/OtpInput';
import { useLoadingState } from '@/customHook/useLoadingState';
import React from 'react';


export function OTPStep({ phoneNumber, onNext, onBack, onResend }) {
    const { startLoading, stopLoading } = useLoadingState();

    const handleVerify = async (otp) => {
        startLoading('Verifying code...');
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            onNext(otp);
        } finally {
            stopLoading();
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
            <p className="text-gray-600 mb-6">
                We've sent a code to {phoneNumber}
            </p>
            <OTPInput onComplete={handleVerify} />
            <div className="mt-6 flex flex-col gap-2">
                <button
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={onBack}
                >
                    Change phone number
                </button>
                <button
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={onResend}
                >
                    Resend code
                </button>
            </div>
        </div>
    );
}
