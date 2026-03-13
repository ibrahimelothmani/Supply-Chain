import api from './api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

export interface ApiResponse<T> {
  timestamp: string;
  status: number;
  message: string;
  data: T;
  errors: Record<string, string> | null;
}

const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<string>> => {
    const response = await api.post<ApiResponse<string>>('/auth/register', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): { username: string; role: string } | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
