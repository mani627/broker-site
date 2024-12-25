import React, { useEffect, useState } from 'react';
import { BsXCircle } from 'react-icons/bs';
import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { Container } from '@mui/material';
import { FaUserTie, FaMoneyBillWave, FaNetworkWired, FaBoxOpen, FaShieldAlt, FaRupeeSign, FaCheckCircle, FaRegEdit, FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaShippingFast } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import { BiSupport } from "react-icons/bi";

import background1 from "../asset/background1.svg"
import background2 from "../asset/background2.svg"
import monitor from "../asset/monitor.png"
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
const EntryHome = () => {

const navigate = useNavigate()
    const {userInfo} = useAuth()
    if(localStorage.getItem("token") || userInfo.auth){
        return <Navigate to={"/dashbord/home"} />
    }

    const [menuOpen, setmenuOpen] = useState(false);
    const features = [
        {
            icon: <FaUserTie className="text-3xl text-gray-800 " />,
            title: 'Dedicated Shipping Advisors',
            description: 'Streamline your shipping strategies and swiftly resolve any shipping-related issues',
            bgColor: 'bg-pink-100/60',
        },
        {
            icon: <FaMoneyBillWave className="text-3xl text-gray-800 " />,
            title: 'RapidCOD',
            description: 'Maintain a regular cash flow with a 2-day COD remittance and scale your operations',
            bgColor: 'bg-yellow-100/60',
        },
        {
            icon: <FaNetworkWired className="text-3xl text-gray-800 " />,
            title: 'Multi-Carrier Integration',
            description: 'Access diverse carriers, ensure maximum efficiency with an AI-backed recommendation.',
            bgColor: 'bg-pink-100/60',
        },
        {
            icon: <FaBoxOpen className="text-3xl text-gray-800 " />,
            title: 'Reduced RTO',
            description: 'Say goodbye to costly RTOs. Save significantly with reduced RTO losses by up to 40%',
            bgColor: 'bg-yellow-100/60',
        },
        {
            icon: <FaShieldAlt className="text-3xl text-gray-800 " />,
            title: 'Shipment Security Cover',
            description: 'Get ensured shipment coverage against loss and damages during transit',
            bgColor: 'bg-pink-100/60',
        },
        {
            icon: <FaRupeeSign className="text-3xl text-gray-800 " />,
            title: 'Economical Prices',
            description: 'Delight your customers with top-notch services and easy costs on your pockets.',
            bgColor: 'bg-yellow-100/60',
        },
    ];


    return (
        <div className=' bg-gray-50'>
            <div className={`px-4 flex flex-col bg-gray-50 left-0 ${menuOpen ? ' top-[7vh] ' : 'top-[-40vh]'} right-0 z-20 fixed md:top-[-100vh] transition-all duration-500 md:gap-5 lg:gap-16`}>
                <h2 className='text-sm text-gray-700 text-center border-gray-300 border-b py-6 font-medium hover:underline cursor-pointer'>Product</h2>
                <h2 className='text-sm text-gray-700 text-center border-gray-300 border-b py-6 font-medium hover:underline cursor-pointer'>Features</h2>
                <h2 className='text-sm text-gray-700 text-center border-gray-300 border-b py-6 font-medium hover:underline cursor-pointer'>Shipping Tools</h2>
                <h2 className='text-sm text-gray-700 text-center border-gray-300 border-b py-6 font-medium hover:underline cursor-pointer'>About Us</h2>
            </div>

            {/* NavBar */}
            <nav className='sticky top-0 px-2 z-20 md:px-10 lg:h-[10vh] h-[7vh] bg-gray-50/90 text-gray-900 flex  items-center shadow-sm'>
               <Container className='flex justify-between items-center'>
                 {/* Logo */}
                 <div className='font-bold text-xl tracking-wide'>
                    Logo
                </div>

                {/* Center */}
                <div className='p-4 md:flex hidden md:gap-5 lg:gap-16'>
                    <h2 className='text-sm font-medium hover:underline cursor-pointer'>Product</h2>
                    <h2 className='text-sm font-medium hover:underline cursor-pointer'>Features</h2>
                    <h2 className='text-sm font-medium hover:underline cursor-pointer'>Shipping Tools</h2>
                    <h2 className='text-sm font-medium hover:underline cursor-pointer'>About Us</h2>
                </div>

                {/* Right */}
                <div className='md:flex gap-2 md:gap-6 hidden'>
                    <button onClick={()=>navigate('/auth/sign-in')} className='py-1  rounded-full text-sm hover:text-gray-700 text-gray-900 flex items-center gap-3 hover:border px-4 border-gray-300'>Sign In</button>
                    <button className='bg-orange-900 text-smx px-3 md:px-5 hover:bg-orange-800 py-1 hover:shadow-md text-gray-50 rounded-full flex items-center gap-2'>Get Started  
                    </button>
                </div>
               </Container>

                {!menuOpen && <IoMenu onClick={() => setmenuOpen(true)} className={`text-3xl md:hidden cursor-pointer mr-3`} />}
                {menuOpen && <BsXCircle onClick={() => setmenuOpen(false)} className={`text-3xl md:hidden cursor-pointer mr-3`} />}
            </nav>


            {/* Main Content */}

            {/* Contain - 1 */}
            <div
                style={{
                    position: 'relative', // Ensure proper positioning for pseudo-element
                    backgroundImage: `url(${background1})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                className=" h-[60vh] md:h-[80vh] w-full relative"
            >
                {/* Overlay for reducing background opacity */}
                <div className='bg-gray-50/90'
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // Allow clicks to pass through
                    }}
                >

                    <div className='bg-gray-50 text-xs lg:flex items-center gap-2 animate-bounce hidden absolute left-40 top-28 px-4 py-2 rounded-full shadow-lg'>
                        Expedited Shiping <FaShippingFast className="text-sm text-orange-400" />
                    </div>

                    <div className='bg-gray-50 text-xs lg:flex items-center gap-2 animate-bounce hidden absolute right-40 bottom-28 px-4 py-2 rounded-full shadow-lg'>
                        Quick Support <BiSupport className="text-sm text-pink-400" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex w-full  px-9 md:px-0 md:w-[40%] gap-10 mx-auto flex-col h-full items-center justify-center relative z-10">
                    <h2 className="md:text-5xl text-black text-3xl text-center font-bold">
                        Making eCommerce
                        <br />
                        Shipping Simple
                    </h2>

                    <h3 className="text-center text-gray-800   text-sm">
                        Transform eCommerce shipping with a tech-enabled solution to streamline
                        order fulfillment, integrate everything, save time and cost
                    </h3>

                    <button className="bg-orange-900 shadow-sm hover:shadow-md shadow-gray-600 hover:bg-orange-500 px-7 py-3 my-3 rounded-full text-gray-50 text-sm">
                        Get Started
                    </button>
                </div>
            </div>

            {/* Container - 2 */}
            <div
                className=" w-full relative"
                style={{
                    backgroundImage: `url(${background2})`, // Replace with the actual path to your SVG
                    backgroundSize: 'cover', // Adjust background size
                    backgroundRepeat: 'no-repeat', // Prevent tiling
                    backgroundPosition: 'center', // Center the background
                }}
            >
                <div className='bg-gray-50/90  w-full h-full'>


                    <Container className="grid grid-cols-8  z-10 flex-col md:flex-row items-center px-8">
                        {/* Left Section */}
                        <div className="col-span-8 md:col-span-3 space-y-6">
                            <h1 className="text-3xl font-bold text-gray-900">
                                Delve into our product modules
                            </h1>

                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Order Management System
                                    </h2>
                                    <p className="text-gray-600 text-xs">
                                        Manage your orders across multiple marketplaces and sales channels,
                                        ensuring automated hassle-free processing, record-keeping, and
                                        seamless operations to unlock the door to rapid organizational
                                        growth.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Courier Recommendation Engine
                                    </h2>
                                    <p className="text-gray-600 text-xs">
                                        Elevate your shipping game with cutting-edge AI-backed courier
                                        recommendation - SmartSelect. It analyzes and advises the best
                                        courier partner, for your shipment depending on your preferences.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Xperience Suite
                                    </h2>
                                    <p className="text-gray-600 text-xs">
                                        Customize your tracking page with promotional banners, logo; and
                                        omnichannel buyer communication providing customers with a
                                        personalized touchpoint that reinforces your brand identity and
                                        fosters loyalty.
                                    </p>
                                </div>

                                <div className="border-l-4 border-purple-600 pl-4">
                                    <h2 className="text-xl font-semibold text-gray-800">NDR Management</h2>
                                    <p className="text-gray-600 text-xs">
                                        Tackle non-delivery concerns head-on with our comprehensive feature.
                                        Ensure swift resolution of undelivered orders, minimizing costs and
                                        disruptions while safeguarding customer satisfaction.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="col-span-8 md:col-span-5 flex justify-center mt-10 md:mt-0">
                            {/* Replace 'Image' with an actual image or component */}
                            <img src={monitor} alt="" />
                        </div>
                    </Container>
                </div>
            </div>


            {/* Container - 3  */}
            <div className="bg-gray-50  md:h-[80vh] w-full  relative">
                <Container className=" ">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Explore the excellence</h2>
                        <p className="text-gray-700 text-sm mt-4">
                            Enhance customer experience with features that help your brand stay ahead of the competition
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`p-6 cursor-pointer hover:shadow-md rounded-lg shadow-sm shadow-gray-300  flex flex-col items-center`}
                                >
                                    <div className={`mb-4 ${feature.bgColor} p-3 rounded-lg`}>{feature.icon}</div>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-xs text-center px-3">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>


            {/* Container - 4  */}

            <Container className="bg-gray-50   w-full  relative">


                <section className="  px-6">

                    <div className='my-3 text-center'>
                        <h2 className="text-3xl font-bold text-gray-800">Explore the excellence</h2>
                        <p className="text-gray-700 text-sm mt-4">
                            Enhance customer experience with features that help your brand stay ahead of the competition
                        </p>
                    </div>
                    <div className="max-w-7xl my-10 mx-auto grid grid-cols-1 md:grid-cols-8 items-center gap-12">



                        {/* Left Content */}
                        <div className='md:col-span-4'>

                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Optimize logistics with <span className="text-indigo-600">tech-enabled automation</span> and workflows
                            </h2>
                            <p className="text-gray-600 text-sm mb-6">
                                Save time through automation of process from order placement to delivery confirmation
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-indigo-600 text-xs mt-1" />
                                    <span className="text-gray-700 text-xs">Print customized bulk labels</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-indigo-600 text-xs mt-1" />
                                    <span className="text-gray-700 text-xs">Automate manifest and label generation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-indigo-600 text-xs mt-1" />
                                    <span className="text-gray-700 text-xs">Apply courier rules for bulk shipping</span>
                                </li>
                            </ul>
                            <a
                                href="#"
                                className="inline-block mt-8 text-indigo-600 font-semibold text-lg hover:underline"
                            >
                                Get Started &rarr;
                            </a>
                        </div>

                        {/* Right Content */}
                        <div className="relative md:col-span-4 bg-gray-600">
                            {/* Replace the src with your desired image or component */}
                            Images
                        </div>
                    </div>
                </section>




            </Container>


            {/* Container - 5 */}

            <div>
                <div className="bg-orange-900 text-gray-50 md:h-[80vh] flex items-center p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                        {/* Left Section */}
                        <div className="text-center md:text-left">
                            <h1 className="md:text-4xl text-3xl font-bold mb-4">
                                Transform your eCommerce Shipping with RapidShyp!
                            </h1>
                            <p className="text-sm mb-6">
                                Simplify logistics, reduce costs, and delight customers with the innovative eCommerce shipping solution.
                            </p>
                            <div className="flex justify-center md:justify-start items-center gap-2">
                                <div className='md:w-[70%] flex w-full relative'>
                                    <input
                                        type="email"
                                        placeholder="Type Your Email Here"
                                        className="p-2 text-sm rounded-md text-black focus:outline-none w-full pr-14 md:pr-0  "
                                    />
                                    <button className="bg-brown-900 absolute right-0 md:hidden block text-gray-50 text-center text-xs font-bold px-4 py-3 rounded-md hover:bg-brown-800">
                                        <SiMinutemailer />
                                    </button>
                                </div>
                                <button className="bg-brown-900 hidden md:block text-gray-50 text-center text-xs font-bold w-[30%]  px-4 py-3 rounded-md hover:bg-brown-800">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="relative flex justify-center">
                            <img
                                src=""
                                alt="Person working with shipping"
                                className="rounded-md shadow-lg w-full max-w-md"
                            />
                            <div className="absolute top-2 right-2 bg-gray-50 text-purple-900 p-2 rounded-full shadow-md">

                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Container - 6 */}


            <div className="bg-gray-50 py-10 border-t">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 text-gray-700">
                    {/* Logo and Description */}
                    <div className="col-span-2">
                        <h2 className="text-2xl font-bold text-purple-900">Logo</h2>
                        <p className="mt-4 text-xs">
                            An eCommerce shipping platform offering logistics automation,
                            multi-carrier shipping, real-time tracking, and NDR management,
                            ensuring efficient order fulfillment and reduced costs.
                        </p>
                        <div className="mt-4 text-sm flex items-center space-x-4">
                            <span>Follow Us On:</span>
                            <FaInstagram className="text-purple-900" size={20} />
                            <FaLinkedin className="text-purple-900" size={20} />
                            <FaFacebook className="text-purple-900" size={20} />
                            <FaTwitter className="text-purple-900" size={20} />
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-bold text-lg">Product</h3>
                        <ul className="mt-4 space-y-2 text-xs">
                            <li>Order Management System</li>
                            <li>SmartSelect</li>
                            <li>Xperience Suite</li>
                            <li>NDR Management</li>
                        </ul>
                    </div>

                    {/* Features Links */}
                    <div>
                        <h3 className="font-bold text-lg">Features</h3>
                        <ul className="mt-4 space-y-2 text-xs">
                            <li>Dedicated Shipping Advisors</li>
                            <li>RapidCOD</li>
                            <li>Multi-Carrier Access</li>
                            <li>RTO Reduction</li>
                            <li>Shipment Security</li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="font-bold text-lg">Contact Us</h3>
                        <ul className="mt-4 space-y-2 text-xs">
                            <li>📧 support@rapidshyp.com</li>
                            <li>📧 connect@rapidshyp.com</li>
                            <li>📍 RapidShyp Head Office</li>
                            <li>
                                3rd Floor, Unitech Trade Centre,
                                <br />
                                Sushant Lok Phase-1, Sector 43
                                <br />
                                Gurgaon, Haryana - 122002
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Illustrations */}
                <div className="mt-10 relative">
                    <img
                        src=""
                        alt="Footer Illustration"
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default EntryHome;
