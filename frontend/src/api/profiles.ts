import { apiClient } from './axios';
import type {
  AdministratorDto, CreateAdministratorDto, EditAdministratorProfileDto, SearchFilteredAdministratorListDto,
  DoctorDto, CreateDoctorDto, EditDoctorProfileDto, SearchFilteredDoctorListDto,
  OfficeDto, CreateOfficeDto, EditOfficeInformationDto,
  PatientDto, RegisterPatientDto, EditPatientProfileDto, SearchFilteredPatientListDto,
  PhotoDto,
  SpecializationDto, CreateSpecializationDto, EditSpecializationInformationDto, SearchQueryDto
} from './dtos/profiles/profiles.dtos';

export const administratorsApi = {
  create: async (dto: CreateAdministratorDto, userId: string): Promise<AdministratorDto> => {
    const response = await apiClient.post<AdministratorDto>('/administrators', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/administrators/${id}`);
  },

  update: async (dto: EditAdministratorProfileDto, userId: string): Promise<AdministratorDto> => {
    const response = await apiClient.put<AdministratorDto>('/administrators', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<AdministratorDto> => {
    const response = await apiClient.get<AdministratorDto>(`/administrators/${id}`);
    return response.data;
  },

  getByAccountId: async (accountId: string): Promise<AdministratorDto> => {
    const response = await apiClient.get<AdministratorDto>(`/administrators/accounts/${accountId}`);
    return response.data;
  },

  search: async (dto: SearchFilteredAdministratorListDto): Promise<AdministratorDto[]> => {
    const response = await apiClient.post<AdministratorDto[]>('/administrators/search', dto);
    return response.data;
  }
};

export const doctorsApi = {
  create: async (dto: CreateDoctorDto, userId: string): Promise<DoctorDto> => {
    const response = await apiClient.post<DoctorDto>('/doctors', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/doctors/${id}`);
  },

  update: async (dto: EditDoctorProfileDto, userId: string): Promise<DoctorDto> => {
    const response = await apiClient.put<DoctorDto>('/doctors', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<DoctorDto> => {
    const response = await apiClient.get<DoctorDto>(`/doctors/${id}`);
    return response.data;
  },

  getByAccountId: async (accountId: string): Promise<DoctorDto> => {
    const response = await apiClient.get<DoctorDto>(`/doctors/accounts/${accountId}`);
    return response.data;
  },

  search: async (dto: SearchFilteredDoctorListDto): Promise<DoctorDto[]> => {
    const response = await apiClient.post<DoctorDto[]>('/doctors/search', dto);
    return response.data;
  }
};

export const officesApi = {
  create: async (dto: CreateOfficeDto): Promise<OfficeDto> => {
    const response = await apiClient.post<OfficeDto>('/offices', dto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/offices/${id}`);
  },

  update: async (dto: EditOfficeInformationDto): Promise<void> => {
    await apiClient.put('/offices', dto);
  },

  getById: async (id: string): Promise<OfficeDto> => {
    const response = await apiClient.get<OfficeDto>(`/offices/${id}`);
    return response.data;
  },

  search: async (dto: SearchQueryDto): Promise<OfficeDto[]> => {
    const response = await apiClient.post<OfficeDto[]>('/offices/search', dto);
    return response.data;
  }
};

export const patientsApi = {
  create: async (dto: RegisterPatientDto, userId: string): Promise<PatientDto> => {
    const response = await apiClient.post<PatientDto>('/patients', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/patients/${id}`);
  },

  update: async (dto: EditPatientProfileDto, userId: string): Promise<PatientDto> => {
    const response = await apiClient.put<PatientDto>('/patients', dto, {
      headers: { 'X-User-Id': userId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<PatientDto> => {
    const response = await apiClient.get<PatientDto>(`/patients/${id}`);
    return response.data;
  },

  getByAccountId: async (accountId: string): Promise<PatientDto> => {
    const response = await apiClient.get<PatientDto>(`/patients/accounts/${accountId}`);
    return response.data;
  },

  search: async (dto: SearchFilteredPatientListDto): Promise<PatientDto[]> => {
    const response = await apiClient.post<PatientDto[]>('/patients/search', dto);
    return response.data;
  }
};

export const photosApi = {
  upload: async (file: File): Promise<PhotoDto> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<PhotoDto>('/photos', formData, {
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

export const specializationsApi = {
  create: async (dto: CreateSpecializationDto): Promise<SpecializationDto> => {
    const response = await apiClient.post<SpecializationDto>('/specializations', dto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/specializations/${id}`);
  },

  update: async (dto: EditSpecializationInformationDto): Promise<void> => {
    await apiClient.put('/specializations', dto);
  },

  getById: async (id: string): Promise<SpecializationDto> => {
    const response = await apiClient.get<SpecializationDto>(`/specializations/${id}`);
    return response.data;
  },

  search: async (dto: SearchQueryDto): Promise<SpecializationDto[]> => {
    const response = await apiClient.post<SpecializationDto[]>('/specializations/search', dto);
    return response.data;
  }
};