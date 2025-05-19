import  httpRequest, { ContextEnum } from "../utils/HttpUtil";
import { showErrorToast, showSuccessToast } from "../components/ToastContext";

export default async function DeleteAccount(logout: () => void) {
    try {
        await httpRequest({
          url: ContextEnum.user + "/delete-account",
          method: "PUT"
        });

        showSuccessToast("A conta foi excluída com sucesso.")
        logout();
    } catch(error: any) {
        showErrorToast(error.message || "Erro ao excluir a conta. Tente novamente mais tarde.")
    }
} 