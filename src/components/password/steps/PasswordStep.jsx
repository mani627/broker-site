import React from 'react';

import { PasswordResetForm } from '@/components/PasswordReset';
import { useLoadingState } from '@/customHook/useLoadingState';

export function PasswordStep({ onComplete }) {
    const { startLoading, stopLoading } = useLoadingState();

    const handleSubmit = async (passwords) => {
        startLoading('Resetting password...');
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            onComplete(passwords);
        } finally {
            stopLoading();
        }
    };

    return <PasswordResetForm onSubmit={handleSubmit} />;
}
