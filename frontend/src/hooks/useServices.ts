import { useState, useCallback, useEffect } from "react";
import { servicesApi } from "../api/services/services.api";
import type * as Dtos from '../api/types';

export const useServices = () => {
  const [services, setServices] = useState<Dtos.ServiceDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const [searchParams, setSearchParams] = useState<Dtos.GetPagedServicesDto>({
    term: '',
    pageNumber: 1,
    pageSize: 10,
  });

  const getErrorMessage = (err: any): string => {
    return err?.response?.data?.detail
        || err?.response?.data?.title
        || err?.message
        || 'Unknown error';
  };

  const getServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await servicesApi.searchPaged(searchParams);
      setServices(data.items);
      setTotalCount(data.totalCount);
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  const getServiceById = useCallback(async (id: string): Promise<Dtos.ServiceDto> => {
    setIsLoading(true);
    try {
      return await servicesApi.getById(id);
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createService = async (dto: Dtos.AddServiceDto) => {
    setIsLoading(true);
    try {
      await servicesApi.create(dto);
      await getServices();
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateService = async (dto: Dtos.UpdateServiceDto) => {
    setIsLoading(true);
    try {
      await servicesApi.update(dto);
      await getServices();
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    setIsLoading(true);
    try {
      await servicesApi.delete(id);
      
      if (services.length === 1 && searchParams.pageNumber && searchParams.pageNumber > 1) {
        setSearchParams(prev => ({ ...prev, pageNumber: prev.pageNumber! - 1 }));
      } else {
        await getServices();
      }
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchParams(prev => ({ ...prev, term, pageNumber: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({ ...prev, pageNumber: newPage }));
  };
  
  const handlePageSizeChange = (newPageSize: number) => {
    setSearchParams(prev => ({ ...prev, pageSize: newPageSize, pageNumber: 1 }));
  };

  return {
    services,
    totalCount,
    isLoading,
    error,
    searchParams,
    clearError,

    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
  };
};