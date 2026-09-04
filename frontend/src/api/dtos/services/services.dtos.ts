export interface PagedResult<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  }
  
  export interface SearchByTermDto {
    term: string;
  }
  
  export interface DoctorDto {
    id: string;
    firstname: string;
    lastname: string;
    photoId?: string | null;
  }
 
  export interface ServiceCategoryDto {
    id: string;
    name: string;
    duration: string;
  }
  
  export interface AddServiceCategoryDto {
    name: string;
    duration: string;
  }
  
  export interface UpdateServiceCategoryDto {
    id: string;
    name: string;
    duration: string;
  }
  
  export interface GetPagedServiceCategoriesDto {
    term?: string | null;
    pageNumber?: number;
    pageSize?: number;
  }
  
  export interface ServiceDto {
    id: string;
    specializationId: string;
    serviceCategoryId: string;
    name: string;
    price: number;
    doctors: DoctorDto[];
  }
  
  export interface AddServiceDto {
    specializationId: string;
    serviceCategoryId: string;
    name: string;
    price: number;
  }
  
  export interface UpdateServiceDto {
    id: string;
    specializationId: string;
    serviceCategoryId: string;
    name: string;
    price: number;
  }
  
  export interface GetPagedServicesDto {
    term?: string | null;
    pageNumber?: number;
    pageSize?: number;
  }