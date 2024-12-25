import { useAuth } from "@/context/authContext";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import LogOut from "./LogOut";
import { FaWallet } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export function Profile() {
  const { userInfo ,setpageHeading } = useAuth();
  const navigate = useNavigate()
    useEffect(() => {
          setpageHeading({ title: "Profile", backURL: "/home" })
   
      }, []);

  // Single useState for all fields
  const [state, setState] = useState({
    sellerName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    pickupCount: 0,
    pickupDate: "",
  });

  // Separate useStates for editable and modal state
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogout, setisLogout] = useState(false);


  const handleLogout = ()=>{
    setisLogout(true);
  }
  // Update state with userData when it changes
  useEffect(() => {
    const userData = userInfo.data
    if (userData) {
      setState((prevState) => ({
        ...prevState,
        sellerName: userData.name || "",
        companyName: userData.company || "",
        phoneNumber: userData.phoneNumber || "",
        email: userData.email || "",
        pickupCount: userData.pickupDetails?.packageCount || 0,
        pickupDate: userData.pickupDetails?.pickupDate || "",
      }));
    }
  }, [userInfo.data]);

  const handleEditClick = () => {
    setIsEditable((prev) => !prev);
    if (isEditable) {
      setIsModalOpen(true);
    }
  };

  const handleSaveChanges = () => {
    setIsEditable(false);
    setIsModalOpen(false);
  };

  const handleDiscardChanges = () => {
    const userData = userInfo.data
    if (userData) {
      setState((prevState) => ({
        ...prevState,
        sellerName: userData.name || "",
        companyName: userData.company || "",
        phoneNumber: userData.phoneNumber || "",
        email: userData.email || "",
        pickupCount: userData.pickupDetails?.packageCount || 0,
        pickupDate: userData.pickupDetails?.pickupDate || "",
      }));
      setIsEditable(false);
      setIsModalOpen(false);
    }
  };

  const handleChange = (field, value) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
  };

  const {
    sellerName,
    companyName,
    phoneNumber,
    email,
    pickupCount,
    pickupDate,
  } = state;

  const okayPress = ()=>{
    navigate('/home')
  }

  return (
    <>
      {/* Background */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>

      {/* Profile Card */}
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardHeader className="flex justify-between items-center p-4">
          <div className="flex items-center gap-6">
            <Avatar
              src="/img/bruce-mars.jpeg"
              alt="bruce-mars"
              size="xl"
              variant="rounded"
              className="rounded-lg shadow-lg shadow-blue-gray-500/40"
            />
            <div>
              <Typography variant="h5" color="blue-gray" className="mb-1">
                {sellerName}
              </Typography>
              <Typography variant="small" className="font-normal text-blue-gray-600">
                CEO / Co-Founder
              </Typography>
            </div>
          </div>

          {/* Edit and Save Buttons */}
          <div className="flex gap-2">
            {isEditable && (
              <Button
                color="red"
                variant="outlined"
                onClick={handleDiscardChanges}
                className="text-gray-800 transition-all duration-200 ease-in-out px-6 py-3 rounded-lg"
              >
                Discard
              </Button>
            )}
            <Button
              color={ "pink"}
              size="md"
              onClick={handleEditClick}
              className="text-white flex items-center gap-2"
            >
              {isEditable ? (
                <>
                  <FaSave /> Save
                </>
              ) : (
                <>
                  <FaEdit /> Edit
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        <CardBody className="p-4 pt-16">
          <div className="grid grid-cols-1 gap-6">
            {/* Editable Inputs */}
            <div className="flex flex-col gap-2">
              <Typography variant="small" className="text-gray-600">
                Seller Name
              </Typography>
              <Input
                value={sellerName}
                onChange={(e) => handleChange("sellerName", e.target.value)}
                disabled={!isEditable}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Typography variant="small" className="text-gray-600">
                Company Name
              </Typography>
              <Input
                value={companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                disabled={!isEditable}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Typography variant="small" className="text-gray-600">
                Phone Number
              </Typography>
              <Input
                value={phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                disabled={!isEditable}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Typography variant="small" className="text-gray-600">
                Email ID
              </Typography>
              <Input
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={!isEditable}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Typography variant="small" className="text-gray-600">
                Pickup Package Count
              </Typography>
              <Input
                type="number"
                value={pickupCount}
                onChange={(e) => handleChange("pickupCount", e.target.value)}
                disabled={!isEditable}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Typography variant="small" className="text-gray-600">
                Pickup Date From Order
              </Typography>
              <Input
                type="date"
                value={pickupDate}
                onChange={(e) => handleChange("pickupDate", e.target.value)}
                disabled={!isEditable}
              />
            </div>
          </div>
        </CardBody>

        {/* Buttons */}
        <CardFooter className="flex flex-col md:flex-row justify-between gap-4 p-4">
        <Button onClick={handleLogout} color="pink" className="order-2 md:order-1">
            LogOut
          </Button>
        <div className="flex gap-3 order-1 md:order-2 ">
        <Button color="gray" className=" w-full flex gap-2 items-center">
            Recharge Wallet <IoWalletOutline size={17} />
          </Button>
          <Button onClick={okayPress} color="pink" className="">
            Ok
          </Button>
        </div>
          
        </CardFooter>
      </Card>

      <LogOut isopen={isLogout} setIsOpen={setisLogout} />
    </>
  );
}

export default Profile;
