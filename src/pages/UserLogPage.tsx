import React, { useEffect, useState } from "react";

import { FaBell, FaBars } from "react-icons/fa"; // Added FaBars for the open button
import { FaUserCircle } from "react-icons/fa"; // User fallback icon
import SideMenu from "../comp/SideMenu";
import { getuser, getusers } from "../Services/GetUser.service";
import { User } from "../Interface/MainInterface";
import { formatNumber } from "../Services/Utility";
import TransactionLog from "../comp/TransactionLog";
import UserLog from "../comp/UserLog";

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();
  const [users, setusers] = useState<User[]>()
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const getUsers = async()=>{
    await getusers("",(res:User[])=>{
        setusers(res)
    })
  }

  useEffect(() => {
    getUsers()
    getuser("", (res: User[]) => {
      const data = res[0];
      setUser(data);
    });
  
    checkIsMobile(); // Check initially when the component loads
    window.addEventListener("resize", checkIsMobile); // Listen for screen resize

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const getUserInitial = () => {
    return user?.firstname.charAt(0).toUpperCase();
  };

  return (
    <div className="h-screen flex">
      {/* Side Menu */}
      {isMenuOpen && (
        <SideMenu
          user={user as User}
          toggleMenu={toggleMenu}
          isMobile={isMobile}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isMenuOpen && !isMobile ? "lg:ml-64" : "ml-0"
        } transition-all duration-300`}
      >
        <nav className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white shadow-md">
          <div className="flex items-center">
            {!isMenuOpen && (
              <FaBars
                className="text-lg cursor-pointer mr-4"
                onClick={toggleMenu}
              />
            )}
            <img src="/image/logo.png" alt="Logo" className="h-20 " />
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-lg cursor-pointer" />
            {user?.image ? (
              <img
                src={user?.image}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                {getUserInitial()}
              </div>
            )}
          </div>
        </nav>

        {/* Dashboard content */}
        <div className="p-4 h-[85vh] overflow-y-scroll scrollbar-hide">
          <h1 className="text-2xl font-bold">User Log</h1>

    
          <UserLog log={users as User[]} getUsers={getUsers}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
