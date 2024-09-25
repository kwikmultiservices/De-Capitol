import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-10">
      {/* Newsletter Section */}
      <div className="container px-2 md:px-8 text-start flex justify-between mb-10 py-4 flex-wrap">
        <div className="">
        <h2 className="text-2xl font-bold">Our Newsletter.</h2>
        <p className="text-gray-500 mb-4">Get instant news by subscribing to our daily newsletter</p>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="border border-gray-300 rounded-full px-4 py-2 w-auto md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>

      <hr className="border-t border-gray-200 mb-10" />

      {/* Contact Information & Links Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo and Contact Info */}
        <div className="flex flex-col justify-center md:flex-row gap-4 items-start md:items-start">
          <div className="">
          <img
            src="/image/logo.png" // Replace with actual logo URL
            alt="De Capitol Logo"
            className=""
          />
          </div>
          <div className=" flex justify-center flex-col w-full">
          <p className="font-semibold pb-3">Address:</p>
          <p>contact@decapitol.co</p>
          <p className='pb-3'>info@decapitol.co</p>
          <p className="mt-2 pb-3">USA: +1 973-750-8629</p>
          <p className='pb-3'>UK: +44 7879879610</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <ul className="">
            <li><a href="#" className="hover:underline">Home</a></li>
            <br />
            <li><a href="#" className="hover:underline">Who We Are</a></li>
            <br />
            <li><a href="#" className="hover:underline">What We Do</a></li>
            <br />
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
          <ul>
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <br />
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <br />
            <li><a href="#" className="hover:underline">YouTube</a></li>
            <br />
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
          </ul>
        </div>

        {/* Privacy Links */}
        <div className="grid grid-cols-1 gap-4 text-sm">
          <ul>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <br />
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <br />
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <br />
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        <p>&copy;2008 De Capitol. All rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
