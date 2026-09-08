import { apiClient } from './../axios';
import type * as Dtos from './../types';

export const photosApi = {
  upload: async (file: File): Promise<Dtos.PhotoDto> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<Dtos.PhotoDto>('/photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/photos/${id}`);
  },

  getById: async (id: string): Promise<Blob> => {
    const response = await apiClient.get<Blob>(`/photos/${id}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};