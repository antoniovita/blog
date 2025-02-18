import React from "react";
import { Link } from "react-router-dom";

const CreatePostButton = () => {
  return (
    <Link
      to="/create-post"
      className="fixed bottom-6 right-6 z-10 bg-indigo-600 text-white w-14 h-14 flex items-center justify-center text-5xl font-bold rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-300"
    >
     <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 12h8"/>
    <path d="M12 8v8"/>
    </svg>

    </Link>
  );
};

export default CreatePostButton;
