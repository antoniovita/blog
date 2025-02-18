import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/getPostsByUser")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error("Erro ao buscar posts:", error));
  }, []);

  return (
    <div className="relative min-h-screen flex justify-center p-6">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
      >
        <source
          src="https://videos.pexels.com/video-files/2611250/2611250-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
        Seu navegador não suporta o elemento de vídeo.
      </video>

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-6 mt-20">
          Últimos Posts
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4">{post.content}</p>
                <p className="text-sm text-gray-500 mb-5">
                  Publicado em: {new Date(post.date).toLocaleDateString()}
                </p>
                  <Link to={`/post/${post.id}`}className="mt-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-all duration-300">
                    Ver mais
                  </Link>
              </div>
            ))
          ) : (
            <p className="text-white text-center col-span-full">
              Nenhum post encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
