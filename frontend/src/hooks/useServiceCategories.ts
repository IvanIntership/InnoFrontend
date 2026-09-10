import { useState, useCallback, useEffect } from "react";
import { serviceCategoriesApi } from "../api/services/serviceCategories.api";
import type * as Dtos from './../api/types';

export const useServiceCategories = () => {
  const [categories, setCategories] = useState<Dtos.ServiceCategoryDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const [searchParams, setSearchParams] = useState<Dtos.GetPagedServiceCategoriesDto>({
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

  const getCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await serviceCategoriesApi.searchPaged(searchParams);
      setCategories(data.items);
      setTotalCount(data.totalCount);
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // ОБЕРНУЛИ В useCallback, ЧТОБЫ НЕ БЫЛО БЕСКОНЕЧНОГО ЦИКЛА RE-RENDER
  const getCategoryById = useCallback(async (id: string): Promise<Dtos.ServiceCategoryDto> => {
    setIsLoading(true);
    try {
      return await serviceCategoriesApi.getById(id);
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCategory = async (dto: Dtos.AddServiceCategoryDto) => {
    setIsLoading(true);
    try {
      await serviceCategoriesApi.create(dto);
      await getCategories();
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (dto: Dtos.UpdateServiceCategoryDto) => {
    setIsLoading(true);
    try {
      await serviceCategoriesApi.update(dto);
      await getCategories();
    } catch (err: any) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setIsLoading(true);
    try {
      await serviceCategoriesApi.delete(id);
      
      if (categories.length === 1 && searchParams.pageNumber && searchParams.pageNumber > 1) {
        setSearchParams(prev => ({ ...prev, pageNumber: prev.pageNumber! - 1 }));
      } else {
        await getCategories();
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
  
  return {
    categories,
    totalCount,
    isLoading,
    error,
    searchParams,
    clearError,

    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    
    handleSearchChange,
    handlePageChange,
  };
};