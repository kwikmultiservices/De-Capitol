import React, { useEffect, useState } from "react";

import { FaBell, FaBars } from "react-icons/fa"; // Added FaBars for the open button
import { FaUserCircle } from "react-icons/fa"; // User fallback icon
import SideMenu from "../comp/SideMenu";
import { getTransaction, gettransger, getuser, LoanRequest } from "../Services/GetUser.service";
import { User } from "../Interface/MainInterface";
import { formatNumber } from "../Services/Utility";
import TransactionLog from "../comp/TransactionLog";
import { Transaction } from "../Services/interface";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [transaction, setTransaction] =  useState<Transaction[]>();
  const [totalAmount, setTotalTransfer] = useState(0)
  const [totalLoad, setTotalTransferLoan] = useState(0)
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const getUsers = async(userRole:"user" | "admin" | "moderator" | undefined, userID:string)=>{
    gettransger("", (res: any[]) => {
      // Assuming res is an array of objects with an 'amount' property
      const data = res;
      const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
      setTotalTransfer(totalAmount)
    });

    LoanRequest("", (res: any[]) => {
      // Assuming res is an array of objects with an 'amount' property
      const data = res;
      const totalAmount = data.reduce((sum, item) => sum + item.loanAmount, 0);
      setTotalTransferLoan(totalAmount)
    });

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
          <h1 className="text-2xl font-bold">Welcome, {user?.firstname}!</h1>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <div className="bg-blue-600 w-full p-6 text-center rounded-lg">
              <p className="font-semibold text-white mb-3">Account Balance</p>
              <h1 className="font-extrabold text-white text-[1.4rem] mb-3">
                {user?.wallet ? "$" + formatNumber(user?.wallet) : "$" + 0}
              </h1>
              <Link to="/auth/fund-account/dashboard">
              <button className="bg-white text-black p-2 rounded-md">
                Fund Account
              </button>
              </Link>
            </div>

            <div className="bg-blue-900 w-full p-6 text-center rounded-lg">
              <p className="font-semibold text-white mb-3">Last Transfer</p>
              <h1 className="font-extrabold text-white text-[1.4rem] mb-3">
                {totalAmount ? "$" + formatNumber(totalAmount) : "$" + 0}
              </h1>
             <Link to="/auth/transfer/dashboard">
             <button className="bg-white text-black p-2 rounded-md">
                Transfer fund
              </button>
             </Link>
            </div>

            <div className="bg-blue-800 w-full p-6 text-center rounded-lg">
              <p className="font-semibold text-white mb-3">Total Loan </p>
              <h1 className="font-extrabold text-white text-[1.4rem] mb-3">
                {totalLoad ? "$" + formatNumber(totalLoad) : "$" + 0}
              </h1>
              <Link to="/auth/loan/dashboard">
              <button className="bg-white text-black p-2 rounded-md">
                New Request
              </button>
              </Link>
            </div>
          </div>

          <TransactionLog log={transaction as Transaction[]} getUsers={getU}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
