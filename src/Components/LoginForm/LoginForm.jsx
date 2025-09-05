import React from "react";
import toast, { Toaster } from 'react-hot-toast';

import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    try{
      const response = await axios.get(`http://localhost:8080/api/users/email/${formData.email}`);

      console.log("response Data : "+ response.data);
      const user = response.data.password;

      if(user === formData.password){
        navigate("/dashboard");
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
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
