import React, { useState } from "react";
import { httpRequest } from "../../utils/HttpRequestsUtil"; 
import InputGroup from "../../components/InputGroup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import ErrorToast from "../../components/ErrorToast";
import {
    FaEnvelope,
    FaLock,
  } from "react-icons/fa";

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [error, setError] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
      });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };
    
      const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError("");
      
        try {
          const payload = {
            email: loginForm.email,
            password: loginForm.password,
          };
      
          const { status, ok, data } = await httpRequest("/api/v1/auth/login", "POST", payload);
          const token = data.token;
          const email = loginForm.email;
      
          if (ok) {
            login(token, email, rememberMe);
            navigate("/brainspark/main");
          } else {
            const errorMessage = data.message || "Erro desconhecido";
            console.log(errorMessage)
            setError(`Erro ao fazer login: ${errorMessage}`);
          }
        } catch (error) {
          setShowToast(true);
        }
      };
    
    const toggleRememberMe = () => {
      setRememberMe(!rememberMe);
    };

    return (<div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <InputGroup
            type="email"
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handleLoginChange}
            icon={<FaEnvelope />}
            required
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
            required
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
                navigate("/welcome/forgetPassword")
                setLoginForm({ email: "", password: "" });
              }}
              className="text-sm text-white/60 hover:text-white hover:underline cursor-pointer"
            >
              Esqueci a senha
            </span>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
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
            navigate("/welcome/register")
            setLoginForm({ email: "", password: "" });
          }}
          className="text-sm text-center text-white/60"
        >
          Não possui cadastro?{" "}
          <span className="font-semibold hover:text-white hover:underline cursor-pointer">
            Clique aqui!
          </span>
        </p>
        {showToast && (
        <ErrorToast
          message={error}
          onClose={() => setShowToast(false)}
        />
      )}
      </div>);
}