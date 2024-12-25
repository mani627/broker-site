import React from 'react';
import { Phone } from 'lucide-react';


import { PhoneHeader } from './PhoneHeader';
import { SubmitButton } from './SubmitButton';
import { usePhoneInput } from './usePhonelnput';
import { PhoneInputField } from './PhonelnputField';

export function PhoneInput({ onSubmit, isLoading }) {
    const { phoneNumber, handleChange, isValid } = usePhoneInput();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            onSubmit(phoneNumber);
        }
    };

    return (
        <div className="w-full">
            <PhoneHeader icon={<Phone className="w-6 h-6 text-blue-600" />} />

            <div className="space-y-4">
                <PhoneInputField
                    value={phoneNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                />

                <SubmitButton
                    onClick={handleSubmit}
                    disabled={!isValid || isLoading}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
