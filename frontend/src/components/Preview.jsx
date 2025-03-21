import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Preview = ({ blog}) => {
    const [data,setData]= useState({});
       useEffect(()=>{
        setData(blog);
       },[])
       console.log(blog);
   
  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-lg bg-white p-4">
      <img className="w-full h-48 object-cover rounded-lg" src={`https://blog-att9.onrender.com/${blog.coverImage}`} alt={blog.title} />
      <div className="mt-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{blog.title}</h2>
        <Link 
         to={`/blog/${blog._id}`}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default Preview;