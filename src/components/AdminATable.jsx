import React, { useState } from 'react';
import {
    FaChevronLeft,
    FaChevronRight,
} from 'react-icons/fa';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import LoadingAnimation from './Loading';

const AdminTable = ({ data, setChanges, heading, loading, searchKey }) => {
    // Pagination Logic
    const rowsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = searchKey
        ? data.filter((row) =>
              row.sellerName && row.sellerName.toString().toLowerCase().includes(searchKey.toLowerCase())
          )
        : data;

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const currentData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Dialog State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    // Open Dialog
    const handleDialogOpen = (row, event) => {
        event.stopPropagation();
        setSelectedRow(row);
        setDialogOpen(true);
    };

    // Confirm Action (Toggle Active/Deactive)
    const handleConfirmAction = () => {
        if (selectedRow) {
            const updatedData = data.map((item) =>
                item.orderId === selectedRow.orderId
                    ? {
                          ...item,
                          Action_Status: item.Action_Status === 'active' ? 'deactive' : 'active',
                      }
                    : item
            );
            setChanges({ tables: updatedData, error: null, loading: false });
        }
        setDialogOpen(false);
    };

    const LoadingUI = () => (
        <div className="absolute flex w-full items-center justify-center gap-3 top-0 bg-gray-50 bottom-0 min-h-40">
            <LoadingAnimation size="5" type={'gif'} gifSrc={'/img/icon_img.gif'} />
            <h4 className={`animate-pulse italic transition-opacity duration-500 ${'opacity-100'}`}>
                Loading table Data...
            </h4>
        </div>
    );

    return (
        <div>
         <div className='overflow-x-auto'>
         <table
                className={`w-full min-w-[640px] ${
                    loading && 'min-h-60'
                } table-auto border-collapse border ${
                    searchKey ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
            >
                <thead className="bg-gray-100">
                    <tr className="text-center">
                        {heading.map((header) => (
                            <th
                                key={header}
                                className="border text-center border-gray-300 py-3 px-6 text-sm font-bold text-gray-600 uppercase"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="relative">
                    {loading ? (
                        <LoadingUI />
                    ) : filteredData.length > 0 ? (
                        currentData.map((row, key) => {
                            const {
                                sellerName,
                                Wallet_Amount,
                                Subscription_Plan,
                                Action_Status,
                            } = row;
                            return (
                                <tr
                                    onClick={() => console.log('Row clicked:', row)}
                                    key={key}
                                    className="hover:bg-gray-100 transition-colors duration-400 cursor-pointer text-center even:bg-gray-50"
                                >
                                    {/* Seller Name */}
                                    <td className="border-gray-200 border-y py-3 px-6 text-sm text-gray-600">
                                        {sellerName}
                                    </td>

                                    {/* Wallet Amount */}
                                    <td
                                        className={`border-gray-200 border-y py-3 px-6 text-sm font-semibold ${
                                            Wallet_Amount < 500
                                                ? 'text-red-500'
                                                : 'text-green-500'
                                        }`}
                                    >
                                        ₹ {Wallet_Amount}
                                    </td>

                                    {/* Subscription Plan */}
                                    <td className="border-gray-200 border-y py-3 px-6 text-sm text-gray-600">
                                        {Subscription_Plan || 'Basic Plan'}
                                    </td>

                                    {/* Action */}
                                    <td className="border-gray-200 border-y py-3 px-6 text-sm">
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                variant="text"
                                                size="small"
                                                style={{
                                                    color:
                                                        Action_Status === 'active'
                                                            ? 'green'
                                                            : '#ef4444',
                                                }}
                                                onClick={(e) => handleDialogOpen(row, e)}
                                            >
                                                {Action_Status === 'active'
                                                    ? 'Active'
                                                    : 'Deactive'}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={heading.length}
                                className="text-center py-6 text-gray-800"
                            >
                                🤷‍♂️ No matching records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
         </div>

            {/* Pagination */}
            {!loading && filteredData.length > 0 && (
                <div className="flex justify-center items-center space-x-2 mt-4">
                    <button
                        className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-300 transition duration-200 ease-in-out flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <FaChevronLeft className="text-sm" />
                    </button>
                    <span className="text-xs text-gray-600 font-medium">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-300 transition duration-200 ease-in-out flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <FaChevronRight className="text-sm" />
                    </button>
                </div>
            )}

            {/* Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="toggle-dialog-title"
            >
                <DialogTitle id="toggle-dialog-title">
                    Confirm Action
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to{' '}
                        {selectedRow?.Action_Status === 'active'
                            ? 'deactivate'
                            : 'activate'}{' '}
                        this account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={() => setDialogOpen(false)} sx={{color:"black"}}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmAction} sx={{color:selectedRow?.Action_Status === 'active'? "red" :"green" }} >
                    {selectedRow?.Action_Status === 'active'
                            ? 'deactivate'
                            : 'activate'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminTable;
