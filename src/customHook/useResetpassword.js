import { useState } from 'react';
import { useLoadingState } from './useLoadingState';

export function useResetPassword() {
    const [step, setStep] = useState('phone'); // Default step is 'phone'
    const [phoneNumber, setPhoneNumber] = useState('');
    const { startLoading, stopLoading, isLoading, loadingText } = useLoadingState();

    const resetFlow = () => {
        setStep('otp');
        setPhoneNumber( '');
    };

    return {
        step,
        setStep,
        phoneNumber,
        setPhoneNumber,
        resetFlow,
        startLoading,
        stopLoading,
        isLoading,
        loadingText,
    };
}
