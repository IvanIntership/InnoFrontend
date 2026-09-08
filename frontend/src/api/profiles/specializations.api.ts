import { apiClient } from './../axios';
import type * as Dtos from './../types';

export const specializationsApi = {
  create: async (dto: Dtos.CreateSpecializationDto): Promise<Dtos.SpecializationDto> => {
    const response = await apiClient.post<Dtos.SpecializationDto>('/specializations', dto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/specializations/${id}`);
  },

  update: async (dto: Dtos.EditSpecializationInformationDto): Promise<void> => {
    await apiClient.put('/specializations', dto);
  },

  getById: async (id: string): Promise<Dtos.SpecializationDto> => {
    const response = await apiClient.get<Dtos.SpecializationDto>(`/specializations/${id}`);
    return response.data;
  },

  search: async (dto: Dtos.SearchQueryDto): Promise<Dtos.SpecializationDto[]> => {
    const response = await apiClient.post<Dtos.SpecializationDto[]>('/specializations/search', dto);
    return response.data;
  }
};