import React, { useState } from 'react';
import { Input } from '@material-tailwind/react';

const PasswordInput = ({
    label = "Password",          // Default label
    placeholder = "Enter password", // Default placeholder
    size = "lg",                 // Default input size
    inputClass = "!border-t-blue-gray-200 focus:!border-t-gray-900", // Input styling
    error,                       // Error object
    setFormValues = () => { },    // Function to handle value changes
    name = "password",           // Input name
    ...props
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="relative mb-1.5 flex flex-col gap-6">
            <label className="-mb-6 font-medium text-blue-gray-500">{label}</label>
            <div className="relative">
                <Input
                    type={isPasswordVisible ? "text" : "password"}
                    size={size}
                    placeholder={placeholder}
                    className={inputClass}
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => {
                        setFormValues(name, e.target.value);
                    }}
                    {...props}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    onClick={togglePasswordVisibility}
                >
                    {isPasswordVisible ? (
                        <span>hide</span>
                    ) : (
                        <span>show</span>
                    )}
                </button>
            </div>
            {error && (
                <span className="text-error text-sm">
                    {error[name] ? error[name] : null}
                </span>
            )}
        </div>
    );
};

export default PasswordInput;
