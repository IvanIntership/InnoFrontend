import { useState, useCallback, useEffect } from "react";
import { officesApi } from "../api/profiles/offices.api";
import { photosApi } from "../api/profiles/photos.api";
import type * as Dtos from './../api/types';

export const useOffices = () => {
  const [offices, setOffices] = useState<Dtos.OfficeDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const clearError = () => setError(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useState<Dtos.SearchPagedOfficeDto>({
    searchTerm: '',
    pageNumber: 1,
    pageSize: 10,
  });

  const getOffices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await officesApi.searchPaged(searchParams);
      setOffices(data.items);
      setTotalCount(data.totalCount);
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getOffices();
  }, [getOffices]);

  const getOfficeById = async (id: string): Promise<Dtos.OfficeDto> => {
    setIsLoading(true);
    try {
      return await officesApi.getById(id);
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createOffice = async (dto: Dtos.CreateOfficeDto, file?: File | null) => {
    setIsLoading(true);
    try {
      let photoId = dto.photoId;

      if (file) {
        const photo = await photosApi.upload(file);
        photoId = photo.id;
      }

      await officesApi.create({ ...dto, photoId });
      await getOffices();
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOffice = async (dto: Dtos.EditOfficeInformationDto, file?: File | null) => {
    setIsLoading(true);
    try {
      let photoId = dto.photoId;
      
      if (file) {
        const photo = await photosApi.upload(file);
        photoId = photo.id;
      }

      await officesApi.update({ ...dto, photoId });
      await getOffices();
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOffice = async (id: string) => {
    setIsLoading(true);
    try {
      await officesApi.delete(id);
      
      if (offices.length === 1 && searchParams.pageNumber && searchParams.pageNumber > 1) {
        setSearchParams(prev => ({ ...prev, pageNumber: prev.pageNumber! - 1 }));
      } else {
        await getOffices();
      }
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchParams(prev => ({ ...prev, searchTerm, pageNumber: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({ ...prev, pageNumber: newPage }));
  };
  
  const handlePageSizeChange = (newPageSize: number) => {
    setSearchParams(prev => ({ ...prev, pageSize: newPageSize, pageNumber: 1 }));
  };

  const getErrorMessage = (err: any): string => {
    return err?.response?.data?.detail
        || err?.response?.data?.title
        || err?.message
        || 'Unknown error';
  };

  return {
    offices,
    totalCount,
    isLoading,
    error,
    searchParams,
    clearError,

    getOffices,
    getOfficeById,
    createOffice,
    updateOffice,
    deleteOffice,
    
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
  };
};