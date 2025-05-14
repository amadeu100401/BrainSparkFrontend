import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/AuthContext";
import { loginUser } from "./LoginUtil";  // Importando a função de login
import InputGroup from "../../../components/InputGroup";
import ErrorToast from "../../../components/ErrorToast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Switch from "react-switch";
import VerificationModal from "../components/VerificationModal";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { email, password } = loginForm;

    const result = await loginUser(email, password, rememberMe);

    if (result.success) {
      navigate("/brainspark/main");
    } else {
      if (result.code === "001") {
          setIsVerifying(false);
          setLoginForm({
            email:"",
            password:""
          })
      }

      setError(result.message);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  return (
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
            {/* Usando o Switch da react-switch */}
            <Switch
              onChange={handleSwitchChange}
              checked={rememberMe}
              offColor="#888"
              onColor="#4CAF50"
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={40}
            />
            <span className="text-white/80 text-sm mr-2 ml-3">Lembre-se de mim</span>
          </label>
          <span
            onClick={() => {
              navigate("/welcome/forgetPassword");
              setLoginForm({ email: "", password: "" });
            }}
            className="text-sm text-white/60 hover:text-white hover:underline cursor-pointer"
          >
            Esqueci a senha
          </span>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-center w-full">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-40"
          >
            Entrar
          </Button>
        </div>
      </form>
      <p
        onClick={() => {
          navigate("/welcome/register");
          setLoginForm({ email: "", password: "" });
        }}
        className="text-sm text-center text-white/60"
      >
        Não possui cadastro?{" "}
        <span className="font-semibold hover:text-white hover:underline cursor-pointer">
          Clique aqui!
        </span>
      </p>
      <VerificationModal
        isOpen={!isVerifying}
        isResendEmail={!isVerifying}
        onSuccess={() => {
            setIsVerifying(false);
        }}
        onClose={() => setIsVerifying(true)}
      />
      {showToast && (
        <ErrorToast
          message={error}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
