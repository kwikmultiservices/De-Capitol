// src/components/Login.tsx
import React, { useState } from 'react';

import { getusers } from '../Services/GetUser.service';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Navbar from '../comp/Navbar';
import { User } from '../Interface/MainInterface';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const login = async (email: string, password: string) => {
    if (email === '' || password === '') {
      window.alert('Email and password are required');
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log(user)
      // You can store the user's token or any other info as needed
      window.localStorage.setItem('token',  user.uid);
      toast.success('Login successful');

      // Redirect to the dashboard
      window.location.href = '/auth/dashboard';
    } catch (error: any) {
      // Handle authentication errors
      const errorMessage = error.message;
      toast.error(`Login failed: ${errorMessage}`);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
   <>
    <Navbar/>
    <div
      className="min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: "url('/image/c13.jpg')", // Replace with your image path
      }}
    >
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-center text-orange-700 text-2xl font-bold mb-4">Login</h2>
{/* 
        {message && (
          <Alert variant="info" className="mb-4">
            {message}
          </Alert>
        )} */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? 'Please Wait...' : 'Login'}
          </button>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </div>
    
   </>
  );
};

export default Login;
