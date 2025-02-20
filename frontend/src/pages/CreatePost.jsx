import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("id");

    if (!token) {
      setError("Usuário não autenticado. Faça login.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/posts/createPost",
        { title, content, user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao criar post:", error);
      setError(error.response?.data?.error || "Erro ao criar post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent p-6">
      <div className="bg-black shadow-gray-900 p-8 rounded-lg shadow w-full max-w-md z-10 transition-all duration-300">
        <h2 className="text-2xl font-bold text-white mb-4">Criar Novo Post</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleCreatePost}>
          <div className="mb-4">
            <label className="block text-gray-300">Título</label>
            <input
              placeholder="Digite seu título..."
              type="text"
              className="mt-2 w-full p-2 rounded bg-black border border-gray-900 shadow shadow-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Conteúdo</label>
            <textarea
            placeholder="Digite sua nota aqui..."
              className="mt-2 w-full p-2 rounded bg-black border border-gray-900 shadow shadow-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full hover:shadow-lg shadow-gray-900 shadow bg-gray-960 text-white p-2 rounded-lg font-semibold transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar Post"}
          </button>
        </form>
      </div>



      <div className="absolute top-0 left-0 w-full h-full bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Criando muitas estrelas com a classe 'star' */}
          {[...Array(200)].map((_, index) => (
            <div
              key={index}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 2}px`, // Estrelas variando de 2px a 5px
                height: `${Math.random() * 3 + 2}px`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>
        {`
          .star {
            position: absolute;
            border-radius: 50%;
            background-color: white;
            animation: flicker 2s infinite alternate;
            opacity: 0.8;
          }

          @keyframes flicker {
            0% {
              opacity: 0.4;
            }
            100% {
              opacity: 1;
            }
          }

          .star:nth-child(even) {
            animation: moveStar 10s infinite linear;
          }

          .star:nth-child(odd) {
            animation: moveStar 15s infinite linear;
          }

          @keyframes moveStar {
            0% {
              transform: translateX(0) translateY(0);
            }
            100% {
              transform: translateX(100vw) translateY(100vh);
            }
          }
        `}
      </style>


    </div>
  );
};

export default CreatePostPage;
