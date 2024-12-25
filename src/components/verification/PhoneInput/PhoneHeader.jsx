import React from 'react';

export function PhoneHeader({ icon }) {
    return (
        <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Phone Number</h2>
            <p className="text-gray-600">
                We'll send you a verification code to confirm your identity
            </p>
        </div>
    );
}
