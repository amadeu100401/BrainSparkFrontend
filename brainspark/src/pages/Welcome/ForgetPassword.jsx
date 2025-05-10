import InputGroup from "../../components/InputGroup";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { httpRequest } from "../../utils/HttpRequestsUtil"; 
import ResetPasswordlModal from "././components/ResetPasswordModal"
import ErrorToast from "../../components/ErrorToast";

export default function ForgotPassword() {
    const [email, setEmail] = useState({
      email: ""
    }); 

    const [error, setError] = useState(""); 
    const [showErrorToast, setShowErrorToast] = useState("");
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
          setShowErrorToast(true);
        }
    };

    const handleForgetPasswordChange = (e) => {
      const { name, value } = e.target;
      setEmail((prev) => ({ ...prev, [name]: value }));
    };

    const navigate = useNavigate();

    return(
        <div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl font-semibold text-center">Esqueceu a senha?</h2>
        <span className="mt-4 text-white/60">Não se preocupe, informe seu email e um link para redefinição de senha será envia</span>
        <form onSubmit={handleForgetPasswordSubmit} className="space-y-4">
          <InputGroup
            type="email"
            name="email"
            placeholder="Email"
            value={email.email}
            onChange={handleForgetPasswordChange}
            icon={<FaEnvelope />}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 py-2 px-40 rounded font-semibold mt-4 mx-auto"
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
        <div className="flex justify-center mt-6">
          <span className="font-semibold hover:text-white hover:underline cursor-pointer flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para o login
          </span>
        </div>
        </p>
        <ResetPasswordlModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
        {showErrorToast && (
            <ErrorToast
                message="Erro ao realizar a redefinição de senha. Tente novamente mais tarde."
                onClose={() => setShowToast(false)}
            />
            )}
      </div>
    );
}