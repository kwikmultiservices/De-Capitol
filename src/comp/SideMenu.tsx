import React from "react";
import { FaTimes } from "react-icons/fa";
import { User } from "../Interface/MainInterface";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
interface SideMenuProps {
  user: User;
  toggleMenu: () => void;
  isMobile: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ user, toggleMenu, isMobile }) => {
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem("token"); // Remove token from local storage
    window.location.href = "/login"; // Redirect to the login page
  };
  return (
    <div
      className={`${
        isMobile ? "absolute z-50" : "fixed"
      } w-64 bg-gray-800 text-white h-full top-0 left-0 shadow-lg transition-all duration-300 z-50`}
    >
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Welcome </h2>
        <FaTimes className="cursor-pointer text-lg" onClick={toggleMenu} />
      </div>
      <ul className="mt-10 pb-4">
       <Link to="/auth/dashboard">
       <li className="px-4 py-4 hover:bg-gray-700 cursor-pointer">
          Dashboard
        </li>
       </Link>
       {user?.permission ==="admin" &&  <Link to="/auth/User/dashboard">
        <li className="px-4 py-4 hover:bg-gray-700 cursor-pointer">User</li>
        </Link>}
       
        
        <Link to="/auth/transaction/dashboard">
        <li className="px-4 py-4 hover:bg-gray-700 cursor-pointer">
          Transactions
        </li>
        </Link>
        <Link to="/auth/transfer/dashboard">
        <li className="px-4 py-4 hover:bg-gray-700 cursor-pointer">Transfer</li>
        </Link>

        <Link to="/auth/fund-account/dashboard">
        <li className="px-4 py-4 hover:bg-gray-700 cursor-pointer">
          Fund Account
        </li>
        </Link>
       
      
        <Link to="/auth/loan/dashboard">
        <li className="px-4 py-4 hover:bg-gray-700 cursor-pointer">
          Loan Request
        </li>
        </Link>
       <Link to="/auth/account-setting/dashboard">
       <li className="px-4 py-4 hover:bg-gray-700 cursor-pointer">Settings</li>
       </Link>
        <Link to="/auth/account-support/dashboard">
        <li className="px-4 py-4 hover:bg-gray-700 cursor-pointer">Support</li>
        </Link>
        
        <li className="px-4 py-4 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>Logout</li>

      </ul>
    </div>
  );
};

export default SideMenu;
