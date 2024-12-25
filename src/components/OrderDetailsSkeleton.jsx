import React from 'react';
import { Skeleton, Box } from '@mui/material';
import { FaBoxOpen, FaLocationDot, FaCircleDot } from "react-icons/fa6";
import { SiWebcomponentsdotorg } from "react-icons/si";
import { MdOutlinePayments } from 'react-icons/md';
import { PiPackageLight } from "react-icons/pi";

function OrderDetailsSkeleton() {
    return (
        <div className="md:p-4 space-y-6">
            {/* Header Section */}
            <div className="flex justify-start items-center gap-4 pb-6">
                <Skeleton variant="circular" width={40} height={40} />
                <div>
                    <Skeleton variant="text" width={120} height={30} />
                    <Skeleton variant="text" width={80} height={20} />
                </div>
            </div>

            {/* SubHeader */}
            <div className='ml-auto flex gap-4'>
                <Skeleton variant="rectangular" width={120} height={30} />
                <Skeleton variant="rectangular" width={200} height={30} />
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Package Details */}
                    <div className="p-4 border bg-white/40 shadow-sm rounded-lg space-y-4">
                        <h2 className="font-semibold">
                            <Skeleton variant="text" width={150} height={30} />
                        </h2>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <Skeleton variant="circular" width={40} height={40} />
                                <div>
                                    <Skeleton variant="text" width={80} height={20} />
                                    <Skeleton variant="text" width={100} height={20} />
                                </div>
                            </div>
                            <Skeleton variant="text" width={80} height={20} />
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="p-4 border bg-white/40 shadow-sm rounded-lg space-y-4">
                        <div className="font-semibold flex gap-3 items-center">
                          
                            <Skeleton variant="text" width={150} height={30} />
                        </div>
                        <div className='relative flex flex-col gap-7'>
                            <div className="flex items-center space-x-4">
                                <Skeleton variant="circular" width={24} height={24} />
                                <div className='pl-7'>
                                    <Skeleton variant="text" width={150} height={20} />
                                    <Skeleton variant="text" width={250} height={20} />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Skeleton variant="circular" width={24} height={24} />
                                <div className='pl-7'>
                                    <Skeleton variant="text" width={150} height={20} />
                                    <Skeleton variant="text" width={250} height={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="p-4 border shadow-sm bg-white/40 rounded-lg space-y-4">
                        <h2 className="font-semibold flex gap-3 items-center">
                           
                            <Skeleton variant="text" width={150} height={30} />
                        </h2>
                        <div className="flex items-center space-x-4">
                            <Skeleton variant="rectangular" width={200} height={100} />
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="space-y-6">
                    {/* Order Tracker */}
                    <div className="p-4 border rounded-lg bg-white/40 shadow-sm">
                        <h2 className="font-semibold mb-4">
                            <Skeleton variant="text" width={150} height={30} />
                        </h2>

                        <div className="flex flex-col gap-4">
                            <Skeleton variant="rectangular" width="100%" height={50} />
                            <Skeleton variant="text" width="100%" height={20} />
                            <div className="flex flex-col gap-4">
                                <Skeleton variant="text" width="100%" height={20} />
                                <Skeleton variant="text" width="100%" height={20} />
                            </div>
                            <div className=" border border-gray-300 my-4"></div>
                        </div>

                        <ul className="space-y-6 relative">
                            <div className="absolute left-7 top-6 bottom-6 border-l-2 border-gray-300 z-0"></div>
                            {/* Tracker Steps */}
                            {Array(6).fill().map((_, index) => (
                                <li key={index} className="relative flex items-center space-x-4 z-10">
                                    <div
                                        className={`rounded-full p-2 z-10 border bg-gray-200`}
                                    >
                                        <Skeleton variant="circular" width={30} height={30} />
                                    </div>

                                    <div>
                                        <Skeleton variant="text" width={200} height={20} />
                                        <Skeleton variant="text" width={100} height={20} />
                                    </div>

                                    {index < 5 && (
                                        <div
                                            className={`absolute left-0 -z-20 top-8 h-full w-[1.5px] bg-gray-300`}
                                        ></div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="border border-gray-300 my-4"></div>

                        <div className="flex items-center justify-between gap-2 px-3">
                            <Skeleton variant="text" width={150} height={20} />
                            <Skeleton variant="text" width={80} height={20} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsSkeleton;
