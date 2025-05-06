import { useState } from "react";
import Modal from "../../components/Modal";
import { httpRequest } from "../../utils/HttpRequestsUtil"; 
import { useNavigate } from "react-router-dom";

export default function VerificationModal({ isOpen, onClose, onSuccess}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = async (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCode(value);
    
    if (value.length === 5) {
      try {
        const email = localStorage.getItem("email");
        const payload = {token: value, email: email};

        console.log(payload);

        const response = await httpRequest("/api/v1/auth/validate", "POST", payload);

        localStorage.setItem("email", response.email);
        localStorage.setItem("token", response.token);

        navigate("/");

        setCode("");
        onClose();
        onSuccess();
      } catch (err) {
        console.log(err)
        setError("Erro na verificação. Tente novamente mais tarde.");
        setCode("");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl font-semibold text-center">Verifique seu email</h3>
      <p className="text-sm text-center text-gray-600 mb-4">
        Digite o código de 5 dígitos enviado para o seu email.
      </p>
      <input
        type="text"
        maxLength={5}
        value={code}
        onChange={handleChange}
        className="w-full text-center text-lg font-mono tracking-widest border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="00000"
      />
      {error && (
        <p className="text-red-600 text-center text-sm mt-2">{error}</p>
      )}
    </Modal>
  );
}
