import { apiClient } from "./axios";

import type {
    AddServiceCategoryDto,
    UpdateServiceCategoryDto,
    ServiceCategoryDto,
    AddServiceDto,
    UpdateServiceDto,
    ServiceDto,
    SearchByTermDto
} from './dtos/services/services.dtos';

export const serviceCategoriesApi = {
    create: async (dto: AddServiceCategoryDto): Promise<ServiceCategoryDto> => {
        const response = await apiClient.post<ServiceCategoryDto>('/servicecategories', dto);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/servicecategories/${id}`);
    },
    
    update: async (dto: UpdateServiceCategoryDto): Promise<ServiceCategoryDto> => {
        const response = await apiClient.put<ServiceCategoryDto>('/servicecategories', dto);
        return response.data;
    },
    
    getById: async (id: string): Promise<ServiceCategoryDto> => {
        const response = await apiClient.get<ServiceCategoryDto>(`/servicecategories/${id}`);
        return response.data;
    },
    
    getAll: async (): Promise<ServiceCategoryDto[]> => {
        const response = await apiClient.get<ServiceCategoryDto[]>('/servicecategories');
        return response.data;
    },
    
    searchByTerm: async (dto: SearchByTermDto): Promise<ServiceCategoryDto[]> => {
        const response = await apiClient.post<ServiceCategoryDto[]>('/servicecategories/searchByTerm', dto);
        return response.data;
    }
};

export const servicesApi = {
    create: async (dto: AddServiceDto): Promise<ServiceDto> => {
      const response = await apiClient.post<ServiceDto>('/services', dto);
      return response.data;
    },
  
    delete: async (id: string): Promise<void> => {
      await apiClient.delete(`/services/${id}`);
    },
  
    update: async (dto: UpdateServiceDto): Promise<ServiceDto> => {
      const response = await apiClient.put<ServiceDto>('/services', dto);
      return response.data;
    },
  
    getById: async (id: string): Promise<ServiceDto> => {
      const response = await apiClient.get<ServiceDto>(`/services/${id}`);
      return response.data;
    },
  
    getByCategoryId: async (categoryId: string): Promise<ServiceDto[]> => {
      const response = await apiClient.get<ServiceDto[]>(`/services/category/${categoryId}`);
      return response.data;
    },
  
    getBySpecializationId: async (specializationId: string): Promise<ServiceDto[]> => {
      const response = await apiClient.get<ServiceDto[]>(`/services/specialization/${specializationId}`);
      return response.data;
    },
  
    getAll: async (): Promise<ServiceDto[]> => {
      const response = await apiClient.get<ServiceDto[]>('/services');
      return response.data;
    },
  
    searchByTerm: async (dto: SearchByTermDto): Promise<ServiceDto[]> => {
      const response = await apiClient.post<ServiceDto[]>('/services/searchByTerm', dto);
      return response.data;
    }
};