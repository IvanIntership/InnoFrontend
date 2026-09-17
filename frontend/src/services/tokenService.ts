import type { TokenResponse } from '../api/types';

let inMemoryAccessToken: string | null = null;
let inMemoryRefreshToken: string | null = null;

export const tokenService = {
  setTokens: (tokens: TokenResponse) => {
    inMemoryAccessToken = tokens.access_token;
    inMemoryRefreshToken = tokens.refresh_token;
  },
  
  getAccessToken: () => inMemoryAccessToken,
  getRefreshToken: () => inMemoryRefreshToken,
  
  clearTokens: () => {
    inMemoryAccessToken = null;
    inMemoryRefreshToken = null;
  }
};