import React, { useState } from 'react';
import {collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database } from '../firebase';
import { getRandomString } from '../Services/GetRandomNumber';
interface props {
  hidImage4?:boolean
}

const ContactUs: React.FC<props> = ({hidImage4}) => {
  // State variables to capture form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("1234")
    setLoading(true);
  
    try {
      // Generate a new document reference with Firestore's auto-generated ID
      
      const user = {
        id: getRandomString(35, '1234567890qwertyuiopasdfhjklzxcvbnmQWERTYUIOPASDFHJKLZXCVBNM'),
        isRead:false,
        name: name,
        email: email,
        subject: subject,
        message: message,
        created: serverTimestamp(),
      };

      const docRef = doc(collection(database, 'contactUs'), user.id);
      await setDoc(docRef, user);
      setSuccess(true)
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error writing document: ", error);
      setSuccess(false)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          We Will Love To Hear From You
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Image */}
       {!hidImage4 &&    <div className="flex justify-center items-center">
            <img
              src="/image/c12.png"
              alt="Business man with calculator and money"
              className="w-full h-auto rounded-lg"
            />
          </div>}

          {/* Right Section - Contact Form */}
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Leave us a message
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Support">Support</option>
                  <option value="Support">Loan</option>
                  <option value="Support">Account Funding</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              <div className="mb-4">
                <textarea
                  placeholder="Send a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 border border-gray-300 rounded-lg p-2"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Sending..." : "Contact Us"}
              </button>

              {success && <p className="text-green-500 mt-4">Message sent successfully!</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
