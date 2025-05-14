import httpUtil from "../../../utils/HttpUtil";

export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
  try {
    const payload = { email, password, rememberMe };

    await httpUtil<any>({
       url: "/api/v1/auth/login",
       method: 'POST',
       data: payload
      });

      sessionStorage.setItem("email", email);
      return { success: true, email, message: ""};
  } catch (error: any) {
      const isNotVerify = error.code === '001' ? true : false;

      if(isNotVerify) {
        sessionStorage.setItem("email", email)
      }

      const errorMessage = isNotVerify ? error.message : (error.message || "Erro desconhecido");

      return { success: false, message: ("Erro ao fazer login: " + errorMessage), code: error.code};
  }
};