import React, { useState } from 'react';
import { Input } from '@material-tailwind/react';

const PasswordInput = ({
    value="",
    conText = false,
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
        <div className="relative mb-2  flex flex-col   min-h-[13vh]  " >
            <label className="mb-1 font-medium text-blue-gray-500">{label}</label>
            <div className="relative mb-1">
                <Input
                value={value}
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
            {conText && (
                <span className="text-xs mb-1 italic text-gray-700">Password must contain at least one uppercase, lowercase, and special character</span>
            )}
            
           
           
           
        </div>
    );
};

export default PasswordInput;
