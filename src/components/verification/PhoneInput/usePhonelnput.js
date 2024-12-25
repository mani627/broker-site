import { useState, useCallback } from 'react';

export function usePhoneInput(minLength = 10) {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleChange = useCallback((value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, minLength);
        setPhoneNumber(cleaned);
    }, [minLength]);

    const isValid = phoneNumber.length === minLength;

    return {
        phoneNumber,
        handleChange,
        isValid
    };
}
