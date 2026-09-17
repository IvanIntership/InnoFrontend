import { apiClient } from './../axios';
import type * as Dtos from './../types';

export const doctorsApi = {
  
  create: async (dto: Dtos.CreateDoctorDto): Promise<Dtos.DoctorDto> => {
    const response = await apiClient.post<Dtos.DoctorDto>('/doctors', dto);
    return response.data;
  },

  update: async (dto: Dtos.EditDoctorProfileDto): Promise<Dtos.DoctorDto> => {
    const response = await apiClient.put<Dtos.DoctorDto>('/doctors', dto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/doctors/${id}`);
  },

  getById: async (id: string): Promise<Dtos.DoctorDto> => {
    const response = await apiClient.get<Dtos.DoctorDto>(`/doctors/${id}`);
    return response.data;
  },

  getByAccountId: async (accountId: string): Promise<Dtos.DoctorDto> => {
    const response = await apiClient.get<Dtos.DoctorDto>(`/doctors/accounts/${accountId}`);
    return response.data;
  },

  search: async (dto: Dtos.SearchFilteredDoctorListDto): Promise<Dtos.DoctorDto[]> => {
    const response = await apiClient.post<Dtos.DoctorDto[]>('/doctors/search', dto);
    return response.data;
  },

  searchPaged: async (dto: Dtos.SearchPagedDoctorDto): Promise<Dtos.PagedResult<Dtos.DoctorDto>> => {
    const response = await apiClient.post<Dtos.PagedResult<Dtos.DoctorDto>>('/doctors/search/paged', dto);
    return response.data;
  }
};