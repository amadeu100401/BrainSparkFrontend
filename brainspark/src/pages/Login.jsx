import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Usando o useNavigate da versão 6 do react-router-dom

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const navigate = useNavigate(); // Usando o useNavigate para navegação

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica de login
    console.log(form);
  };

  const handleGoBack = () => {
    navigate("/"); // Redireciona para a raiz (home)
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl w-full max-w-sm sm:max-w-md text-white space-y-6"
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <FaUser size={30} />
          </div>
          <h2 className="text-xl tracking-widest font-light">LOGIN</h2>
        </div>

        <div className="relative border-b border-white">
          <FaEnvelope className="absolute left-0 top-2.5 text-white" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="pl-8 bg-transparent outline-none w-full py-2 placeholder-white text-white"
            required
          />
        </div>

        <div className="relative border-b border-white">
          <FaLock className="absolute left-0 top-2.5 text-white" />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            className="pl-8 bg-transparent outline-none w-full py-2 placeholder-white text-white"
            required
          />
        </div>

        <div className="flex justify-between text-sm text-white">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="form-checkbox text-blue-700"
            />
            <span>Lembrar acesso</span>
          </label>
          <a href="#" className="underline text-white/80 hover:text-white">
            Esqueceu a senha?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-800 py-2 rounded text-white font-semibold tracking-wider"
        >
          LOGIN
        </button>
        
        <a
          href="#"
          onClick={handleGoBack}
          className="w-full text-white text-sm font-medium tracking-wider mt-4 inline-block text-center hover:text-blue-300 transition-colors"
        >
          Voltar
        </a>
      </form>
    </div>
  );
}
