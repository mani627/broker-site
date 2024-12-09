import React from 'react';

export function SubmitButton({ onClick, disabled, isLoading }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
            {isLoading ? 'Sending Code...' : 'Send Verification Code'}
        </button>
    );
}
