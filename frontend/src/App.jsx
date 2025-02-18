import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import CreatePostButton from "./components/CreatePostButton";
import CreatePostPage from "./pages/CreatePost";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
      </Routes>
      <CreatePostButton/>
    </Router>
  );
};

export default App;
