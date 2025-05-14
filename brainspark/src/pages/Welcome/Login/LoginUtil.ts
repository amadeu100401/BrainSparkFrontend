import { httpRequest } from "../../../utils/HttpRequestsUtil";

export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
  try {
    const payload = { email, password, rememberMe };
    const response = await httpRequest("/api/v1/auth/login", "POST", payload);
    const ok = response.ok;
    
    if (ok) {
      sessionStorage.setItem("email", email)
      return { success: true, email };
    } else {
      const isNotVerify = response.code === '001' ? true : false;

      if(isNotVerify) {
        sessionStorage.setItem("email", email)
      }

      const errorMessage = isNotVerify ? response.message : (response.message || "Erro desconhecido");
      return { success: false, message: errorMessage, code: response.code};
    }
  } catch (error) {
    return { success: false, message: "Erro ao fazer login: " + error.message, code: null};
  }
};