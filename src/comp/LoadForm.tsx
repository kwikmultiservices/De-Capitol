import React, { useState } from 'react';
// Import Firestore configuration
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore methods
import { User } from '../Interface/MainInterface';
import { database } from '../firebase';
import { getRandomString } from '../Services/GetRandomNumber';
import { useNavigate } from 'react-router-dom';
 interface props {
  user:User
 }
const LoanRequestForm: React.FC<props> = ({user}) => {
  const [fullName, setFullName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState(0);
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loanPurpose, setLoanPurpose] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // For form submission state
  const [success, setSuccess] = useState<boolean | null>(null); // To track form submission success or failure
  const navigate =  useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const id = getRandomString(34,"1234567890qqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFHJKLZXCVBNM")
    const formData = {
      fullName,
      address,
      loanAmount,
      phone,
      email,
      loanPurpose,
      id:id,
      userRole:user.permission,
      createdAt: serverTimestamp(),
      status: "Pending",
      closed: false,
    };
  
    try {
      // Use email or phone as the document ID to ensure uniqueness
      const docRef = doc(database, 'loanRequests', id); // or use `phone` if preferred
      
      // Set the document data (will create or update the document)
      await setDoc(docRef, formData);
  
      setSuccess(true); // Show success message
    } catch (error) {
      console.error('Error saving data:', error);
      setSuccess(false); // Show error message
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

 
  const handleViewHistory = () => {
    const token = window.localStorage.getItem("token")
    navigate(`/loan-history/${token}`);
  };

  return (
   <>
    {user?.permission === "admin" &&   <button
        onClick={handleViewHistory}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        View Loan History
      </button>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Loan Request</h1>


      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Residential Address:</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Loan Amount:</label>
        <input
          type="tel"
          id="loanAmount"
          placeholder='0'
          onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="loanPurpose" className="block text-sm font-medium text-gray-700">Purpose of Loan:</label>
        <textarea
          id="loanPurpose"
          value={loanPurpose}
          onChange={(e) => setLoanPurpose(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      {success === true && (
        <div className="mb-4 text-green-600">Your request has been submitted successfully!</div>
      )}
      {success === false && (
        <div className="mb-4 text-red-600">There was an error submitting your request. Please try again.</div>
      )}
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
    </>
   
  );
};

export default LoanRequestForm;
