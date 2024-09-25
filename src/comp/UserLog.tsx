import React, { useState, useEffect } from "react";
import { TimestampDate } from "timestamp-date";
import moment from "moment"; // Ensure you import moment for date formatting
import { User } from "../Interface/MainInterface";
import { doc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import Modal from "./Model";
import { database } from "../firebase";

interface UserProps {
    log?: User[]; // Change to optional in case it's undefined
    getUsers:()=>void
  }
  
  const UserLog: React.FC<UserProps> = ({ log = [] , getUsers}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedLogs, setPaginatedLogs] = useState<User[]>([]);
  const [isCreditDebitModalOpen, setIsCreditDebitModalOpen] = useState(false);
  const [isActiveModalOpen, setIsActiveModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [transactionAmount, setTransactionAmount] = useState<number>(0);

  const timestampDate = new TimestampDate();

  useEffect(() => {
    paginateLogs(currentPage);
  }, [log, currentPage]);

  const paginateLogs = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLogs = log.slice(startIndex, endIndex);
    setPaginatedLogs(currentLogs);
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < log.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Function to handle credit or debit action
  const handleCreditDebit = async () => {
    if (selectedUser) {
      const userDocRef = doc(database, "user", selectedUser.id);
      const newWalletAmount = selectedUser.wallet + transactionAmount;

      // Update user's wallet balance
      await updateDoc(userDocRef, {
        wallet: newWalletAmount,
      });

      // Create a new transaction for the user
      await addDoc(collection(database, "transactions"), {
        userId: selectedUser.id,
        amount: transactionAmount,
        created: serverTimestamp(),
        type:transactionAmount < 0 ? "debit" : "credit",
        custoer:`${selectedUser.firstname} ${selectedUser.lastname}`,
        balance:selectedUser.wallet
      });

      setIsCreditDebitModalOpen(false);
      getUsers()
    }
  };

  // Function to handle activation/suspension of user
  const handleActivationToggle = async () => {
    if (selectedUser) {
      const userDocRef = doc(database, "user", selectedUser.id);

      await updateDoc(userDocRef, {
        active: !selectedUser.active,
      });

      setIsActiveModalOpen(false);
      getUsers()
    }
  };


  return (
    <div>
      <div className="relative overflow-x-auto w-full mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">S/N</th>
              <th scope="col" className="px-4 py-3">Created</th>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Wallet Balance</th>
              <th scope="col" className="px-4 py-3">Account Status</th>
              <th scope="col" className="px-4 py-3">Credit/Debit</th>
              <th scope="col" className="px-4 py-3">Activate/Suspend</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-3">No logs available.</td>
              </tr>
            ) : (
              paginatedLogs.map((user, id) => (
                <tr key={user.id} className="border border-[#43424285]">
                  <td className="py-3 px-4 text-[0.8rem] md:text-sm">{(currentPage - 1) * itemsPerPage + id + 1}</td>
                  <td className="text-[0.8rem] md:text-sm">{moment(user.created).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="text-[0.8rem] md:text-sm">{user.firstname} {user.lastname}</td>
                  <td className="table-cell text-[0.8rem] md:text-sm">{user.wallet}</td>
                  <td className="text-[0.8rem] md:text-sm">{user.active ? "Active" : "Suspended"}</td>
                  <td className="text-[0.8rem] md:text-sm">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsCreditDebitModalOpen(true);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Credit/Debit
                    </button>
                  </td>
                  <td className="text-[0.8rem] md:text-sm">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsActiveModalOpen(true);
                      }}
                      className={`${
                        user.active ? "bg-red-500" : "bg-green-500"
                      } text-white px-4 py-2 rounded`}
                    >
                      {user.active ? "Suspend" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-5 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= log.length}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Credit/Debit Modal */}
      {isCreditDebitModalOpen && selectedUser && (
        <Modal onClose={() => setIsCreditDebitModalOpen(false)}>
          <h2>Credit/Debit User</h2>
          <p>Enter a negative number to debit and a positive number to credit.</p>
          <input
            type="tel"
            placeholder="0"
            onChange={(e) => setTransactionAmount(Number(e.target.value))}
            className="border p-2 rounded"
          />
          <button
            onClick={handleCreditDebit}
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
          >
            Submit
          </button>
        </Modal>
      )}

      {/* Activate/Suspend Modal */}
      {isActiveModalOpen && selectedUser && (
        <Modal onClose={() => setIsActiveModalOpen(false)}>
          <h2>{selectedUser.active ? "Suspend User" : "Activate User"}</h2>
          <p>Are you sure you want to {selectedUser.active ? "suspend" : "activate"} this user?</p>
          <button
            onClick={handleActivationToggle}
            className={`${
              selectedUser.active ? "bg-red-500" : "bg-green-500"
            } text-white px-4 py-2 mt-4 rounded`}
          >
            {selectedUser.active ? "Suspend" : "Activate"}
          </button>
        </Modal>
      )}
    </div>
  );
};

export default UserLog;
