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
      console.log('Requisição para:', fullUrl);
      console.log('Headers:', options.headers);
  
      const response = await fetch(fullUrl, options);
  
      const contentType = response.headers.get("content-type");
      const responseData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();
  
      return {
        status: response.status,
        ok: response.ok,
        data: responseData,
      };
  
    } catch (error) {
      console.error("Erro HTTP:", error);
      return {
        status: 0,
        ok: false,
        data: { message: error.message || "Erro desconhecido" },
      };
    }
  }
  