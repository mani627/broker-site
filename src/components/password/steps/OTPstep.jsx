import { OTPInput } from '@/components/OtpInput';
import { useLoadingState } from '@/customHook/useLoadingState';
import { LinearProgress } from '@mui/material';
import React from 'react';


export function OTPStep({ phoneNumber, onNext, onBack, onResend, others =null }) {
    const { startLoading, stopLoading } = useLoadingState();

    const handleVerify = async (otp) => {
        onNext(otp);
    };
    return (
        <div className='relative'>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
            <p className="text-gray-600 mb-6">
                We've sent a code to {phoneNumber}
            </p>

            <OTPInput disabled={others !=null ? others.load : false} onComplete={handleVerify} />


            {others !=null && <div className='my-2'>{others?.text}</div>}
            {others !=null && others?.load && <div className='px-10'>

                <LinearProgress color="secondary" />
            </div>}

            <div className="mt-6 flex flex-col gap-2">
                <h2 className='text-sm text-red-600'>{others !=null && others?.error}</h2>
                <button
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={onBack}
                >
                    Change phone number
                </button>
                {/* <button
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={onResend}
                >
                    Resend code
                </button> */}
            </div>

        </div>
    );
}
