import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getPostById/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.error("Erro ao buscar post:", error));
  }, [id]);

  if (!post) return <div className="text-white text-center">Carregando...</div>;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start">

      <div className="container mx-auto px-6 py-20 z-10">
        <div className="bg-black border border-gray-900 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 mt-10">
            <div className="flex flex-wrap gap-3 justify-between">
                <h1 className="text-3xl font-bold text-white mb-4 mt-0.75">{post.title}</h1>
                <Link to={'/'} className="text-white"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> </Link>
            </div>
          <p className="text-gray-300 mb-4">{post.content}</p>
          <div className="flex flex-wrap justify-between">
            <p className="text-sm text-gray-500 mb-2">
            {new Date(post.date).toLocaleString("pt-BR", {
                      year: "numeric", 
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit", 
                      minute: "2-digit",
                    })}
            </p>

            <Link to={`/user/${post.user_id}`} className="w-20 text-sm text-gray-500 flex flex-wrap gap-2 hover:text-gray-200 transform transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
            <p>
             {post.user.username}
            </p>
          </Link>
          </div>
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

export default PostPage;
