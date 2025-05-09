import { useState } from "react";
import Cookies from "js-cookie";
import { httpRequest } from "../../../utils/HttpRequestsUtil";
import Modal from "../../../components/Modal";
import ErrorToast from "../../../components/ErrorToast";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onSuccess,
}: DeleteAccountModalProps) {
  const token = Cookies.get("token") || sessionStorage.getItem("token");
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    try {
      if (token) {
        const { status, ok } = await httpRequest(
          "/api/v1/users/delete-account",
          "PUT",
          null,
          {},
          token
        );

        if (ok) {
          onSuccess();  // Chama a função de sucesso após excluir a conta
          onClose();    // Fecha o modal
        } else {
          throw new Error("Falha ao excluir a conta.");
        }
      } else {
        throw new Error("Token ausente");
      }
    } catch (err) {
      setError("Erro ao excluir a conta. Tente novamente mais tarde.");
      setShowToast(true);  // Exibe a mensagem de erro caso algo falhe
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Confirmar Exclusão</h2>
          <p className="text-sm text-gray-600 mb-6">
            Tem certeza de que deseja excluir sua conta? Essa ação é irreversível.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteAccount} // Chama a função de exclusão diretamente
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              Excluir Conta
            </button>
          </div>
        </div>
      </Modal>

      {showToast && (
        <ErrorToast
          message={error}
          onClose={() => setShowToast(false)}  // Fechar a mensagem de erro
        />
      )}
    </>
  );
}
