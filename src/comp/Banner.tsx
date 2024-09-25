import React from 'react';

const Banner: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[60vh] w-full flex justify-center items-center flex-col lg:block"
      style={{
        backgroundImage: "url('/image/c.png')", // Replace with your image path
      }}
    >
      {/* Top-left text */}
      <div className="lg:absolute top-4 left-4 md:top-14 md:left-8">
        <h1 className="text-3xl md:text-5xl font-bold text-orange-500">
          BANKING WITHOUT BORDERS
        </h1>
      </div>

      {/* Bottom-right text */}
      <div className="lg:absolute bottom-4 right-4 md:bottom-8 md:right-8">
        <p className="text-white text-xl md:text-2xl">
          move money fast and securely
        </p>
      </div>
    </div>
  );
};

export default Banner;
