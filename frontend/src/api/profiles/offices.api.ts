import { apiClient } from './../axios';
import type * as Dtos from './../types';

export const officesApi = {
  create: async (dto: Dtos.CreateOfficeDto): Promise<Dtos.OfficeDto> => {
    const response = await apiClient.post<Dtos.OfficeDto>('/offices', dto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/offices/${id}`);
  },

  update: async (dto: Dtos.EditOfficeInformationDto): Promise<void> => {
    await apiClient.put('/offices', dto);
  },

  getById: async (id: string): Promise<Dtos.OfficeDto> => {
    const response = await apiClient.get<Dtos.OfficeDto>(`/offices/${id}`);
    return response.data;
  },

  search: async (dto: Dtos.SearchQueryDto): Promise<Dtos.OfficeDto[]> => {
    const response = await apiClient.post<Dtos.OfficeDto[]>('/offices/search', dto);
    return response.data;
  },

  searchPaged: async (dto: Dtos.SearchPagedOfficeDto): Promise<Dtos.PagedResult<Dtos.OfficeDto>> => {
    const response = await apiClient.post<Dtos.PagedResult<Dtos.OfficeDto>>('/offices/search/paged', dto);
    return response.data;
  }
};