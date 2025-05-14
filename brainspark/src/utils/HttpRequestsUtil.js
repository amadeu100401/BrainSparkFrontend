import { logout } from '../components/AuthContext'

export async function httpRequest(
    url,
    method = 'GET',
    data = null,
    headers = {},
    authorization = null
  ) {
    const baseUrl = "http://localhost:8080";
    const isFormData = data instanceof FormData;
  
    const options = {
      method,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      credentials: 'include',
    };
  
    if (data) {
      options.body = isFormData ? data : JSON.stringify(data);
    }
  
    if (authorization) {
      options.headers['Authorization'] = `Bearer ${authorization}`;
    }
  
    try {
      const fullUrl = `${baseUrl}${url}`;
  
      const response = await fetch(fullUrl, options);
  
      const contentType = response.headers.get("content-type");
      const responseData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const rawMessage = responseData.message || "";
        const codeMatch = rawMessage.match(/\[(.*?)\]/);
        const code = codeMatch ? codeMatch[1] : null;
        const message = rawMessage.split("]:")[1]?.trim() || rawMessage;

        if (code === "003") {
          logout();
        }

        return {
          status: response.status,
          ok: false,
          code,
          message,
          date: responseData.date,
          path: responseData.path,
        };
      }
  
      return {
        status: response.status,
        ok: response.ok,
        data: responseData,
      };
  
    } catch (error) {
      return {
        status: 0,
        ok: false,
        code: null,
        message: "Erro de rede ou conexão com o servidor.",
        date: new Date().toISOString(),
        path: url,
      };
    }
  }

const ErrorCode = (code) => {
  switch(code) {
    case "001":
      return "Conta não validada";
    case "002":
       return "Conta já validada";
    case "003":
      return "Token expirado";
    case "004":
      return "Email já cadastrado";
    case "005":
      return "Conta excluída";
    case "006":
      return "Credenciais inválidas";
  }
}
  