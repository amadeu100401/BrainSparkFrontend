import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock} from "react-icons/fa";
import { httpRequest } from "../../utils/HttpRequestsUtil"; 
import InputGroup from "../../components/InputGroup";
import VerificationModal from "././components/VerificationModal";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../../components/ErrorToast";

export default function RegisterForm({ setView }) {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });    

    const [error, setError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({ ...prev, [name]: value }));
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
            birthDate: "2000-01-01"
        }
    
        const { status, ok, data } = await httpRequest("/api/v1/users/signup", "POST", payload);
    
        if (ok) {
            sessionStorage.setItem("email", data.email);
            setIsVerifying(true);
            setRegisterForm({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
            setShowToast(false);
        } else {
            setError("Erro ao cadastrar. Tente novamente.");
            setShowToast(false);
        }
        } catch(error) {
            setShowToast(true);
        }
    };

    return (
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
                required
                />
                <InputGroup
                type="email"
                name="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                icon={<FaEnvelope />}
                required
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
                required
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
                required
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
                    navigate("/welcome/login")
                    setError("");
                }}
                className="font-semibold text-white hover:underline cursor-pointer"
                >
                Clique aqui!
                </span>
            </p>
            
            {/* MODAL DE VERIFICAÇÃO */}
            <VerificationModal
                isOpen={isVerifying}
                onClose={() => {
                    setIsVerifying(false);
                }}
                onSuccess={() => {
                    setIsVerifying(false);
                    setView("login");
                }}
            />
            {showToast && (
            <ErrorToast
                message="Erro ao realizar o cadastro. Tente novamente mais tarde."
                onClose={() => setShowToast(false)}
            />
            )}
        </div>
    )
}