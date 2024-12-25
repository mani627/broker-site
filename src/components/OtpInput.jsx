import React, { useState, useRef, useEffect } from 'react';

export function OTPInput({ disabled = false, length = 6, onComplete = () => {} }) {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join('');
        if (combinedOtp.length === length) {
            onComplete(combinedOtp);
        }

        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="flex gap-2 justify-center">
            {otp.map((value, index) => (
                <input
         
                disabled={disabled}
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                    maxLength={1}
                />
            ))}
        </div>
    );
}
