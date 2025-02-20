import React from "react";
import { Link } from "react-router-dom";

const CreatePostButton = () => {
  return (
    <Link
      to="/create-post"
      className="shadow-sm shadow-gray-900 fixed bottom-6 right-6 z-10 bg-black text-white w-14 h-14 flex items-center justify-center text-5xl font-bold rounded-full shadow-lg hover:shadow-lg 0 transition-all duration-300"
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    </Link>
  );
};

export default CreatePostButton;
