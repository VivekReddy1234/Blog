import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ detail }) => {
  const navigate= useNavigate();

  return (
    <div className="m-0 p-0 h-[50px] flex flex-col pt-3 border text-white bg-gray-900">
      <ul className="flex gap-[30px]">
        <li> BlogiFy</li>
        <li>Home</li>
        {detail ? (
          <>
            <li><Link to='/addBlog'>Add Blog  </Link></li>
            <DropDown userName={detail.name} />
          </>
        ) : (<>
            <li><Link to='/signup'>Create Account</Link></li>
          <li><Link to="/signin">Sign In</Link> </li>
          </>
        )}
      </ul>
    </div>
  );
};

const DropDown = ({ userName }) => {
  const [open, setOpen] = useState(false);
  const navigate= useNavigate();

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    console.log("function approached");
    try {
      const response = await fetch("https://blog-att9.onrender.com/user/logout", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      console.log(response);
  
      if (response.ok) {
        navigate('/');
        window.location.reload(); // Refresh page after logout
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <div>
      <button onClick={handleClick}>{userName}</button>
      {open && (
        <div>
          <ul>
            <li className="text-black"><button onClick={handleLogout}>LogOut</button></li>
            <li>Some button</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
