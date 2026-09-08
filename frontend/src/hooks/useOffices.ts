import { useState, useCallback, useEffect } from "react";
import { officesApi } from "../api/profiles/offices.api";
import type * as Dtos from './../api/types'

export const useOffices = () => {
    const [offices, setOffices] = useState<Dtos.OfficeDto[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [searchParams, setSearchParams] = useState<Dtos.SearchPagedOfficeDto>({
        searchTerm: '',
        pageNumber: 1,
        pageSize: 10,
    });

    const fetchOffices = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await officesApi.searchPaged(searchParams);
            setOffices(data.items);
            setTotalCount(data.totalCount);
        } catch (err: any) {
            setError(err?.message || 'Error during offices loading');
        } finally {
            setIsLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchOffices();
      }, [fetchOffices]);

    const getOfficeById = async (id: string): Promise<Dtos.OfficeDto> => {
        setIsLoading(true);
        try {
          return await officesApi.getById(id);
        } catch (err: any) {
          setError(err?.message || 'Error during office loading');
          throw err;
        } finally {
          setIsLoading(false);
        }
    };

    const createOffice = async (dto: Dtos.CreateOfficeDto) => {
        setIsLoading(true);
        try {
          await officesApi.create(dto);
          await fetchOffices();
        } catch (err: any) {
          setError(err?.message || 'Office creating error');
          throw err;
        } finally {
          setIsLoading(false);
        }
    };
    
    const updateOffice = async (dto: Dtos.EditOfficeInformationDto) => {
        setIsLoading(true);
        try {
          await officesApi.update(dto);
          await fetchOffices();
        } catch (err: any) {
          setError(err?.message || 'Office updating error');
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
            await fetchOffices();
          }
        } catch (err: any) {
          setError(err?.response?.data?.message || err?.message || 'Office deleting error');
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
        offices,
        totalCount,
        isLoading,
        error,
        searchParams,

        fetchOffices,
        getOfficeById,
        createOffice,
        updateOffice,
        deleteOffice,
        
        handleSearchChange,
        handlePageChange,
        handlePageSizeChange,
      };
};