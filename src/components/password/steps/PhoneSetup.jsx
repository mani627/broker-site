import React, { useEffect } from 'react';
import { PhoneInput } from '../../verification/PhoneInput';
import { useLoadingState } from '@/customHook/useLoadingState';
import LoadingPopup from '@/components/LoadingButton';


export function PhoneStep({ onNext }) {
    const { startLoading, stopLoading,loadingComponent } = useLoadingState();

    // const handleSubmit = async (phone) => {
    //     startLoading("Sending code...",<LoadingPopup></LoadingPopup>);
    //     try {
    //         await new Promise((resolve) => setTimeout(resolve, 1500));
    //         onNext(phone);
    //     } finally {
    //         stopLoading();
    //     }
    // };
    useEffect(() => {
        console.log("Updated Loading Component:", loadingComponent);
    }, [loadingComponent]);

    const handleSubmit = async (phone) => {
        startLoading("Sending code...", <LoadingPopup />);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            onNext(phone);
        } finally {
            stopLoading();
        }
    };
    console.log(loadingComponent)
    return (
        <div>
        {loadingComponent}
        <PhoneInput onSubmit={handleSubmit} />
        </div>
    );
}
