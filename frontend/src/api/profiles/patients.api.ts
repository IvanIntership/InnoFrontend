import { apiClient } from './../axios';
import type * as Dtos from './../types';

export const patientsApi = {
  create: async (dto: Dtos.RegisterPatientDto, userId: string): Promise<Dtos.PatientDto> => {
    const response = await apiClient.post<Dtos.PatientDto>('/patients', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/patients/${id}`);
  },

  update: async (dto: Dtos.EditPatientProfileDto, userId: string): Promise<Dtos.PatientDto> => {
    const response = await apiClient.put<Dtos.PatientDto>('/patients', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<Dtos.PatientDto> => {
    const response = await apiClient.get<Dtos.PatientDto>(`/patients/${id}`);
    return response.data;
  },

  getByAccountId: async (accountId: string): Promise<Dtos.PatientDto> => {
    const response = await apiClient.get<Dtos.PatientDto>(`/patients/accounts/${accountId}`);
    return response.data;
  },

  search: async (dto: Dtos.SearchFilteredPatientListDto): Promise<Dtos.PatientDto[]> => {
    const response = await apiClient.post<Dtos.PatientDto[]>('/patients/search', dto);
    return response.data;
  },

  searchPaged: async (dto: Dtos.SearchPagedPatientDto): Promise<Dtos.PagedResult<Dtos.PatientDto>> => {
    const response = await apiClient.post<Dtos.PagedResult<Dtos.PatientDto>>('/patients/search/paged', dto);
    return response.data;
  }
};