import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const UserPage = () => {
  const [posts, setPosts] = useState([]); // Alterei para 'posts' (plural)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getByUser/${id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error("Erro ao buscar posts:", error));
  }, [id]);

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
                onClick={() => navigate(`/post/${post.id}`)}
                key={post.id}
                className="border border-gray-900 shadow-sm sm:ml-110 sm:mr-110 flex flex-col cursor-pointer bg-black shadow-gray-900 p-5 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-wrap justify-between">
                  <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
                  <Link to={`/user/${post.user_id}`} className="w-18 text-sm text-gray-400 flex flex-wrap gap-2 hover:text-gray-200 transform transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
                    <p className="">
                    {post.user.username}
                    </p>
                 </Link>
                </div>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.content}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Publicado em: {new Date(post.date).toLocaleDateString()}
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

export default UserPage;
