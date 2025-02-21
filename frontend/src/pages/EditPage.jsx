import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getPostById/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        setError("Erro ao buscar o post.");
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para editar um post.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/posts/update/${id}`,
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/user/${post.user_id}`);
    } catch (error) {
      setError("Erro ao atualizar o post.");
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-transparent p-6">
      <div className="bg-black shadow-gray-900 p-8 rounded-lg shadow w-full max-w-md z-10 transition-all duration-300">
        <h2 className="text-2xl font-bold text-white mb-4">Editar Post</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Título</label>
            <input
              placeholder="Digite seu título..."
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="mt-2 w-full p-2 rounded bg-black border border-gray-900 shadow text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Conteúdo</label>
            <textarea
              placeholder="Digite sua nota aqui..."
              name="content"
              value={post.content}
              onChange={handleChange}
              className="mt-2 w-full p-2 rounded bg-black border border-gray-900 shadow text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full hover:shadow-lg shadow-gray-900 shadow bg-gray-960 text-white p-2 rounded-lg font-semibold transition-all duration-300"
          >
            Atualizar Post
          </button>
        </form>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(200)].map((_, index) => (
            <div
              key={index}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 2}px`,
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

export default EditPage;
