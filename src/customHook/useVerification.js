import { useState, useCallback } from 'react';
import { useLoadingState } from './useLoadingState';

export function useVerification(initialStep, onComplete) {
    const [step, setStep] = useState(initialStep === 'phone-first' ? 'phone' : 'otp');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { startLoading, stopLoading, isLoading, loadingText } = useLoadingState();

    const handlePhoneSubmit = useCallback(
        async (phone) => {
            startLoading('Sending verification code...');
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated async operation
                setPhoneNumber(phone);
                setStep('otp');
            } finally {
                stopLoading();
            }
        },
        [startLoading, stopLoading]
    );

    const handleOTPVerify = useCallback(
        async (otp) => {
            startLoading('Verifying code...');
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated async operation
                onComplete({ phoneNumber, otp });
            } finally {
                stopLoading();
            }
        },
        [phoneNumber, onComplete, startLoading, stopLoading]
    );

    const handleResendCode = useCallback(() => {
        handlePhoneSubmit(phoneNumber);
    }, [phoneNumber, handlePhoneSubmit]);

    const resetState = useCallback(() => {
        setStep(initialStep === 'phone-first' ? 'phone' : 'otp');
        setPhoneNumber('');
    }, [initialStep]);

    return {
        step,
        setStep,
        phoneNumber,
        handlePhoneSubmit,
        handleOTPVerify,
        handleResendCode,
        isLoading,
        loadingText,
        resetState,
    };
}
