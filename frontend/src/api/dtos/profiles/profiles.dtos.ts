export type Roles = 'Patient' | 'Doctor' | 'Administrator' | number;

export interface AccountDto {
  id: string;
  firstname: string;
  lastname: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  role: Roles;
  photoId?: string | null;
}

export interface AdministratorDto {
  id: string;
  accountId: string;
  firstname: string;
  lastname: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  role: Roles;
  photoId?: string | null;
  officeId: string;
  totalExperience: number;
}

export interface CreateAdministratorDto {
  firstname: string;
  lastname: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  password: string;
  photoId?: string | null;
  officeId: string;
  careerStartDate: string;
  gapInMonths: number;
}

export interface EditAdministratorProfileDto {
  id: string;
  firstname: string;
  lastname: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  photoId?: string | null;
  officeId: string;
  careerStartDate: string;
  gapInMonths: number;
}

export interface SearchFilteredAdministratorListDto {
  searchTerm?: string | null;
  officeId?: string | null;
}

export interface SearchPagedAdministratorDto {
  searchTerm?: string | null;
  officeId?: string | null;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateDoctorDto {
  firstname: string;
  lastname: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  password: string;
  officeId: string;
  specializationId: string;
  careerStartDate: string;
  gapInMonths: number;
  photoId?: string | null;
  degree: string;
}

export interface DoctorDto {
  id: string;
  accountId: string;
  firstname: string;
  lastname: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  degree: string;
  role: Roles;
  officeId: string;
  specializationId: string;
  photoId?: string | null;
  totalExperience: number;
}

export interface EditDoctorProfileDto {
  id: string;
  firstname: string;
  lastname: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  photoId?: string | null;
  specializationId?: string | null;
  officeId: string;
  careerStartDate: string;
  gapInMonths: number;
  degree: string;
}

export interface SearchFilteredDoctorListDto {
  searchTerm?: string | null;
  specializationId?: string | null;
  officeId?: string | null;
  minExperienceYears?: number | null;
}

export interface SearchPagedDoctorDto {
  searchTerm?: string | null;
  specializationId?: string | null;
  officeId?: string | null;
  minExperienceYears?: number | null;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateOfficeDto {
  address: string;
  phoneNumber: string;
  photoId?: string | null;
}

export interface EditOfficeInformationDto {
  id: string;
  address: string;
  phoneNumber: string;
  photoId?: string | null;
}

export interface OfficeDto {
  id: string;
  address: string;
  phoneNumber: string;
  photoId?: string | null;
}

export interface SearchPagedOfficeDto {
  searchTerm: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface EditPatientProfileDto {
  id: string;
  firstname: string;
  lastname: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  photoId?: string | null;
}

export interface PatientDto {
  id: string;
  accountId: string;
  firstname: string;
  lastname: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  role: Roles;
  photoId?: string | null;
}

export interface RegisterPatientDto {
  firstname: string;
  lastname: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  photoId?: string | null;
  password: string;
}

export interface SearchFilteredPatientListDto {
  searchTerm?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
}

export interface SearchPagedPatientDto {
  searchTerm?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  pageNumber?: number;
  pageSize?: number;
}

export interface PhotoDto {
  id: string;
  url: string;
}

export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface SearchQueryDto {
  searchTerm: string;
}

export interface CreateSpecializationDto {
  name: string;
}

export interface EditSpecializationInformationDto {
  id: string;
  name: string;
}

export interface SearchPagedSpecializationDto {
  searchTerm: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface SpecializationDto {
  id: string;
  name: string;
}