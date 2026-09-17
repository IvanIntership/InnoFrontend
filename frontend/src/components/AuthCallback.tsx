import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuthActions';

export const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { exchangeCode, isLoading, error } = useAuthActions();

  const isProcessed = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code && !isProcessed.current) {
      isProcessed.current = true;
      exchangeCode(code)
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch(() => {
          
        });
    }
  }, [searchParams, exchangeCode, navigate]);

  if (error) {
    return <div>Login error: {error}</div>;
  }

  if (isLoading) {
    return <div>Authorizing... Please wait.</div>;
  }

  return <div>Redirecting...</div>;
};