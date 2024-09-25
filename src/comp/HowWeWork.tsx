import React from 'react';
import { FaWrench, FaRegLightbulb, FaUserTie } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';

const HowWeWork: React.FC = () => {
  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          How we work
        </h2>
        <p className="text-center text-gray-600 mb-12">
          At De Capitol Bank, we believe in a client-centric approach that places your needs at the heart of everything we do. Our process involves:
        </p>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="flex flex-col justify-center items-center">
            <img
              src="/image/c10.png"
              alt="Client meeting"
              className="w-full h-auto "
            />
            <div className="bg-gray-800 text-white p-6">
              <span className="text-sm">
                De Capitol Bank is dedicated to being more than just a financial institution. We are your partner in achieving financial success and stability. Our commitment to exceptional service, personalized solutions, and ethical practices sets us apart and drives us to continually strive for greatness. Thank you for choosing De Capitol Bank. We are honored to be part of your financial journey and look forward to helping you achieve your financial goals.
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-8">
            {/* Each Step */}
            <div className="flex items-start space-x-4">
              <FaRegLightbulb className="text-blue-600 text-4xl" />
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Understanding Your Needs
                </h3>
                <p className="text-gray-600">
                  We start by listening to you and understanding your financial goals, challenges, and aspirations. This helps us tailor our services to fit your specific requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MdSupportAgent className="text-blue-600 text-4xl" />
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Customized Solutions
                </h3>
                <p className="text-gray-600">
                  Based on our understanding, we design and offer customized financial solutions that align with your objectives.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaUserTie className="text-blue-600 text-4xl" />
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Expert Guidance
                </h3>
                <p className="text-gray-600">
                  Our team of financial experts brings a wealth of knowledge and experience to the table. We offer insightful advice and strategic guidance to help you make informed decisions and achieve your financial goals.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaWrench className="text-blue-600 text-4xl" />
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Expert Guidance
                </h3>
                <p className="text-gray-600">
                  Our team of financial experts brings a wealth of knowledge and experience to the table. We offer insightful advice and strategic guidance to help you make informed decisions and achieve your financial goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
