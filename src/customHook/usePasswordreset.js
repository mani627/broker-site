import { useState, useCallback } from 'react';

export function usePasswordReset(onSubmit) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
        setError('');
    }, []);

    const handleConfirmPasswordChange = useCallback((e) => {
        setConfirmPassword(e.target.value);
        setError('');
    }, []);

    const toggleShowPassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const handleSubmit = useCallback(() => {
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        onSubmit({ password, confirmPassword });
    }, [password, confirmPassword, onSubmit]);

    return {
        password,
        confirmPassword,
        showPassword,
        error,
        handlePasswordChange,
        handleConfirmPasswordChange,
        toggleShowPassword,
        handleSubmit,
    };
}
