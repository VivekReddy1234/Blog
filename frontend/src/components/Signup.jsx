import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


const Signup = () => {
    const navigate = useNavigate();

        const [formData, setFormData] = useState({
          name: "",
          email: "",
          password: "",
        });
      
        // Handle input changes
        const handleChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        console.log(formData);
    const response = await fetch('https://blog-att9.onrender.com/user/signup',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        credentials: "include",
        body: JSON.stringify(formData),
    });
    if(response.ok) navigate('/');
   else {
    console.log(response);
    navigate('/signup'); }

                   } 
   catch(error){
    console.log('error', error);
   }
  }


  return (
    <div>
     
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-[700px] justify-center items-center">
  {/* Name Input */}
  <div className='flex text-3xl font-bold'> Sign Up Page</div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Name :-</label>
    <input 
      type="text" 
      name="name" 
      onChange={handleChange} 
      className="mt-1 w-[400px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
      placeholder="Enter your name" 
      required 
    />
  </div>

  {/* Email Input */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Email :-</label>
    <input 
      type="email" 
      name="email" 
      onChange={handleChange} 
      className="mt-1 w-[400px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
      placeholder="Enter your email" 
      required 
    />
  </div>

  {/* Password Input */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Password:-</label>
    <input 
      type="password" 
      name="password" 
      onChange={handleChange} 
      className="mt-1 w-[400px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
      placeholder="Enter your password" 
      required 
    />
  </div>

  {/* Submit Button */}
  <button 
    type="submit" 
    className="w-[150px] bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
  >
    Sign Up
  </button>
</form>

    </div>
  )
}

export default Signup
