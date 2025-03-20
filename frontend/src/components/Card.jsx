import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const BlogCard = () => {
  const {id} = useParams();
      const[element,setData] = useState(null);
      const [blog,setBlog] = useState([]);
     // calll the get function so that it checks for whether the user is logged in or not if logged in gives details;
     useEffect(() => {
       const fetchUser = async () => {
         try {
           const response = await fetch("http://localhost:8000/", {
             method: "GET",
             credentials: "include", // Ensure cookies are sent with the request
           });
   
           const data = await response.json(); // Properly parse the JSON
           // Set user state
           setBlog(data.blog);
      
         } catch (error) {
           console.log("Error fetching user:", error);
         }
       };
   
       fetchUser(); 
       // Call the function
      
     }, []); 


     useEffect(()=>{
       const response = blog.find((b) => b._id === id || b._id === Number(id)); // ✅ Handles string/number mismatch
      setData(response || null); 
      
     },[blog,id])

    
      
     if (!element) return <h2 className="text-center text-red-500">Loading...</h2>;


  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl">
      {/* Blog Image */}
      <img className="h-28 w-full object-cover" src={`http://localhost:8000/${element.coverImage}`} alt={element.title} />

      {/* Blog Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900">{element.title}</h2>
       
        
        {/* Truncated Blog Content */}
        <p className="mt-3 text-gray-700 text-sm line-clamp-3">
          {element.body}
        </p>

        {/* Read More Button */}
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
