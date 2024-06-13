import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

class AxiosService {
  private service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL:
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:7888/api',
      timeout: 10000,
    });

    this.service.interceptors.request.use(this.handleRequest);
  }

  private handleRequest(config: InternalAxiosRequestConfig) {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }

  public get<T>(path: string, params?: any): Promise<AxiosResponse<T>> {
    return this.service.get<T>(path, { params });
  }

  public post<T>(path: string, payload: any): Promise<AxiosResponse<T>> {
    return this.service.post<T>(path, payload);
  }

  public put<T>(path: string, payload: any): Promise<AxiosResponse<T>> {
    return this.service.put<T>(path, payload);
  }

  public delete<T>(path: string): Promise<AxiosResponse<T>> {
    return this.service.delete<T>(path);
  }
}

const axiosService = new AxiosService();

export default axiosService;
