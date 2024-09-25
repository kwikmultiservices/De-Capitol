import React from 'react';

const ContactUsBanner: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[60vh] w-full flex justify-center items-center flex-col"
      style={{
        backgroundImage: "url('/image/c11.png')", // Replace with your image path
      }}
    >
      {/* Top-left text */}
      <div className="">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Contact US
        </h1>
      </div>

      {/* Bottom-right text */}
      <div className="">
        <p className="text-white text-xl md:text-2xl">
          Home/<span className='text-blue-800 font-extrabold'>Contact Us</span>
        </p>
      </div>
    </div>
  );
};

export default ContactUsBanner;
