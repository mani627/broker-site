import CustomInput from "@/components/CustomInput";
import PasswordInput from "@/components/PasswordInput";
import { VerificationPopup } from "@/components/VerificationPopup";
import { useAuth } from "@/context/authContext";
import { validateInput } from "@/util";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


export function SignUp() {


  const { signUp } = useAuth()

  const [formValue, setForm] = useState({
    name: "",
    companyName: "",
    phoneNumber: "",
    emailId: "",
    password: "",
    orders: "",
    domainName: "",
    accessToken: ""
  })

  const [error, setError] = useState({
    name: "",
    companyName: "",
    phoneNumber: "",
    emailId: "",
    password: "",
    orders: "",
    domainName: "",
    accessToken: ""
  })
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const setFormValues = (key, value) => {
    // Validate the input whenever the value changes
    const validationErrors = { ...error };
    if (!validateInput(key, value)) {
      validationErrors[key] = `Invalid ${key.replace(/([A-Z])/g, " $1")}`; // Custom error message for invalid input
    } else {
      validationErrors[key] = ""; // Clear error if valid
    }

    setError(validationErrors); // Update error state
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);


  const validateInput = (key, value) => {
    switch (key) {
      case "name":
        return /^[A-Za-z\s]+$/.test(value) && value.length >= 2; // Only letters and spaces, minimum 2 characters
      case "companyName":
        return value.trim().length > 2; // Minimum 3 characters
      case "phoneNumber":
        return /^\d{10}$/.test(value); // Exactly 10 digits
      case "emailId":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Basic email validation
      case "password":
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z!@#$%^&*(),.?":{}|<>0-9]{8,}$/.test(value);

      case "orders":
        return value !== ""; // Must be selected
      case "domainName":
        return /^(?!www\.)(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value); // Basic domain name validation
      case "accessToken":
        return value.trim().length > 0; // Cannot be empty
      default:
        return true; // Default to valid for unspecified fields
    }
  };
  const registerNow = async (e) => {
    e.preventDefault();


    // Perform validation for all fields
    const validationErrors = {};
    Object.entries(formValue).forEach(([key, value]) => {
      if (!validateInput(key, value)) {
        validationErrors[key] = `Invalid ${key.replace(/([A-Z])/g, " $1")}`; // Custom error message for invalid input
      } else {
        validationErrors[key] = ""; // Clear any existing errors if valid
      }
    });
    // Update error state
    setError(validationErrors);

    // Check if any error exists
    const hasErrors = Object.values(validationErrors).some((error) => error !== "");

    // Proceed only if there are no errors


    if (!hasErrors && isCheckboxChecked) {
      await signUp(formValue).then(res => {
        toast.success('Account created successfully , Enter your OTP', {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Open verification popup
            setIsVerificationOpen(true);

      }).catch(error => {
        const errorMessage = error?.response?.data?.message || "Invalid credentials"
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })


    } else if (!isCheckboxChecked) {
      alert("Please agree to the Terms and Conditions to register.");
    }



    // e.preventDefault();
    // if (document.getElementById("conditions").checked) {
    //   setError((prev) => {
    //     let result = { ...prev }
    //     Object.entries(formValue).forEach(([key, value]) => {
    //       result[key] = validateInput(key, value) ? "" : "Invalid Input"
    //     });
    //     return result

    //   })
    // }
    // startLoading('Verifying account...');
    // try {
    //   // Simulate API call
    //   await new Promise(resolve => setTimeout(resolve, 2000));
    //   console.log('Password reset completed:', data);
    //   setIsVerificationOpen(false);
    // } finally {
    //   stopLoading();
    // }
  }



  return (
    <section className="m-8 flex">
      <ToastContainer />
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/auth_img.png"
          className="h-[90vh] w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
        </div>
        <form onSubmit={registerNow} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <CustomInput setFormValues={setFormValues} value={formValue.name} label="Seller Name" placeholder={"John"} name="name" error={error} page={"register"} />
          <CustomInput setFormValues={setFormValues} value={formValue.companyName} label="Company Name" name="companyName" placeholder={"John Logistics"} error={error} page={"register"} />
          <CustomInput setFormValues={setFormValues} value={formValue.phoneNumber} label="Phone Number" name="phoneNumber" placeholder={"0987654321"} maxLength={10} error={error} page={"register"} />
          <CustomInput setFormValues={setFormValues} value={formValue.emailId} label="EmailID" name="emailId" placeholder={"john@gmail.com"} error={error} page={"register"} />
          <CustomInput setFormValues={setFormValues} value={formValue.domainName} label="Domain Name" name="domainName" placeholder={"john.shopify.com"} error={error} page={"register"} />
          <CustomInput setFormValues={setFormValues} value={formValue.accessToken} label="Access Token" name="accessToken" placeholder={"dfbsj8392hs9202928dndo"} error={error} page={"register"} />
          <PasswordInput setFormValues={setFormValues} conText = {true} label="Password" value={formValue.password} name="password" error={error} page={"register"} />
          
          <CustomInput
            page={"register"}
            error={error}
            name="orders"
            setFormValues={setFormValues}
            inputClass=' bg-[#e8f0fe]'
            value={''}
            label="How many orders do you ship in a month ?"
            isDropdown={true}
            options={[
              { value: '', label: 'Please Select' },
              { value: 'Setting Up a new business', label: 'Setting Up a new business' },
              { value: 'Between 1-10 Orders', label: 'Between 1-10 Orders' },
              { value: '11-100 Orders', label: '11-100 Orders' },
              { value: '101-1000 Orders', label: '101-1000 Orders' },
              { value: '1001-5000 Orders', label: '1001-5000 Orders' },
              { value: 'More than 5000 Orders', label: 'More than 5000 Orders' }

            ]}
          />


          <Checkbox
            id="conditions"
            checked={isCheckboxChecked}
            onChange={(e) => setIsCheckboxChecked(e.target.checked)}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className={`mt-6 bg-primary text-text_primary ${!isCheckboxChecked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            fullWidth
            disabled={!isCheckboxChecked}
            onClick={(e) => registerNow(e)}
          >
            Register Now
          </Button>
          <VerificationPopup
            isOpen={isVerificationOpen}
            phoneNumber={formValue.phoneNumber}
            onClose={() => setIsVerificationOpen(false)}
            onPasswordReset={registerNow} />
          {/* <div className="space-y-4 mt-8">
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Google</span>
            </Button>
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
              <span>Sign in With Twitter</span>
            </Button>
          </div> */}
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
