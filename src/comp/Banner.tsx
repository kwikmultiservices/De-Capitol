import React from 'react';

const Banner: React.FC = () => {
  return (
    <div
      className="relative  bg-cover bg-right-bottom h-[60vh] w-full flex justify-center items-center flex-col "
      style={{
        backgroundImage: "url('/image/c.png')", // Replace with your image path
      }}
    >
      {/* Top-left text */}
      <div className=" text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-orange-500">
          BANKING WITHOUT BORDERS
        </h1>
      </div>

      {/* Bottom-right text */}
      <div className="text-center">
        <p className="text-white text-xl md:text-2xl">
          move money fast and securely
        </p>
      </div>
    </div>
  );
};

export default Banner;
