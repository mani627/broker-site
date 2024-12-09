import React from 'react';

export function PhoneInputField({ value, onChange, disabled }) {
    return (
        <div className="relative">
            <input
                type="tel"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                placeholder="Enter your phone number"
                disabled={disabled}
            />
        </div>
    );
}
