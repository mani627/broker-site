import React, { useState } from 'react'

import { FaChevronCircleDown, FaChevronLeft, FaChevronRight, FaCircle  } from 'react-icons/fa';
import LoadingAnimation from './Loading';
import { useNavigate } from 'react-router-dom';


const SellerTable = ({ data, heading, loading , searchKey}) => {


    const navigate = useNavigate()

    // pagination --- here
 
    const rowsPerPage = 5; // Number of rows to display per page
    const [currentPage, setCurrentPage] = useState(1);
 
    const filteredData = searchKey && searchKey.toLowerCase() != 'all'
        ? data.filter((row) =>
               row.status && row.status.toString().toLowerCase().includes(searchKey.toLowerCase())
          )
        : data;
 
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
 
    const currentData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
 
    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
     return(
 
     <div className=''>
        <div className='overflow-x-auto'>

       
         <table className={`w-full   min-w-[640px] ${loading && "min-h-60"}  table-auto border-collapse border border-gray-300`}>
             <thead className="bg-gray-100">
                 <tr>
                     {heading.map((header) => (
                         <th
                             key={header}
                             className="border border-gray-300 py-3 px-6 text-left text-sm font-bold text-gray-600 uppercase"
                         >
                             {header}
                         </th>
                     ))}
                 </tr>
             </thead>
 
             <tbody className="relative" >
 
                 {loading ?
                     <div className=" absolute flex w-full items-center justify-center gap-3 top-0 bg-gray-50 bottom-0 min-h-40">
                         <LoadingAnimation size='5' type={"gif"} gifSrc={"/img/icon_img.gif"} />
                         {/* <AiOutlineLoading3Quarters className="text-gray-900 text-xl animate-spin" /> */}
                         <h4 className="italic ">Loading table Data...</h4>
                     </div>
 
                     : data.length > 0 &&
                     currentData.map(
                         (
                             {
                                 waybill,
                                 createdDate,
                                 pickupAddress,
                                 deliveryAddress,
                                 paymentMode,
                             },
                             key
                         ) => {
                             return (
                                 <tr
                                     key={key}
                                     className="hover:bg-gray-50 even:bg-gray-50"
                                 >
                                     <td onClick={()=>navigate(`${waybill}`)} className=" border-gray-200 border-y cursor-pointer py-3 px-6 text-sm">
                                         <div className="flex items-center  gap-2">
                                             <span className="text-gray-900 hover:text-blue-800 hover:underline">{waybill}</span>
                                         </div>
                                     </td>
                                     <td className="border-gray-200 border-y cursor-pointer py-3 px-6 text-sm text-gray-600 font-medium">
                                         {(() => {
                                             const formattedDate = new Date(createdDate);
                                             const options = { day: "2-digit", month: "short", year: "numeric" };
                                             const formattedDateString = formattedDate.toLocaleDateString("en-GB", options).replace(/,/g, '').replace(/\//g, ' / ');
                                             const formattedTimeString = formattedDate.toLocaleTimeString();
 
                                             return (
                                                 <>
                                                     <span>{formattedDateString}</span><br />
                                                     <span className="text-gray-500 text-xs">{formattedTimeString}</span>
                                                 </>
                                             );
                                         })()}
                                     </td>
                                     <td className=" border-gray-200 border-y cursor-pointer py-3 px-6 text-sm">
 
                                         <div className="flex gap-3 items-center">
                                             {/* Vertical Line Divider */}
                                             <div className="relative flex flex-col items-center justify-between">
                                                 <FaCircle size={10} />
                                                 <div className="h-7 border-l-2 border-dotted border-gray-500"></div> {/* Vertical dotted line */}
                                                 <FaChevronCircleDown size={10} />
 
                                             </div>
 
                                             {/* Address Section */}
                                             <div className="flex flex-col gap-3">
                                                 <div className="flex items-center gap-2">
                                                     <span className="text-gray-600 font-medium">
                                                         {pickupAddress}
                                                     </span>
                                                 </div>
                                                 <div className="flex items-center gap-2">
                                                     <span className="text-gray-600 font-medium">
                                                         {deliveryAddress}
                                                     </span>
                                                 </div>
                                             </div>
                                         </div>
 
 
                                     </td>
                                     <td className="capitalize border-gray-200 border-y cursor-pointer py-3 px-6 text-sm text-gray-600 font-medium">
 
                                         {paymentMode}
 
                                     </td>
                                 </tr>
                             );
                         }
                     )
                 }
 
             </tbody>
         </table>
         </div>
         {/* Pagination here */}
         {!loading && data.length > 0 && <div className="flex  justify-center items-center space-x-2 mt-4">
             {/* Previous Button with Icon */}
             <button
                 className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-300 transition duration-200 ease-in-out flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                 onClick={() => handlePageChange(currentPage - 1)}
                 disabled={currentPage === 1}
             >
                 <FaChevronLeft className="text-sm" />
             </button>
 
             {/* Page Info */}
             <span className="text-xs text-gray-600 font-medium">
                 {currentPage} / {totalPages}
             </span>
 
             {/* Next Button with Icon */}
             <button
                 className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-300 transition duration-200 ease-in-out flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                 onClick={() => handlePageChange(currentPage + 1)}
                 disabled={currentPage === totalPages}
             >
                 <FaChevronRight className="text-sm" />
             </button>
         </div>}
     </div>)
 }

 export default SellerTable;