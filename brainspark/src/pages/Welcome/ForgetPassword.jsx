import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

import InputGroup from "../../components/InputGroup";
import ResetPasswordModal from "../../components/login/ResetPasswordModal";
import { Button } from "@/components/ui/button";
import ForgetPassword from "../../features/ForgetPassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("O email deve ser informado.");
      return;
    }

    setError("");
    const isSucess = await ForgetPassword({ email });
    setShowSuccessModal(isSucess);
  };

  const handleForgetPasswordChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-2xl mg-4 font-semibold text-center">Esqueceu a senha?</h2>
      <span className="mt-4 text-white/60">
        Não se preocupe, informe seu email e um link para redefinição de senha será enviado.
      </span>

      <form onSubmit={handleForgetPasswordSubmit} className="space-y-4">
        <InputGroup
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleForgetPasswordChange}
          icon={<FaEnvelope />}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-center w-full">
          <Button
            type="submit"
            className="sm:w-auto bg-blue-600 hover:bg-blue-700 py-2 px-40"
          >
            Enviar
          </Button>
        </div>
      </form>

      <div
        onClick={() => navigate("/welcome/login")}
        className="text-sm text-center text-white/60 cursor-pointer"
      >
        <div className="flex justify-center mt-6">
          <span className="font-semibold hover:text-white hover:underline flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para o login
          </span>
        </div>
      </div>

      <ResetPasswordModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
