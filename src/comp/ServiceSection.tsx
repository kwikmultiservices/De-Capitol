import React from 'react';
import { FaUser, FaHandshake, FaLifeRing } from 'react-icons/fa';
import { MdOutlineAttachMoney } from 'react-icons/md';

const ServiceSection: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 md:px-10 py-16">
      {/* Left Section */}
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-bold text-gray-800">13k Clients base & growing.</h2>
        <p className="mt-4 text-gray-600">
          At De Capitol, we believe in banking that’s not just about numbers, but about people. 
          Since, we have been dedicated to serving our community with integrity, personalized 
          service, and innovative financial solutions.
        </p>
        <button className="mt-6 px-6 py-3 bg-gray-800 text-white font-semibold rounded-md flex items-center space-x-2">
          <span>Request a call</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 lg:mt-0 lg:pl-10">
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <FaUser className="text-2xl text-gray-700" />
          </div>
          <h3 className="font-semibold text-gray-800">Expert Advisor</h3>
          <p className="text-gray-600">
            to provide the highest level of service while helping you achieve your financial goals.
          </p>
        </div>
        {/* Card 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <MdOutlineAttachMoney className="text-2xl text-gray-700" />
          </div>
          <h3 className="font-semibold text-gray-800">Loan Facility</h3>
          <p className="text-gray-600">
            to provide the highest level of service while helping you achieve your financial goals.
          </p>
        </div>
        {/* Card 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <FaLifeRing className="text-2xl text-gray-700" />
          </div>
          <h3 className="font-semibold text-gray-800">Effective Support</h3>
          <p className="text-gray-600">
            to provide the highest level of service while helping you achieve your financial goals.
          </p>
        </div>
        {/* Card 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <FaHandshake className="text-2xl text-gray-700" />
          </div>
          <h3 className="font-semibold text-gray-800">Personalized Service</h3>
          <p className="text-gray-600">
            to provide the highest level of service while helping you achieve your financial goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
