import React from 'react';
import LoadingAnimation from './Loading';


function LoadingPopup({ isLoading, size = 'md', type = 'spinner', gifSrc }) {
  if (!isLoading) return null; // Render nothing if not loading

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-4 bg-white rounded-md shadow-lg">
        <LoadingAnimation size={size} type={type} gifSrc={gifSrc} />
        <p className="mt-2 text-center text-gray-700">Loading</p>
      </div>
    </div>
  );
}

export default LoadingPopup;
