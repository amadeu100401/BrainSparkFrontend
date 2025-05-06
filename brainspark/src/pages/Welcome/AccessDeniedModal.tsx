import React from "react";
import Modal from "../../components/Modal";

interface AccessDeniedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessDeniedModal: React.FC<AccessDeniedModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold text-red-600">Acesso Negado</h3>
        <p className="text-sm text-white/60 mb-4">
          As credenciais de acesso estão incorretas. Por favor, tente novamente.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg"
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default AccessDeniedModal;
