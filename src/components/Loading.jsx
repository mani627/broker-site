import React from 'react';

function LoadingAnimation({ size = 'md', type = 'spinner', gifSrc }) {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  if (type === 'gif') {
    return (
      <img
        src={gifSrc || '/img/icon_img.gif'} // Use provided src or default GIF
        alt="Loading..."
        className={`${sizeMap[size]} bg-blue-gray-300 object-contain flex justify-center`}
      />
    );
  }

  return (
    <div className="relative">
      {/* Main circle */}
      <div className={`${sizeMap[size]} border-4 border-blue-100 rounded-full`} />
      {/* Spinning arc */}
      <div className={`absolute top-0 left-0 ${sizeMap[size]}`}>
        <div
          className="w-full h-full border-4 border-blue-600 rounded-full animate-spin"
          style={{
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
          }}
        />
      </div>
      {/* Inner pulsing circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className={`${size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'} bg-blue-600 rounded-full animate-pulse`} />
      </div>
    </div>
  );
}

export default LoadingAnimation;
