import { useState, useCallback, useEffect } from "react";
import { specializationsApi } from "../api/profiles/specializations.api";
import type * as Dtos from '../api/types';

export const useSpecializations = () => {
  const [specializations, setSpecializations] = useState<Dtos.SpecializationDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const [searchParams, setSearchParams] = useState<Dtos.SearchPagedSpecializationDto>({
    searchTerm: '',
    pageNumber: 1,
    pageSize: 10,
  });

  const getErrorMessage = (err: any): string => {
    return err?.response?.data?.detail
        || err?.response?.data?.title
        || err?.message
        || 'Unknown error';
  };

  const getSpecializations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await specializationsApi.searchPaged(searchParams);
      setSpecializations(data.items);
      setTotalCount(data.totalCount);
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getSpecializations();
  }, [getSpecializations]);

  const getSpecializationById = useCallback(async (id: string): Promise<Dtos.SpecializationDto> => {
    setIsLoading(true);
    try {
      return await specializationsApi.getById(id);
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createSpecialization = async (dto: Dtos.CreateSpecializationDto) => {
    setIsLoading(true);
    try {
      await specializationsApi.create(dto);
      await getSpecializations();
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSpecialization = async (dto: Dtos.EditSpecializationInformationDto) => {
    setIsLoading(true);
    try {
      await specializationsApi.update(dto);
      await getSpecializations();
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSpecialization = async (id: string) => {
    setIsLoading(true);
    try {
      await specializationsApi.delete(id);
      
      if (specializations.length === 1 && searchParams.pageNumber && searchParams.pageNumber > 1) {
        setSearchParams(prev => ({ ...prev, pageNumber: prev.pageNumber! - 1 }));
      } else {
        await getSpecializations();
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

  return {
    specializations,
    totalCount,
    isLoading,
    error,
    searchParams,
    clearError,

    getSpecializations,
    getSpecializationById,
    createSpecialization,
    updateSpecialization,
    deleteSpecialization,
    
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
  };
};