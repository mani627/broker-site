import CustomInput from "@/components/CustomInput";
import { ForgotPasswordPopup } from "@/components/ForgetPasswordPopup";
import { ToastContainer } from "react-toastify";
import LoadingPopup from "@/components/LoadingButton";
import PasswordInput from "@/components/PasswordInput";
import { PhoneInput } from "@/components/PhoneInput";
import { useAuth } from "@/context/authContext";
import { validateInput } from "@/util";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Validation Functions
const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;  // Ensure it's exactly 10 digits
  return phoneRegex.test(phone);
};



export function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formValue, setForm] = useState({
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState({
    phoneNumber: "",
    password: "",
  });

  const setFormValues = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateFormOnChange = (key, value) => {
    let newError = { ...error };

    if (key === "phoneNumber") {
      if (!value) {
        newError.phoneNumber = "Phone number is required.";
      } else if (value.length !== 10) {
        newError.phoneNumber = "Phone number must be 10 digits.";
      } else if (!validatePhoneNumber(value)) {
        newError.phoneNumber = "Invalid phone number.";
      } else {
        newError.phoneNumber = "";
      }
    }

    if (key === "password") {
      if (!value) {
        newError.password = "Password is required.";
      } else if (value.length < 8) {
        newError.password = "Password must be at least 8 characters.";
      } else {
        newError.password = "";
      }
    }

    setError(newError);
  };

  const Login = (e) => {
    e.preventDefault();

    let isValid = true;
    let newError = { phoneNumber: "", password: "" };

    // Validate Phone Number
    if (!formValue.phoneNumber) {
      newError.phoneNumber = "Phone number is required.";
      isValid = false;
    } else if (formValue.phoneNumber.length !== 10) {
      newError.phoneNumber = "Phone number must be 10 digits.";
      isValid = false;
    }

    // Validate Password
    if (!formValue.password) {
      newError.password = "Password is required.";
      isValid = false;
    } else if (formValue.password.length < 8) {
      newError.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    // Check if terms and conditions checkbox is checked
    if (!document.getElementById("conditions").checked) {
      newError.terms = "You must agree to the terms and conditions.";
      isValid = false;
    }

    // Set errors if validation fails
    setError(newError);

    if (isValid) {
      // Proceed with login logic if validation passes
      login({phoneNumber:`+91${formValue.phoneNumber}`,password:formValue.password});
    }
  };

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handlePasswordReset1 = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Password reset completed:", data);
      setIsForgotPasswordOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="m-8 flex gap-4 ">
      <ToastContainer />
      <div className="w-full lg:w-3/5 mt-16">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your phone number and password to Sign In.
          </Typography>
        </div>
        <form onSubmit={Login} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col ">
            <CustomInput
            values={formValue.phoneNumber}
              setFormValues={setFormValues}
              label="Phone Number"
              placeholder={"0987654321"}
              name="phoneNumber"
              maxLength={10}
              error={error}
              margin={""}
              onChange={(e) => {
                setFormValues("phoneNumber", e.target.value);
                validateFormOnChange("phoneNumber", e.target.value);
              }}
            />
            <PasswordInput
              setFormValues={setFormValues}
              label="Password"
              value={formValue.password}
              placeholder={"Enter your password"}
              error={error}
              onChange={(e) => {
                setFormValues("password", e.target.value);
                validateFormOnChange("password", e.target.value);
              }}
            />
          </div>
          <Checkbox
            id="conditions"
            checked={isCheckboxChecked}
            onChange={(e) => setIsCheckboxChecked(e.target.checked)}
            label={
              <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                I agree to the&nbsp;
                <a href="#" className="font-normal text-black transition-colors hover:text-gray-900 underline">
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            type="submit"
            className={`mt-6 bg-primary text-text_primary ${!isCheckboxChecked ? "opacity-50 cursor-not-allowed" : ""}`}
            fullWidth
            disabled={!isCheckboxChecked}
          >
            Sign In
          </Button>

          {/* Loading popup */}
          <LoadingPopup
            isLoading={isLoading}
            size="lg"
            type="gif"
            gifSrc="/img/icon_img.gif"
          />
          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsForgotPasswordOpen(true);
                }}
              >
                Forgot Password?
              </a>
            </Typography>
            <ForgotPasswordPopup
              isOpen={isForgotPasswordOpen}
              onClose={() => setIsForgotPasswordOpen(false)}
              onPasswordReset={handlePasswordReset1}
            />
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/auth_img.png"
          className="h-[93vh] w-full object-cover rounded-3xl bg-blue-gray-300"
        />
      </div>
    </section>
  );
}

export default SignIn;
