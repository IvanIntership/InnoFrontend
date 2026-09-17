import { apiClient } from '../../api/axios';
import type * as Dtos from '../../api/types';
import { tokenService } from '../../services/tokenService';

export const authApi = {
  register: async (dto: Dtos.RegisterUserRequest): Promise<boolean> => {
    const response = await apiClient.post<boolean>('/auth/register', dto);
    return response.data;
  },

  loginRedirect: async (): Promise<void> => {
    const response = await apiClient.get<string>('/auth/login');
    window.location.href = response.data;
  },

  exchangeCode: async (code: string): Promise<Dtos.TokenResponse> => {
    const response = await apiClient.get<Dtos.TokenResponse>('/auth/exchange-code', {
      params: { code }
    });
    tokenService.setTokens(response.data);
    return response.data;
  },

  refreshToken: async (dto: Dtos.RefreshTokenRequest): Promise<Dtos.TokenResponse> => {
    const response = await apiClient.post<Dtos.TokenResponse>('/auth/refresh', dto);
    tokenService.setTokens(response.data);
    return response.data;
  },

  logout: async (dto: Dtos.LogOutUserRequest): Promise<void> => {
    await apiClient.post('/auth/logout', dto);
    tokenService.clearTokens();
  }
};