import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const username = localStorage.getItem('username');
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.location.reload();
  };

  const id = localStorage.getItem('id');

  return (
    <nav className="bg-transparent p-5 flex justify-between items-center text-white shadow-xl fixed w-full top-0 left-0 z-20">
      <Link className="ml-10 flex flex-wrap" to={'/'}> 
        <h1 className="font-semibold text-[20px]">starscope</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
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
              className="cursor-pointer text-lg font-medium bg-red-600 px-4 py-2 rounded-full hover:bg-red-500 transition-all duration-300"
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
