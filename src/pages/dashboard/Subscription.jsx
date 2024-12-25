// Import necessary libraries
import { Cancel, Logout } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { FaCrown, FaUser, FaRocket } from 'react-icons/fa';
import LogOut from './LogOut';

const Subscription = () => {

const [isLogOut, setisLogOut] = useState(false);


  return (<>
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Subscription Plan</h1>
      <p className="text-gray-500 mb-6">In publishing and graphic design, Lorem ipsum is a placeholder text commonly</p>

      {/* Plans */}
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
        {/* Basic Plan */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6 w-80 text-center border-2 border-orange-300">
          <FaUser className="text-orange-500 text-3xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Basic</h2>
          <p className="text-gray-500 mb-4">Ideal to Discover Amazon Sellers market get Started with outreach</p>
          <ul className="text-gray-700 mb-6">
            <li className="mb-2">250 Leads</li>
            <li className="mb-2">Monthly: $190/month ($0.76 per lead)</li>
          </ul>
          <p className="text-3xl font-bold text-orange-500 mb-2">$1940</p>
          <p className="text-gray-500 line-through">$2280</p>
          <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Purchase</button>
        </div>

        {/* Advanced Plan */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6 w-80 text-center border-2 border-purple-500">
          <FaRocket className="text-purple-500 text-3xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Advanced</h2>
          <p className="text-gray-500 mb-4">Ideal to ramp up outreach to Amazon Seller Contacts for a single salesperson</p>
          <ul className="text-gray-700 mb-6">
            <li className="mb-2">500 Leads</li>
            <li className="mb-2">Monthly: $350/month ($0.7 per lead)</li>
          </ul>
          <p className="text-3xl font-bold text-purple-500 mb-2">$3570</p>
          <p className="text-gray-500 line-through">$4200</p>
          <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">Purchase</button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6 w-80 text-center border-2 border-teal-500">
          <FaCrown className="text-teal-500 text-3xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Premium</h2>
          <p className="text-gray-500 mb-4">Ideal for the mid-to-large sales team that wants to scale up their outreach to e-commerce Sellers</p>
          <ul className="text-gray-700 mb-6">
            <li className="mb-2">1000 Leads</li>
            <li className="mb-2">Monthly: $650/month ($0.65 per lead)</li>
          </ul>
          <p className="text-3xl font-bold text-teal-500 mb-2">$6630</p>
          <p className="text-gray-500 line-through">$7800</p>
          <button className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Purchase</button>
        </div>
      </div>

      <div className='mt-8'>
            <Button
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
              onClick={() => setisLogOut(true)}
            >
              <Logout style={{ fontSize: '2rem' }} />
              Log Out
            </Button>
    
      </div>

      {/* Features */}
      <div className="mt-12 max-w-4xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feature</h2>
        <ul className="text-gray-700 text-left space-y-2">
          <li>1. We will Deliver one Excel to your Inbox monthly.</li>
          <li>2. Receive leads matching your specific requirements.</li>
          <li>3. Leeway to choose your preferred filters from this list:</li>
          <ul className="ml-6">
            <li>- Seller Revenue</li>
            {/* Add more sub-features if needed */}
          </ul>
        </ul>
      </div>
    </div>
    
   <LogOut isopen={isLogOut} setIsOpen={setisLogOut} />
    </>
  );
};

export default Subscription;
