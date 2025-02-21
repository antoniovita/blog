import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('id'); 

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getByUser/${id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error("Erro ao buscar posts:", error));
  }, [id]);

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para deletar um post.");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { userId }
      });
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center p-6">
      <div className="container mx-auto z-10">
        <h1 className="text-3xl font-bold text-white text-center mb-6 mt-20">
          Últimos Posts de {posts.length > 0 && posts[0].user.username}
        </h1>

        <div className="grid grid-cols-1 gap-6 relative z-10">
          {posts.length > 0 ? (
            posts.map((post) => ( 
              <div
                key={post.id}
                className="border border-gray-900 shadow-sm sm:ml-110 sm:mr-110 flex flex-col bg-black shadow-gray-900 p-5 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-wrap justify-between">
                  <h2 onClick={() => navigate(`/post/${post.id}`)} className="cursor-pointer text-xl font-semibold text-white mb-2">{post.title}</h2>
                  <div className="flex flex-wrap gap-3">
                    {userId === id && (
                      <>
                        <button onClick={() => handleDelete(post.id)} className="text-gray-400 mb-5 cursor-pointer hover:text-red-400 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-2">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            <line x1="10" x2="10" y1="11" y2="17"/>
                            <line x1="14" x2="14" y1="11" y2="17"/>
                          </svg>
                        </button>
                        <button onClick={() => navigate(`/edit/${post.id}`)} className="text-gray-400 mb-4 cursor-pointer hover:text-white transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen">
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.content}</p>
                <p className="text-sm text-gray-500 mb-2">
                {new Date(post.date).toLocaleString("pt-BR", {
                      year: "numeric", 
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit", 
                      minute: "2-digit",
                    })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white text-center col-span-full">
              Nenhum post encontrado.
            </p>
          )}
        </div>
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

export default UserPage;
