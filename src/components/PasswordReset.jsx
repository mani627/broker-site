// import React, { useState } from 'react';
// import { Eye, EyeOff, Lock } from 'lucide-react';

// export function PasswordResetForm({ onSubmit, isLoading }) {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     if (password.length < 8) {
//       setError('Password must be at least 8 characters long');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     onSubmit({ password, confirmPassword });
//   };

//   return (
//     <div className="w-full">
//       <div className="text-center mb-6">
//         <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//           <Lock className="w-6 h-6 text-blue-600" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
//         <p className="text-gray-600">
//           Please enter your new password
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="space-y-4">
//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
//               placeholder="New password"
//               disabled={isLoading}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
//               placeholder="Confirm new password"
//               disabled={isLoading}
//             />
//           </div>
//         </div>

//         {error && (
//           <p className="text-red-500 text-sm">{error}</p>
//         )}

//         <button
//           type="submit"
//           disabled={isLoading || !password || !confirmPassword}
//           className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium 
//                    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                    disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//         >
//           {isLoading ? 'Resetting Password...' : 'Reset Password'}
//         </button>
//       </form>
//     </div>
//   );
// }
import React from 'react';
import { Lock } from 'lucide-react';
import { usePasswordReset } from '@/customHook/usePasswordreset';


export function PasswordResetForm({ onSubmit, isLoading }) {
  const {
    password,
    confirmPassword,
    showPassword,
    error,
    handlePasswordChange,
    handleConfirmPasswordChange,
    toggleShowPassword,
    handleSubmit
  } = usePasswordReset(onSubmit);

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
        <p className="text-gray-600">
          Please enter your new password
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="New password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="Confirm new password"
            disabled={isLoading}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading || !password || !confirmPassword}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium 
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
}
