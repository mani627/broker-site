import React, { useState } from 'react';
import { Phone } from 'lucide-react';

export function PhoneInput({ onSubmit, isLoading }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const phone = e.target.elements.phone.value;
        console.log("hi")
        if (onSubmit) {
            onSubmit(phone);
        }
    };
    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Phone Number</h2>
                <p className="text-gray-600">
                    We'll send you a verification code to confirm your identity.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                        placeholder="Enter your phone number"
                        disabled={isLoading} // Disable input while loading
                    />
                </div>

                <button
                    type="submit"
                    disabled={phoneNumber.length < 10 || isLoading} // Disable if invalid or loading
                    className="w-full py-3 px-4 bg-primary text-text_primary rounded-lg font-medium 
                    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Sending Code...' : 'Send Verification Code'}
                </button>
            </form>
        </div>
    );
}
