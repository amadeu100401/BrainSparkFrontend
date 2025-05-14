export async function httpRequest(
  url,
  method = 'GET',
  data = null,
  headers = {},
) {
  const baseUrl = "http://localhost:8080"; // base URL
  const isFormData = data instanceof FormData;

  const options = {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json', 'Accept': 'application/json' }),
      ...headers,
    },
    credentials: 'include',
  };

  if (data) {
    options.body = isFormData ? data : JSON.stringify(data);
  }

  try {
    const fullUrl = `${baseUrl}${url}`;

    const response = await fetch(fullUrl, options);

    const contentType = response.headers.get("content-type");

    let responseData;

    // Verifique se o conteúdo é JSON, senão, pegue o texto
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const rawMessage = responseData.message || '';
      const codeMatch = rawMessage.match(/\[(.*?)\]/);
      const code = codeMatch ? codeMatch[1] : null;
      const message = rawMessage.split("]:")[1]?.trim() || rawMessage;
      const status = response.status;
      
      if (code === "003" || status === 403) {
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

    // Retorna dados da resposta quando bem-sucedida
    return {
      status: response.status,
      ok: response.ok,
      data: responseData,
    };
  } catch (error) {
    // Caso ocorra algum erro durante a requisição, retorne o erro
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
