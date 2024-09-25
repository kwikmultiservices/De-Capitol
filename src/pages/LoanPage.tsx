import React, { useEffect, useState } from "react";

import { FaBell, FaBars } from "react-icons/fa"; // Added FaBars for the open button
import { FaUserCircle } from "react-icons/fa"; // User fallback icon
import SideMenu from "../comp/SideMenu";
import { getTransaction, getuser } from "../Services/GetUser.service";
import { User } from "../Interface/MainInterface";
import { formatNumber } from "../Services/Utility";
import TransactionLog from "../comp/TransactionLog";
import { Transaction } from "../Services/interface";
import TransferForm from "../comp/TransferDoc";
import LoanPage from "./Transfer.tsx";
import LoanRequestForm from "../comp/LoadForm";

const Transfer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [transaction, setTransaction] =  useState<Transaction[]>();


  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const getUsers = async(userRole:"user" | "admin" | "moderator" | undefined, userID:string)=>{
   
    getTransaction("",(res:Transaction[])=>{
      let data = res
        if(userRole !== "admin"){
          data = res.filter((e)=>e.userId === userID)
        }
        setTransaction(data)
    })
  }
  const getU =async ()=>{
    getuser("", async (res: User[]) => {
      const data = res[0];
      await getUsers(data?.permission, data.id)
      setUser(data);
    });
  }

  useEffect(() => {
    getU()
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
         <LoanRequestForm user={user as User}/>
        </div>
      </div>
    </div>
  );
};

export default Transfer;