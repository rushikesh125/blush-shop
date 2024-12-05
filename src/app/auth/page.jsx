'use client'
import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>
          {isLogin && (
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">
                Remember Me
              </label>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <button
          onClick={toggleAuthMode}
          className="mt-4 text-center text-blue-500 hover:underline"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
