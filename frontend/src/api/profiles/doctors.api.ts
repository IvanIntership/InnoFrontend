import { apiClient } from './../axios';
import type * as Dtos from './../types';

export const doctorsApi = {
  create: async (dto: Dtos.CreateDoctorDto, userId: string): Promise<Dtos.DoctorDto> => {
    const response = await apiClient.post<Dtos.DoctorDto>('/doctors', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/doctors/${id}`);
  },

  update: async (dto: Dtos.EditDoctorProfileDto, userId: string): Promise<Dtos.DoctorDto> => {
    const response = await apiClient.put<Dtos.DoctorDto>('/doctors', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
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
  }
};