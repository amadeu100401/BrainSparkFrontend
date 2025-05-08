import InputGroup from "../../components/InputGroup";
import { useState } from "react";
import {
    FaEnvelope 
  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { httpRequest } from "../../utils/HttpRequestsUtil"; 
import ResetPasswordlModal from "./ResetPasswordModal"

export default function ForgotPassword() {
    const [email, setEmail] = useState({
      email: ""
    }); 

    const [error, setError] = useState(""); 

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleForgetPasswordSubmit = async (e) => {
        e.preventDefault();

        try {
          if (!email.email) {
            setError("O email deve ser informado.");
          }
          const data = { email: email.email }
          await httpRequest("/api/v1/auth/forgetPassword", "POST", data);
          setShowSuccessModal(true);
        } catch (error) {
          setError("Erro ao realizar a requisição da troca de senha.")
        }
    };

    const handleForgetPasswordChange = (e) => {
      const { name, value } = e.target;
      setEmail((prev) => ({ ...prev, [name]: value }));
    };

    const navigate = useNavigate();

    return(
        <div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl font-semibold text-center">Recuperação de senha</h2>
        <form onSubmit={handleForgetPasswordSubmit} className="space-y-4">
          <InputGroup
            type="email"
            name="email"
            placeholder="Email"
            value={email.email}
            onChange={handleForgetPasswordChange}
            icon={<FaEnvelope />}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
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
            navigate("/welcome/login")
          }}
          className="text-sm text-center text-white/60"
        >
          <span className="font-semibold hover:text-white hover:underline cursor-pointer">Voltar</span>
        </p>
        <ResetPasswordlModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      </div>
    );
}