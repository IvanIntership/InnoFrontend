import { useState } from 'react';
import { authApi } from '../api/auth/auth.api';
import { Roles, type RegisterUserRequest } from '../api/types';

export const useRegisterPatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const register = async (data: Omit<RegisterUserRequest, 'role'>) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const parsedDate = data.birthday ? new Date(data.birthday) : null;
      const formattedBirthday = parsedDate && !isNaN(parsedDate.getTime())
        ? parsedDate.toISOString()
        : new Date().toISOString();

      await authApi.register({
        ...data,
        birthday: formattedBirthday,
        role: Roles.Patient,
      });

      setIsSuccess(true);
    } catch (err: any) {
      const responseData = err.response?.data;

      if (typeof responseData === 'string') {
        setError(responseData);
      } else if (responseData?.errors && typeof responseData.errors === 'object') {
        const firstKey = Object.keys(responseData.errors)[0];
        const firstErrorArray = responseData.errors[firstKey];
        const firstErrorMessage = Array.isArray(firstErrorArray) ? firstErrorArray[0] : null;

        setError(firstErrorMessage || 'Invalid form data');
      } else if (responseData?.title) {
        setError(responseData.title);
      } else {
        setError(err.message || 'Registration failure');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error, isSuccess };
};