import axios, { AxiosRequestConfig } from 'axios';

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface HttpRequestOption {
  url: string;
  method: HttpMethods;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
}

interface HttpError {
  message: string;
  code: string | null;
  status: number;
}

export default async function httpUtil<T = any>({
  url,
  method,
  data,
  headers = {},
  timeout = 5000,
}: HttpRequestOption): Promise<T> {
  const urlBase = "http://localhost:8080";
  const fullUrl = urlBase + url;

  const config: AxiosRequestConfig = {
    url: fullUrl,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    data,
    withCredentials: true,
    validateStatus: () => true,
    timeout,
  };

  try {
    const response = await axios.request<T>(config);

    if (response.status >= 400) {
      const rawMessage = (response.data as any)?.message || 'Erro desconhecido';
      const codeMatch = rawMessage.match(/\[(.*?)\]/);
      const code = codeMatch ? codeMatch[1] : null;
      const cleanedMessage = rawMessage.replace(/\[.*?\]:?\s?/, '');

      throw {
        message: cleanedMessage,
        code,
        status: response.status,
      } as HttpError;
    }

    return response.data;

  } catch (error: any) {
    if (error.code === 'ECONNABORTED') {
      throw {
        message: 'Tempo limite da requisição excedido.',
        code: 'TIMEOUT',
        status: 408,
      } as HttpError;
    }

    const rawMessage = error?.response?.data?.message || error.message || 'Erro desconhecido';
    const codeMatch = rawMessage.match(/\[(.*?)\]/);
    const code = codeMatch ? codeMatch[1] : null;
    const cleanedMessage = rawMessage.replace(/\[.*?\]:?\s?/, '');

    throw {
      message: cleanedMessage,
      code,
      status: error.response?.status || 500,
    } as HttpError;
  }
}
