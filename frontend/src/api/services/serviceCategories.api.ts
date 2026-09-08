import { apiClient } from "./../axios";
import type * as Dtos from './../types';

export const serviceCategoriesApi = {
  create: async (dto: Dtos.AddServiceCategoryDto): Promise<Dtos.ServiceCategoryDto> => {
    const response = await apiClient.post<Dtos.ServiceCategoryDto>('/servicecategories', dto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/servicecategories/${id}`);
  },

  update: async (dto: Dtos.UpdateServiceCategoryDto): Promise<Dtos.ServiceCategoryDto> => {
    const response = await apiClient.put<Dtos.ServiceCategoryDto>('/servicecategories', dto);
    return response.data;
  },

  getById: async (id: string): Promise<Dtos.ServiceCategoryDto> => {
    const response = await apiClient.get<Dtos.ServiceCategoryDto>(`/servicecategories/${id}`);
    return response.data;
  },

  getAll: async (): Promise<Dtos.ServiceCategoryDto[]> => {
    const response = await apiClient.get<Dtos.ServiceCategoryDto[]>('/servicecategories');
    return response.data;
  },

  searchByTerm: async (dto: Dtos.SearchByTermDto): Promise<Dtos.ServiceCategoryDto[]> => {
    const response = await apiClient.post<Dtos.ServiceCategoryDto[]>('/servicecategories/searchByTerm', dto);
    return response.data;
  }
};