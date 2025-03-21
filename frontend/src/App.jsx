import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import Navbar from './components/Navbar.jsx'
import BlogCard from './components/Card'
import Preview from './components/Preview.jsx'

function App(){
     const [user,setUser]= useState(null);
     const [blog,setBlog] = useState([]);
    // calll the get function so that it checks for whether the user is logged in or not if logged in gives details;
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch("https://blog-att9.onrender.com/", {
            method: "GET",
            credentials: "include", // Ensure cookies are sent with the request
          });
  
          const data = await response.json(); // Properly parse the JSON
          setUser(data.user); // Set user state
          setBlog(data.blog);
     
        } catch (error) {
          console.log("Error fetching user:", error);
        }
      };
  
      fetchUser(); // Call the function
    }, []); 

  return (
   <>
     <div className='m-0 p-0'>
    <Navbar detail={user}/>
    {console.log(blog)}
    {/* {console.log(blog.length)} */}
    {user?<><div className='flex flex-row flex-wrap overflow-auto gap-5 mt-10'>
      {blog.map((e)=>(
        <div> <Preview blog={e}/> </div>
      ))}   </div> </> :<div></div>
    }

    </div>
   </>
  )
}

export default App
