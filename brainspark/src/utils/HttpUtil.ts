import axios, { AxiosRequestConfig } from 'axios';

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export enum ContextEnum {
  user = "/api/v1/users",
  idea = "/api/v1/ideas",
  auth = "/api/v1/auth"
}

interface HttpRequestOption {
  url: string;
  method: HttpMethods;
  data?: any;
  headers?: Record<string, string>;
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
  };

  try {
    const response = await axios.request<T>(config);

    if (response.status >= 400) {

      var data = response.data as any;

      const cleanedMessage = data?.message || 'Erro desconhecido';
      const code = data?.code;

      throw {
        message: cleanedMessage,
        code,
        status: response.status,
      } as HttpError;
    }

    return response.data;

  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      throw {
        message: "O serviço encontra-se indisponível. Tente novamente mais tarde.",
        code: 500
      }
    }

    if (error.code === 'ECONNABORTED') {
      throw {
        message: 'Tempo limite da requisição excedido.',
        code: 'TIMEOUT',
        status: 408,
      } as HttpError;
    }

    const rawMessage = error?.response?.data?.message || error.message || 'Erro desconhecido';
    const code = error.code;

    throw {
      message: rawMessage,
      code,
      status: error.status || 500,
    } as HttpError;
  }
}