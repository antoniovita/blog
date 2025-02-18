import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const username = localStorage.getItem('username');
  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <nav className="bg-black p-5 flex justify-between items-center text-white shadow-xl fixed w-full top-0 left-0 z-20">
      <Link to={'/'}><h1 className="ml-5 text-3xl font-semibold tracking-wide text-indigo-500 hover:text-indigo-400 transition-all duration-300">
        S'up
      </h1> </Link>


      <div className="flex items-center space-x-4 mr-5">
        {username ? (
          <div className="flex items-center space-x-3 gap-10">
            <div className="flex flex-wrap gap-2">
              <Link className="flex flex-wrap gap-2" to={'/account'}>
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
            className="text-lg font-medium bg-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-500 transition-all duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
