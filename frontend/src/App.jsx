import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import CreatePostButton from "./components/CreatePostButton";
import CreatePostPage from "./pages/CreatePost";
import UserPage from "./pages/UserPage"
import EditPage from "./pages/EditPage";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
      <CreatePostButton/>
    </Router>
  );
};

export default App;
