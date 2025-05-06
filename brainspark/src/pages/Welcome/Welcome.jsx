import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import VerificationModal from "./VerificationModal";
import AccessDeniedModal from "./AccessDeniedModal";
import { httpRequest } from "../../utils/HttpRequestsUtil"; 
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


function InputGroup({ icon, type, show, toggleShow, ...props }) {
  const isPassword = type === "password";

  return (
    <div className="flex items-center bg-white/10 rounded px-3 relative">
      <div className="text-white/70 pr-3">{icon}</div>
      <input
        {...props}
        type={isPassword && show ? "text" : type}
        className="flex-1 bg-transparent text-white placeholder-white/70 focus:placeholder-transparent py-2 outline-none pr-8"
      />
      {isPassword && (
        <div
          onClick={toggleShow}
          className="absolute right-3 text-white/70 cursor-pointer"
        >
          {show ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
}

export default function WelcomePage() {
  const [view, setView] = useState("default");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAccessDenied, setIsAccessDenied] = useState(false);
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const payload = {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        birthDate: "2001-04-10"
      }

      const response = await httpRequest("/api/v1/auth/signup", "POST", payload);

      // Verifique se a resposta do backend foi bem-sucedida
      if (response.status === "success") {
        // Após o sucesso, abrir o modal para verificar o código de verificação
        setIsVerifying(true);
      } else {
        setError("Erro ao cadastrar. Tente novamente.");
      }

      setIsVerifying(true); 
    } catch(error) {
      setError("Erro ao realizar o cadastro. Tente novamente mais tarde.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const payload = {
        email: loginForm.email,
        password: loginForm.password,
      };
  
      const response = await httpRequest("/api/v1/auth/login", "POST", payload);
      const token = response.token;
      const email = response.email;
  
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email)
        setIsAccessDenied(false);
        navigate("/main");
      } else {
        setIsAccessDenied(true);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setIsAccessDenied(true);
    }
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row text-white">
      {/* Lado esquerdo */}
      <div
        className="md:w-1/2 w-full h-1/2 md:h-full bg-cover bg-center relative flex items-center justify-center px-6 py-12"
        style={{ backgroundImage: "url('/welcome.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 max-w-md space-y-5 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Bem-vindo ao <span className="text-blue-400">BrainSpark</span>
          </h1>
          <p className="text-sm md:text-base text-white/80">
            O espaço de trabalho inteligente com tecnologia de IA para organizar suas ideias, anotações e tarefas – mais rápido e inteligente do que nunca.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 text-xl mt-4">
            <FaFacebookF className="hover:text-blue-400 cursor-pointer" />
            <FaInstagram className="hover:text-pink-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Lado direito */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full bg-gray-900 flex items-center justify-center px-6 py-12">
        {view === "default" && (
          <div className="w-full max-w-md space-y-6 text-center">
            <h2 className="text-3xl font-semibold">Comece a criar de forma mais inteligente</h2>
            <p className="text-white/70">Entre ou crie uma nova conta BrainSpark</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => setView("login")}
                className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => setView("register")}
                className="bg-white text-blue-700 hover:bg-blue-100 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Cadastro
              </button>
            </div>
          </div>
        )}

        {view === "register" && (
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-2xl font-semibold text-center">Cadastro</h2>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <InputGroup
                type="text"
                name="name"
                placeholder="Nome"
                value={registerForm.name}
                onChange={handleRegisterChange}
                icon={<FaUser />}
              />
              <InputGroup
                type="email"
                name="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                icon={<FaEnvelope />}
              />
              <InputGroup
                type="password"
                name="password"
                placeholder="Senha"
                value={registerForm.password}
                onChange={handleRegisterChange}
                icon={<FaLock />}
                show={showPassword}
                toggleShow={() => setShowPassword((prev) => !prev)}
              />
              <InputGroup
                type="password"
                name="confirmPassword"
                placeholder="Confirmar senha"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                icon={<FaLock />}
                show={showConfirmPassword}
                toggleShow={() => setShowConfirmPassword((prev) => !prev)}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 py-2 px-40 rounded font-semibold mt-8 mx-auto"
                >
                  Cadastrar
                </button>
              </div>
            </form>
            <p className="text-sm text-center text-white/60">
              Já possui um cadastro?{" "}
              <span
                onClick={() => {
                  setView("login");
                  setError("");
                }}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                Clique aqui!
              </span>
            </p>
          </div>
        )}

        {view === "login" && (
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-2xl font-semibold text-center">Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <InputGroup
                type="email"
                name="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleLoginChange}
                icon={<FaEnvelope />}
              />
              <InputGroup
                type="password"
                name="password"
                placeholder="Senha"
                value={loginForm.password}
                onChange={handleLoginChange}
                icon={<FaLock />}
                show={showConfirmPassword}
                toggleShow={() => setShowConfirmPassword((prev) => !prev)}
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <div
                    onClick={toggleRememberMe}
                    className={`w-10 h-5 rounded-full relative transition-all ${
                      rememberMe ? "bg-green-600" : "bg-gray-400"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                        rememberMe ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-white/80 text-sm mr-2 ml-3">Lembre-se de mim</span>
                </label>
                <span
                  onClick={() => {
                    setView("forgotPassword");
                    setLoginForm({ email: "", password: "" });
                  }}
                  className="text-sm text-white/60 hover:text-white hover:underline cursor-pointer"
                >
                  Esqueci a senha
                </span>
              </div>
              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 py-2 px-40 rounded font-semibold mt-8 mx-auto"
                >
                  Entrar
                </button>
              </div>
            </form>
            <p
              onClick={() => {
                setView("register");
                setLoginForm({ email: "", password: "" });
              }}
              className="text-sm text-center text-white/60"
            >
              Não possui cadastro?{" "}
              <span className="font-semibold hover:text-white hover:underline cursor-pointer">
                Clique aqui!
              </span>
            </p>
          </div>
        )}

        {view === "forgotPassword" && (
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-2xl font-semibold text-center">Recuperação de senha</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <InputGroup
                type="email"
                name="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleLoginChange}
                icon={<FaEnvelope />}
              />
              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 py-2 px-20 rounded font-semibold mt-4 mx-auto"
                >
                  Enviar
                </button>
              </div>
            </form>
            <p
              onClick={() => {
                setView("login");
                setLoginForm({ email: "", password: "" });
              }}
              className="text-sm text-center text-white/60"
            >
              <span className="font-semibold hover:text-white hover:underline cursor-pointer">Voltar</span>
            </p>
          </div>
        )}
      </div>

      {/* MODAL DE VERIFICAÇÃO */}
      <VerificationModal
        isOpen={isVerifying}
        onClose={() => {
          setIsVerifying(false);
          setRegisterForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }}
        onSuccess={() => {
          setIsVerifying(false);
          setView("login");
        }}
        email={registerForm.email}
      />

      {/* MODAL DE ACESSO NEGADO */}
      <AccessDeniedModal
        isOpen={isAccessDenied}
        onClose={() => setIsAccessDenied(false)}
      />
    </div>
  );
}
