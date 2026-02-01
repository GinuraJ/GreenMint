import React from "react";
import "./SignUpForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

import { API_BASE_URL } from "../../config";


export const SignUpForm = () =>{

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);

        if(formData.password === formData.confirmPassword){
            try{
                const response = await axios.post(
                    `${API_BASE_URL}/api/users`,
                    {
                        firstName: formData.firstName,
                        secondName: formData.lastName,
                        email: formData.email,
                        userType: "L", 
                        password: formData.password,
                    }
                );
                console.log("User created");
                toast.success("User created successfully 🎉");
                // navigate("/");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }catch(err){
                console.error("TEST error "+err);
            }
        }else{
            toast.error("Failed to create user");
            console.log("Confirm password not match");
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <Toaster position="top-center" reverseOrder={false} />
            <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-6"
            >

                <div className="sm:col-span-2 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
                    <p className="text-gray-600 mt-2">Create your account to get started with GreenMint</p>
                </div>
            {/* First Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                        </label>
                        <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                        />
                    </div>
        
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                        </label>
                        <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                        />
                    </div>
        
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                        </label>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                        />
                    </div>
                </div>
    
            {/* Second Column */}
                <div className="space-y-4">        
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                        </label>
                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                        />
                    </div>
        
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                        </label>
                        <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                        />
                    </div>
        
                    <div className="mt-4 sm:mt-6">
                        {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label> */}
                        <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition mt-6"
                        >
                        Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}