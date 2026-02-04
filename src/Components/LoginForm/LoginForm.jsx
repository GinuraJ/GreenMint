import React from "react";
import toast, { Toaster } from 'react-hot-toast';

import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    setIsLoading(true); 

    try{
      const response = await axios.get(`${API_BASE_URL}/api/users/email/${formData.email}`);

      console.log("response Data : "+ response.data);
      const user = response.data.password;

      if(user === formData.password){
        navigate("/home");
      }else{
        toast.error("Invalid credentials");
        console.log("Wrong password")
      }
    }catch(err){
      console.error("TEST error "+err);
      if (err.response) {
        const { code, message } = err.response.data;

        if(code == "0404"){
          toast.error("Email not registed with us");
        }
        console.log("Code:", code);
        console.log("Message:", message);
      } else {
        console.error("Unexpected error:", err.message);
      }
    }finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="wrapperLoging rounded-xl bg-transparent">
    <Toaster position="top-center" reverseOrder={false} />

      <div className="p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button> */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg font-medium transition
              ${isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"}
            `}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Logging in…
              </div>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Sign up
            </Link>
        </p>
      </div>
    </div>
  );
};
