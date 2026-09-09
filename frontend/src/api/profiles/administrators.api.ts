import { apiClient } from './../axios';
import type * as Dtos from './../types';

export const administratorsApi = {
  create: async (dto: Dtos.CreateAdministratorDto, userId: string): Promise<Dtos.AdministratorDto> => {
    const response = await apiClient.post<Dtos.AdministratorDto>('/administrators', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/administrators/${id}`);
  },

  update: async (dto: Dtos.EditAdministratorProfileDto, userId: string): Promise<Dtos.AdministratorDto> => {
    const response = await apiClient.put<Dtos.AdministratorDto>('/administrators', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<Dtos.AdministratorDto> => {
    const response = await apiClient.get<Dtos.AdministratorDto>(`/administrators/${id}`);
    return response.data;
  },

  getByAccountId: async (accountId: string): Promise<Dtos.AdministratorDto> => {
    const response = await apiClient.get<Dtos.AdministratorDto>(`/administrators/accounts/${accountId}`);
    return response.data;
  },

  search: async (dto: Dtos.SearchFilteredAdministratorListDto): Promise<Dtos.AdministratorDto[]> => {
    const response = await apiClient.post<Dtos.AdministratorDto[]>('/administrators/search', dto);
    return response.data;
  },

  searchPaged: async (dto: Dtos.SearchPagedAdministratorDto): Promise<Dtos.PagedResult<Dtos.AdministratorDto>> => {
    const response = await apiClient.post<Dtos.PagedResult<Dtos.AdministratorDto>>('/administrators/search/paged', dto);
    return response.data;
  }
};