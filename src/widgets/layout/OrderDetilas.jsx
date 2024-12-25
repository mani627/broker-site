import React, { useEffect, useState, useRef } from 'react';
import { AiOutlinePrinter, AiOutlineTruck } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdOutlineDeliveryDining, MdOutlineDirectionsBike, MdOutlinePayments } from 'react-icons/md';
import { FaBoxOpen, FaCheckCircle, FaShoppingBag } from 'react-icons/fa';
import { FaCircleDot, FaLocationDot, FaRegCalendarDays, FaTruckDroplet, FaTruckFast } from "react-icons/fa6";
import ProfilePic from "../../asset/ProfilePic.jpg";
import { SiWebcomponentsdotorg } from "react-icons/si";
import { BsHandbag, BsInfoCircle } from 'react-icons/bs';
import { Box, Tooltip } from '@mui/material';
import { LuPackage2 } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";
import { IoBagCheckOutline, IoBagHandleOutline, IoCopyOutline } from 'react-icons/io5';
import { PiPackageLight } from "react-icons/pi";
import { useAuth } from '@/context/authContext';
import Invoice from '@/components/Invoice';
import { useReactToPrint } from "react-to-print";
import OrderDetailsSkeleton from '@/components/OrderDetailsSkeleton';
import { OrderId } from '@/data/dummyData';
function OrderDetails() {

    const [loading, setloading] = useState(false);



    const { setpageHeading } = useAuth()



    const setTrack = (order) => {

        const model = [
            { status: "Order Received", completed: true, Icon: BsHandbag, date: null },
            { status: "Ready To Ship", completed: false, Icon: LuPackage2, date: null },
            { status: "Scheduled for Pickup", completed: false, Icon: FaTruckDroplet, date:null },
            { status: "In Transit", completed: false, Icon: FaTruckFast, date:null },
            { status: "Out of Delivery", completed: false, Icon: MdOutlineDirectionsBike, date:null },
            { status: "Delivered", completed: false, Icon: IoBagCheckOutline, date:null },
        ]

        order.map(res1 => {
            const st = Object.keys(res1)
            model.map(res2 => {
                const index = st.indexOf(res2.status);
                if (st[index] == res2.status) {
                    res2.completed = res1[st[index]];
                    res2.date = res1.date
                    return res2;
                }
            })

        })
        return model
    }

    const [orderData, setorderData] = useState(OrderId);
    const [trackerStatus, setTrackerStatus] = useState(setTrack(orderData?.data?.statusArray));


    useEffect(() => {
        setpageHeading({ title: "Order ID", backURL: "/home" })

    }, []);



    const [copyIdtext, setcopyIdtext] = useState(false);



    // Invoice ----------------------------------------------------------------

    const contentRef = useRef();
    const handlePrint = useReactToPrint({ contentRef });

    if (loading) return <OrderDetailsSkeleton />

    return (

        <div className="md:p-4 space-y-6">
            {/* Invoice */}
            <div style={{ display: "none" }}>
                <Invoice ref={contentRef} />
            </div>

            {/* Header Section */}
            <div className="flex justify-start items-center gap-4 pb-">
                <div className='bg-white shadow-sm shadow-gray-400 p-4 rounded-md'>
                    <img src={ProfilePic} alt="Profile" className='w-10 h-10 rounded-md' />
                </div>
                <div>
                    <h1 className="text-xl hover:text-gray-700 font-semibold hover:underline">{orderData?.data?.shipmentDetails?.waybillNo}</h1>
                    <h3 className="text-gray-600 text-sm">Order ID</h3>
                </div>

            </div>

            {/* SubHeader */}

            <div className='ml-auto flex gap-4'>
                <div className='bg-orange-50 shadow-sm p-1 rounded-full px-4 text-xs'>
                    <h3 className='text-orange-600 font-semibold'>Ready to ship</h3>
                </div>
                <div className='bg-gray-100 shadow-sm p-1 rounded-full px-4 gap-2 text-xs flex items-center'>
                    <FaRegCalendarDays color='gray' />
                    <h3 className='text-gray-600 font-semibold'>Ordered on :</h3>
                    {(() => {
                        const formattedDate = new Date(orderData?.data?.shipmentDetails?.orderDate);
                        const options = { day: "2-digit", month: "short", year: "numeric" };
                        return (
                            <span>{formattedDate.toLocaleDateString("en-GB", options).replace(/,/g, '').replace(/\//g, ' / ')}</span>
                        );
                    })()}
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Package Details */}
                    <div className="p-4 border bg-white/40 shadow-sm rounded-lg space-y-4">
                        <h2 className="font-semibold">Package Details</h2>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <div className="bg-gray-200 p-4 rounded">
                                    <FaBoxOpen size={30} />
                                </div>
                                <div>
                                    <h3>BAGS</h3>
                                    <h3 className="text-sm text-gray-600">{orderData?.data?.shipmentDetails?.package_details?.products_desc}</h3>
                                </div>
                            </div>
                            <h3 className="font-semibold">₹{orderData?.data?.shipmentDetails?.package_details?.total_amount}</h3>
                            <h3>{orderData?.data?.shipmentDetails?.package_details?.quantity}</h3>
                            <h3 className="font-semibold">₹{orderData?.data?.shipmentDetails?.package_details?.total_amount * orderData?.data?.shipmentDetails?.package_details?.quantity}</h3>
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="p-4 border bg-white/40 shadow-sm rounded-lg space-y-4">
                        <div className="font-semibold flex gap-3 items-center">  <FaLocationDot />Delivery Details
                            <Tooltip title="Pick Up Address from WhereHouse" arrow placement="right-start" >
                                <Box >
                                    <BsInfoCircle className="cursor-pointer" />
                                </Box>

                            </Tooltip>
                        </div>
                        <div className='relative flex flex-col gap-7'>
                            <div className="bottom-2 top-3 border-l-2 absolute -z-10 left-3 border-dotted border-gray-900"></div>
                            <div className="flex items-center space-x-4">
                                <div className='bg-white rounded-full absolute left-0 top-0'>
                                    <FaCircleDot size={24} className="text-orange-200" />
                                </div>
                                <div className='pl-7'>
                                    <h3 className="font-medium">Pickup Address</h3>
                                    <h3 className="text-gray-600 text-sm">{orderData?.data?.shipmentDetails?.delivery_details?.pickup_address?.location} , {orderData?.data?.shipmentDetails?.delivery_details?.pickup_address?.origin}</h3>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className='bg-white rounded-full absolute left-0 bottom-0'>
                                    <SiWebcomponentsdotorg size={24} className="text-green-200" />
                                </div>
                                <div className='pl-7'>
                                    <h3 className="font-medium"> Delivery Address</h3>
                                    <h3 className="text-gray-600 text-sm">
                                        {orderData?.data?.shipmentDetails?.delivery_details?.delivery_address?.name},
                                        #{orderData?.data?.shipmentDetails?.delivery_details?.delivery_address?.address},  {"  "}
                                        {orderData?.data?.shipmentDetails?.delivery_details?.delivery_address?.city},  {"  "}
                                        {orderData?.data?.shipmentDetails?.delivery_details?.delivery_address?.state},   {"  "}
                                        {orderData?.data?.shipmentDetails?.delivery_details?.delivery_address?.country}, {"  "}
                                        {orderData?.data?.shipmentDetails?.delivery_details?.delivery_address?.pin},
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details  */}

                    <div className="p-4 border shadow-sm bg-white/40 rounded-lg space-y-4">
                        <h2 className="font-semibold flex gap-3 items-center">
                            <MdOutlinePayments size={27} />
                            Payment Details
                            <Tooltip title="Payment Mode and Details" arrow placement="right-start">
                                <Box>
                                    <BsInfoCircle className="cursor-pointer" />
                                </Box>
                            </Tooltip>
                        </h2>
                        <div className="flex items-center space-x-4">
                            {/* Pay mode */}
                            <div className="flex flex-col w-full gap-3">
                                <div className="flex font-medium flex-col gap-1 my-2 justify-between">
                                    <h3>Payment Mode</h3>
                                    <h2 className="flex font-normal items-center gap-3 text-sm text-gray-700">
                                        <GrNotes /> {orderData?.data?.shipmentDetails?.payment_mode}
                                    </h2>
                                </div>
                                {/* Bill address */}
                                <div className="flex font-medium flex-col gap-1 my-2 justify-between">
                                    <h3>Billing Address</h3>
                                    <h3 className="flex font-normal text-sm text-gray-700 items-center gap-3">
                                        #1081, 14th Main Road, HSR Layout, Bangalore, Karnataka, 560102
                                    </h3>
                                </div>
                                {/* Divider */}
                                <div className='border-b w-full border-gray-300'></div>
                                <div className='w-full flex flex-col gap-5'>
                                    <div className="flex justify-between">
                                        <h3 className='font-medium'>Sub Total (A)</h3>
                                        <h3 className='font-normal text-sm text-gray-700'>1 Item (s) * 1Nos</h3>
                                        <h3 className="font-medium text-sm text-gray-700">₹4,999.00</h3>
                                    </div>
                                    <div className="flex justify-between">
                                        <h3 className='font-medium'>Total tax (B)</h3>
                                        <h3 className="font-medium text-sm text-gray-700">₹0.00</h3>
                                    </div>
                                    <div className="flex justify-between">
                                        <h3 className='font-medium'>Total Discount</h3>
                                        <h3 className='font-normal text-sm text-gray-700'>Total Discount (C)</h3>
                                        <h3 className="font-medium text-sm text-gray-700">₹0.00</h3>
                                    </div>
                                    {/* Divider */}
                                    <div className='border-b w-full border-gray-300'></div>
                                    <div className="flex justify-between">
                                        <h3 className='font-medium'>Total Amount Paid (A + B - C)</h3>
                                        <h3 className="font-medium text-sm text-gray-700">₹4,999.00</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>

                {/* Right Side */}
                <div className="space-y-6">
                    {/* Order Tracker */}
                    <div className="p-4 border rounded-lg bg-white/40 shadow-sm">
                        <h2 className="font-semibold mb-4">Order Tracker</h2>

                        <div className='flex flex-col gap-4'>
                            <div>
                                <button onClick={() => handlePrint()} className='w-full p-2 justify-center bg-white/40 items-center hover:bg-pink-50/40 flex rounded-md border border-pink-300'>
                                    <AiOutlinePrinter size={27} className="mr-2 text-pink-400" />
                                    <h3 className='text-pink-400 font-bold'>Print Lable</h3>
                                </button>

                            </div>
                            <h3 className='text-sm text-center '>Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto repellendus eligendi in itaque. ipsum dolor sit amet consectetur adipisicing elit. Corrupti, dolor!</h3>
                            <div className='flex flex-col gap-4'>
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className="font-medium text-gray-700">Order Id</h3>
                                    <div className="text-sm text-gray-600 flex items-center gap-2">{orderData?.data?.shipmentDetails?.order}
                                        <Tooltip title={copyIdtext ? 'Copied' : 'Copy text'}>
                                            <Box>
                                                <IoCopyOutline onClick={() => {
                                                    navigator.clipboard.writeText("928237");
                                                    setcopyIdtext(true);
                                                    setTimeout(() => setcopyIdtext(false), 4000)
                                                }} className='cursor-pointer hover:text-pink-600' />
                                            </Box>

                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className="font-medium text-gray-700">Package Details</h3>
                                    <div className="text-sm text-gray-600 flex items-center gap-2"> <PiPackageLight /> <span>10 x 20 x 30 cm</span></div>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className="font-medium text-gray-700">Weight</h3>
                                    <h3 className="text-sm text-gray-600">{orderData?.data?.shipmentDetails?.weight}Kg</h3>
                                </div>

                            </div>

                            {/* Connecting Line */}
                            <div className=" border border-gray-300  my-4"></div>
                        </div>

                        <ul className="space-y-6 relative">
                            {/* Connecting Line */}
                            {/* <div className="absolute left-7 top-6 bottom-6 border-l-2 border-gray-300 z-0"></div> */}

                            {/* Tracker Steps */}



                            {trackerStatus.map((step, index) => (
                                <li key={index} className="relative flex items-center space-x-4 z-10">
                                    {/* Icon with dynamic colors */}
                                    <div
                                        className={`rounded-full p-2 z-10 border ${step.completed ? " bg-pink-500 border-pink-600" : "bg-gray-200 border-gray-400"
                                            }`}
                                    >

                                        <step.Icon fontWeight={900} className={`  ${step.completed ? 'text-white' : 'text-gray-700'}`} />

                                    </div>

                                    {/* Step Information */}
                                    <div>
                                        <h3 className={`font-medium ${step.completed ? "text-gray-800" : "text-gray-500"}`}>
                                            {step.status}
                                        </h3>
                                        <h3 className="text-sm text-gray-600">

                                            {(() => {
                                                const formattedDate = new Date(step.date);
                                                const options = { day: "2-digit", month: "short", year: "numeric" };
                                                return (
                                                    <span>{step.date != null && formattedDate.toLocaleDateString("en-GB", options).replace(/,/g, '').replace(/\//g, ' / ')}</span>
                                                );
                                            })()}
                                        </h3>
                                    </div>

                                    {/* Dynamic Line Connector */}
                                    {index < trackerStatus.length - 1 && (
                                        <div
                                            className={`absolute left-0 -z-20 top-8 h-full w-[1.5px] ${step.completed ? "bg-pink-600" : "bg-gray-300"
                                                }`}
                                        ></div>
                                    )}
                                </li>
                            ))}





                        </ul>

                        <div className=" border border-gray-300  my-4"></div>


                        <div className="flex items-center justify-between gap-2 px-3">
                            <div className="font-medium text-gray-700 flex items-center gap-2"> Chargeable Weight
                                <Tooltip title="This is Chargeable Weight" arrow placement="right-start" >
                                    <Box >
                                        <BsInfoCircle className="cursor-pointer" />
                                    </Box>

                                </Tooltip>
                            </div>
                            <h3 className="text-sm text-gray-600">{orderData?.data?.shipmentDetails?.weight}Kg</h3>
                        </div>
                    </div>


                </div>
            </div>

            {/* Print Label */}
            {/* <div className="flex justify-center">
                <button className="flex items-center bg-blue-500 text-white px-6 py-3 rounded">
                    <AiOutlinePrinter size={20} className="mr-2" />
                    Print Label Again
                </button>
            </div> */}
        </div>
    );
}

export default OrderDetails;


