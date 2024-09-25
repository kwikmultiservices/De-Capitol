import React from 'react';

const WhoWeAreBanner: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[60vh] w-full flex justify-center items-center flex-col"
      style={{
        backgroundImage: "url('/image/c9.png')", // Replace with your image path
      }}
    >
      {/* Top-left text */}
      <div className="">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          BANKING WITHOUT BORDERS
        </h1>
      </div>

      {/* Bottom-right text */}
      <div className="">
        <p className="text-white text-xl md:text-2xl">
          move money fast and securely
        </p>
      </div>
    </div>
  );
};

export default WhoWeAreBanner;
