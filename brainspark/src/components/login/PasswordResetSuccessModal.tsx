import React from "react";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

interface PasswordResetSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordResetSuccessModal: React.FC<PasswordResetSuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  const handleRedirect = () => {
    onClose(); 
    navigate("/welcome/login"); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold text-green-500">Senha Redefinida</h3>
        <p className="text-sm text-white/60 mb-4">
          Sua senha foi alterada com sucesso. Você já pode fazer login com a nova senha.
        </p>
        <button
          onClick={handleRedirect}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg"
        >
          Fazer login
        </button>
      </div>
    </Modal>
  );
};

export default PasswordResetSuccessModal;
