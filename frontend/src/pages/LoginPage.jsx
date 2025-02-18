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
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao processar requisição");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted src="https://videos.pexels.com/video-files/2611250/2611250-uhd_2560_1440_30fps.mp4" />
      <div className="bg-black bg-opacity-60 p-6 rounded-xl shadow-xl max-w-md w-full z-10">
        <h1 className="text-3xl font-semibold text-indigo-400 mb-6 text-center">
          {activeForm === "register" ? "Registrar" : activeForm === "loginUsername" ? "Login com Username" : "Login com E-mail"}
        </h1>
        <div className="flex justify-center mb-6 space-x-4 gap-2">
          <button className={`cursor-pointer text-sm font-medium ${activeForm === "loginEmail" ? "text-indigo-400" : "text-gray-400"}`} onClick={() => setActiveForm("loginEmail")}>Login com E-mail</button>
          <button className={`cursor-pointer text-sm font-medium ${activeForm === "loginUsername" ? "text-indigo-400" : "text-gray-400"}`} onClick={() => setActiveForm("loginUsername")}>Login com Username</button>
          <button className={`cursor-pointer text-sm font-medium ${activeForm === "register" ? "text-indigo-400" : "text-gray-400"}`} onClick={() => setActiveForm("register")}>Registrar</button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeForm !== "loginUsername" && (
            <div className="mb-4">
              <label className="block text-sm text-gray-300">E-mail</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-600 rounded-lg bg-gray-700 text-white" placeholder="Digite seu e-mail" required={activeForm === "register"} />
            </div>
          )}

          {activeForm !== "loginEmail" && (
            <div className="mb-4">
              <label className="block text-sm text-gray-300">Nome de Usuário</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-600 rounded-lg bg-gray-700 text-white" placeholder="Digite seu username" required={activeForm === "register"} />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm text-gray-300">Senha</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-600 rounded-lg bg-gray-700 text-white" placeholder="Digite sua senha" required />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button type="submit" className="cursor-pointer w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-500 transition-all">
            {activeForm === "register" ? "Registrar" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
