import { apiClient } from "./../axios";
import type * as Dtos from './../types';

export const servicesApi = {
  create: async (dto: Dtos.AddServiceDto): Promise<Dtos.ServiceDto> => {
    const response = await apiClient.post<Dtos.ServiceDto>('/services', dto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/services/${id}`);
  },

  update: async (dto: Dtos.UpdateServiceDto): Promise<Dtos.ServiceDto> => {
    const response = await apiClient.put<Dtos.ServiceDto>('/services', dto);
    return response.data;
  },

  getById: async (id: string): Promise<Dtos.ServiceDto> => {
    const response = await apiClient.get<Dtos.ServiceDto>(`/services/${id}`);
    return response.data;
  },

  getByCategoryId: async (categoryId: string): Promise<Dtos.ServiceDto[]> => {
    const response = await apiClient.get<Dtos.ServiceDto[]>(`/services/category/${categoryId}`);
    return response.data;
  },

  getBySpecializationId: async (specializationId: string): Promise<Dtos.ServiceDto[]> => {
    const response = await apiClient.get<Dtos.ServiceDto[]>(`/services/specialization/${specializationId}`);
    return response.data;
  },

  getAll: async (): Promise<Dtos.ServiceDto[]> => {
    const response = await apiClient.get<Dtos.ServiceDto[]>('/services');
    return response.data;
  },

  searchByTerm: async (dto: Dtos.SearchByTermDto): Promise<Dtos.ServiceDto[]> => {
    const response = await apiClient.post<Dtos.ServiceDto[]>('/services/searchByTerm', dto);
    return response.data;
  },

  searchPaged: async (dto: Dtos.GetPagedServicesDto): Promise<Dtos.PagedResult<Dtos.ServiceDto>> => {
    const response = await apiClient.post<Dtos.PagedResult<Dtos.ServiceDto>>('/services/search/paged', dto);
    return response.data;
  }
};