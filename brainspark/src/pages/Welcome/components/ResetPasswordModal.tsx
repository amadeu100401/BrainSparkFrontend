import React from "react";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";

interface ResetEmailSentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetEmailSentModal: React.FC<ResetEmailSentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  
  const handleAcknowledge = () => {
    onClose(); 
    navigate("/welcome");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold text-green-500">Email Enviado</h3>
        <p className="text-sm text-white/60 mb-4">
          Se o email informado estiver associado a uma conta, você receberá um link para redefinir sua senha.
        </p>
        <button
          onClick={handleAcknowledge}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg"
        >
          Entendi
        </button>
      </div>
    </Modal>
  );
};

export default ResetEmailSentModal;
