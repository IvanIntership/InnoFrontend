import { apiClient } from './axios';
import type {
  RegisterUserRequest,
  LogOutUserRequest,
  TokenResponse
} from './dtos/auth/auth.dtos';

export const authApi = {
  register: async (dto: RegisterUserRequest): Promise<boolean> => {
    const response = await apiClient.post<boolean>('/auth/register', dto);
    return response.data;
  },

  login: async (): Promise<void> => {
    await apiClient.get('/auth/login');
  },

  exchangeCode: async (code: string): Promise<TokenResponse> => {
    const response = await apiClient.get<TokenResponse>('/auth/exchange-code', {
      params: { code }
    });
    return response.data;
  },

  logout: async (dto: LogOutUserRequest): Promise<void> => {
    await apiClient.post('/auth/logout', dto);
  }
};