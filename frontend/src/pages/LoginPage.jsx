import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [activeForm, setActiveForm] = useState("loginEmail");
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let endpoint = "";
      let payload = {};

      if (activeForm === "loginEmail") {
        endpoint = "/user/loginEmail";
        payload = { email: formData.email, password: formData.password };
      } else if (activeForm === "loginUsername") {
        endpoint = "/user/loginUsername";
        payload = { username: formData.username, password: formData.password };
      } else if (activeForm === "register") {
        endpoint = "/user/register";
        payload = { email: formData.email, username: formData.username, password: formData.password };
      }

      const response = await axios.post(`http://localhost:3000${endpoint}`, payload);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("id", response.data.id);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao processar requisição");
    }
  };

  return (
    <div className="min-h-screen relative flex items-start justify-center">
      <div className="border border-gray-900 bg-black bg-opacity-60 p-6 rounded-xl max-w-md w-full z-10 mt-60">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          {activeForm === "register" ? "Registrar" : activeForm === "loginUsername" ? "Login com Username" : "Login com E-mail"}
        </h1>
        <div className="flex justify-center mb-6 space-x-4 gap-2">
          <button className={`cursor-pointer text-sm font-medium ${activeForm === "loginEmail" ? "text-white" : "text-gray-400"}`} onClick={() => setActiveForm("loginEmail")}>Login com E-mail</button>
          <button className={`cursor-pointer text-sm font-medium ${activeForm === "loginUsername" ? "text-white" : "text-gray-400"}`} onClick={() => setActiveForm("loginUsername")}>Login com Username</button>
          <button className={`cursor-pointer text-sm font-medium ${activeForm === "register" ? "text-white" : "text-gray-400"}`} onClick={() => setActiveForm("register")}>Registrar</button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeForm !== "loginUsername" && (
            <div className="mb-4">
              <label className="block text-sm text-gray-300">E-mail</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-2 w-full p-2 rounded bg-black border-2 border-gray-900 shadow shadow-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Digite seu e-mail" required={activeForm === "register"} />
            </div>
          )}

          {activeForm !== "loginEmail" && (
            <div className="mb-4">
              <label className="block text-sm text-gray-300">Nome de Usuário</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="mt-2 w-full p-2 rounded bg-black border-2 border-gray-900 shadow shadow-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Digite seu username" required={activeForm === "register"} />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm text-gray-300">Senha</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-2 w-full p-2 rounded bg-black border-2 border-gray-900 shadow shadow-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Digite sua senha" required />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button type="submit" className="border-2 border-gray-900 cursor-pointer w-full hover:shadow-lg shadow-gray-900 shadow bg-gray-960 text-white p-2 rounded-lg font-semibold transition-all duration-300">
            {activeForm === "register" ? "Registrar" : "Entrar"}
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

export default LoginPage;
