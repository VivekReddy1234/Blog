import { useState } from "react";
import React from 'react';
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
    const navigate= useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [user,setUser]= useState(null);


   useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch("https://blog-att9.onrender.com/blog/", {
              method: "GET",
              credentials: "include", // Ensure cookies are sent with the request
            });
    
            const data = await response.json(); // Properly parse the JSON
            setUser(data.user); // Set user state
       
          } catch (error) {
            console.log("Error fetching user:", error);
          }
        };
    
        fetchUser(); // Call the function
      }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData();
data.append("title", formData.title);
data.append("content", formData.content);
data.append("image", formData.image); // ✅ File is properly attached

    console.log("Form Submitted:", formData);
   
    try{
    const response = await fetch('http://localhost:8000/blog/upload',{
        method: "POST",
        body: data,
        credentials : "include",

     }); 
     if(response.ok){
        window.alert("upload Successfull");
        navigate('/');
        
     }
     else { window.alert("Upload Failed"); navigate('/addBlog'); }

                }
    catch(err){
        console.log("error" ,err);
    }


    // Handle form submission logic here (e.g., send to backend)
  };

  return (
    <>
      <Navbar detail={user}/>
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Blog Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Blog Content */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            rows="6"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>
          {/* Image Upload */}
          <div>
          <label className="block text-gray-700 font-semibold mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-2 py-1 border rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Blog
        </button>
      </form>
    </div>
    </>
  );
};

export default Blog;
