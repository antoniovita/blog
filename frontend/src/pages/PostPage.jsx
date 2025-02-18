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

      <div className="container mx-auto px-6 py-20 z-10">
        <div className="bg-gray-900 bg-opacity-100 border-gray-700 border p-6 rounded-2xl shadow-lg mt-10">
            <div className="flex flex-wrap gap-3">
                <Link to={'/'} className="flex justify-center items-center p-3 bg-indigo-600 text-white rounded-lg h-[40px] w-[45px] text-[18px] transform transition-all duration-300 hover:bg-indigo-500 shadow-lg hover:shadow-xl"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg> </Link>
                <h1 className="text-3xl font-bold text-white mb-4 mt-0.75">{post.title}</h1>
            </div>
          <p className="text-gray-300 mb-4">{post.content}</p>
          <p className="text-sm text-gray-500 mb-6">
            Publicado em: {new Date(post.date).toLocaleDateString()}
          </p>
        <Link to={`/post/${post.user_id}`} className="w-30 text-sm text-gray-500 flex flex-wrap gap-2 hover:text-gray-200 transform transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
            <p className="mt-0.75">
             {post.user.username}
            </p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
