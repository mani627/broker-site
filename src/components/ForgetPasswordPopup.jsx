import React, { useState, useEffect } from "react";
import { TextField, Button, CircularProgress, Typography, InputAdornment, IconButton } from "@mui/material";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { OTPInput } from "./OtpInput"; // Assuming OTPInput is in the same directory
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { forgetPassword } from "@/api/helperAPI";

export function ForgotPasswordPopup({ isOpen, onClose }) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Handle password visibility toggle
    const handleTogglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    // Send OTP
    const handleSend = async () => {


        setIsLoading(true);
        setError("");
        setSuccess("");

        await forgetPassword({ phoneNumber: phoneNumber }).then(res => {

            setIsLoading(false);
            setIsSent(true);
            setSuccess("OTP Sent Successfully!");
            // setShowSuccessMessage(true);

        }).catch(err => {
            
            setIsLoading(false);
            setError(err?.response?.data?.message || "Failed to send OTP!");
        })

        // setTimeout(() => {
        //     setIsLoading(false);
        //     setIsSent(true);
        //     setSuccess("OTP Sent Successfully!");
        // }, 2000);
    };

    // Validate password
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/; // At least one lowercase, one uppercase, and one special character
        return regex.test(password);
    };

    // Handle password reset submission
    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        if (validatePassword(newPassword)) {
            //   Write API
            await forgetPassword({ phoneNumber, otp, newPassword: newPassword })
            .then(res => {
                setIsLoading(false);
                setSuccess("Password Updated Successfully!");
                setShowSuccessMessage(true);
            }).catch(err=>{
               
                setIsLoading(false);
                setError(err?.response?.data?.message || "Failed to update password!");
            })

        } else {
            setPasswordError("Password must contain at least one uppercase letter, one lowercase letter, and one special character.");
            setIsLoading(false);
        }
    };

    const handleOtpComplete = (otpValue) => {
        setOtp(otpValue);
    };
    const handleNewPasswordChange = (e) => {
        const passwordValue = e.target.value;
        setNewPassword(passwordValue);

        // Validate the password
        if (validatePassword(passwordValue)) {
            setPasswordError(""); // Clear the error if the password is valid
        } else {
            setPasswordError("Password must contain at least one uppercase letter, one lowercase letter, and one special character.");
        }
    };

    // Reset values on component unmount
    useEffect(() => {
        return () => {
            setPhoneNumber("");
            setOtp("");
            setNewPassword("");
            setConfirmPassword("");
            setIsLoading(false);
            setIsSent(false);
            setError("");
            setSuccess("");
            setPasswordError("");
            setShowPassword(false);
            setShowSuccessMessage(false);
        };
    }, []);

    // Close popup after showing success message
    useEffect(() => {
        if (showSuccessMessage) {
            setTimeout(() => {
                onClose(); // Close the popup after 3 seconds
            }, 3000);
        }
    }, [showSuccessMessage, onClose]);

    if (!isOpen) return null; // If not open, do not render

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                {/* Back Button */}
                {isSent && (
                    <button
                        onClick={() => setIsSent(false)}
                        className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
                    >
                        <AiOutlineArrowLeft size={24} />
                    </button>
                )}

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <AiOutlineCloseCircle size={24} />
                </button>

                {/* Success message */}
                {showSuccessMessage && (
                    <div className="text-center text-lg font-bold my-10 text-green-600">
                        <Typography variant="h6">Password Updated Successfully ✅</Typography>
                    </div>
                )}

                {/* Main content (Phone, OTP, Password fields) */}
                {!showSuccessMessage && (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h2>
                        <p className="text-gray-500 mb-4">Enter your phone number to reset your password</p>

                        {/* Phone number input */}
                        {!isSent ? (
                            <>
                                <div className="mb-4">
                                    <TextField
                                        label="Phone Number"
                                        variant="outlined"
                                        fullWidth
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        disabled={isLoading}
                                        InputProps={{
                                            startAdornment: (
                                                <FaPhoneAlt className="text-gray-500 mr-2" />
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="text-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ bgcolor: "orange" }}
                                        onClick={handleSend}
                                        disabled={isLoading || phoneNumber.length !== 10}
                                    >
                                        {isLoading ? <CircularProgress size={24} /> : "Send OTP"}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* OTP Input */}
                                <div className="mb-4">
                                    <OTPInput
                                        length={6}
                                        disabled={isLoading}
                                        onComplete={handleOtpComplete}
                                    />
                                </div>
                                {/* New Password Input */}
                                <div className="mb-4">
                                    <TextField
                                        label="New Password"
                                        variant="outlined"
                                        type={showPassword ? "text" : "password"}
                                        size="medium"
                                        fullWidth
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}  // Use the updated handler
                                        disabled={isLoading}
                                        error={passwordError !== ""}
                                        helperText={passwordError}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleTogglePasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                {/* Confirm Password Input */}
                                <div className="mb-4">
                                    <TextField
                                        label="Confirm Password"
                                        variant="outlined"
                                        type="password"
                                        size="medium"
                                        fullWidth
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <h3 className="text-xs mb-3 text-start italic text-gray-700">
                                    Password must contain at least one uppercase, one lowercase, and one special character ex: Password@123
                                </h3>
                                <div className="text-center">
                                    <Button
                                        variant="contained"
                                        sx={{ bgcolor: "orange" }}
                                        fullWidth
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <CircularProgress className="text-orange-700" size={24} /> : "Submit"}
                                    </Button>
                                </div>
                            </>
                        )}

                        {/* Error and Success Messages */}
                        {error && (
                            <div className="mt-4 text-red-600 flex items-center justify-center">
                                <AiOutlineCloseCircle className="mr-2" /> <Typography>{error}</Typography>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
