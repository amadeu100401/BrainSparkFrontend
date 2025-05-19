import Modal from "../Modal";
import DeleteAccount from "../../features/DeleteAccount"
import { Button } from "@/components/ui/button"
import { useAuth } from '../../components/AuthContext';

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
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
      await DeleteAccount(logout)

      onSuccess();  
      onClose();   
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="mt-auto pt-4">
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Confirmar Exclusão</h2>
          <p className="text-sm text-gray-400 mb-6">
            Tem certeza de que deseja excluir sua conta? Essa ação é irreversível.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => onClose()}
              className="px-4 py-2 rounded-md border-none bg-zinc-700 text-white hover:bg-zinc-800 transition"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="px-4 py-2 rounded-md border-none bg-red-600 text-white hover:bg-red-800 transition hover:border-none"
            >
              Excluir Conta
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
