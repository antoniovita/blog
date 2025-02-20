import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const username = localStorage.getItem('username');
  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.reload();
  };

  const id = localStorage.getItem('id');

  return (
    <nav className="bg-transparent p-5 flex justify-between items-center text-white shadow-xl fixed w-full top-0 left-0 z-20">
      <Link className="ml-10" to={'/'}> 
      </Link>


      <div className="flex items-center space-x-4 mr-5">
        {username ? (
          <div className="flex items-center space-x-3 gap-5">
            <div className="flex flex-wrap gap-2">
              <Link className="flex flex-wrap gap-2" to={`/user/${id}`}>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-user-round"
                >
                  <path d="M18 20a6 6 0 0 0-12 0" />
                  <circle cx="12" cy="10" r="4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="text-lg font-medium">Olá, {username}! </span>
             </Link>
            </div>
            <button
              onClick={handleLogout}
              className="text-lg font-medium bg-red-600 px-4 py-2 rounded-full hover:bg-red-500 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="shadow-sm shadow-gray-900 text-lg font-medium bg-black px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
