import httpRequest, { ContextEnum } from "../utils/HttpUtil.ts";
import { showErrorToast, showSuccessToast } from "../components/ToastContext.tsx";

interface UsersInfo {
  name: string;
  email: string;
  photoLink?: string;
  birthDate?: Date 
}

interface UpdateUsersInfo {
    name: string;
    avatar?: File;
    birthDate?: Date;
}

const userContext = ContextEnum.user;

export async function GetAccounData(): Promise<UsersInfo | null> {
  try {
    const response = await httpRequest({
      url: userContext + "/get-info",
      method: "GET",
    });

    return response as UsersInfo;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido ao buscar os dados.";
    showErrorToast(message);
    return null;
  }
}

export async function UpdateUsersInfo(user: UpdateUsersInfo) {
    try {
        const formData = new FormData();

        if (user.avatar) {
          formData.append("image", user.avatar)
        } else {
          formData.append("image", "");
        }

        formData.append("request", new Blob(
            [JSON.stringify({ 
              name: user.name, 
              birthDate: user.birthDate ? user.birthDate : "2000-01-01"
            })],
            { type: "application/json" }
        ));

        await httpRequest({
            url: userContext + "/update",
            method: "PUT",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        showSuccessToast("Os dados foram enviados com sucesso.")
    } catch (error) {
        const message =
        error instanceof Error ? error.message : "Erro desconhecido ao enviar os dados.";
        showErrorToast(message);
    }
}