import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { tokenService } from '../services/tokenService';
import { Roles } from '../api/types';

interface JwtPayload {
  sub: string;
  realm_access?: {
    roles: string[];
  };
  exp: number;
}

interface AuthState {
  isAuthenticated: boolean;
  accountId: string | null;
  role: Roles | null;

  login: (accessToken: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  accountId: null,
  role: null,

  login: (accessToken: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      const roles = decoded.realm_access?.roles || [];

      let mainRole: Roles | null = null;
      if (roles.includes('Administrator')) mainRole = Roles.Administrator;
      else if (roles.includes('Doctor')) mainRole = Roles.Doctor;
      else if (roles.includes('Patient')) mainRole = Roles.Patient;

      set({
        isAuthenticated: true,
        accountId: decoded.sub,
        role: mainRole,
      });
    } catch (error) {
      console.error('Failed to decode token', error);
      set({ isAuthenticated: false, accountId: null, role: null });
    }
  },

  logout: () => {
    tokenService.clearTokens();
    set({ isAuthenticated: false, accountId: null, role: null });
  },

  checkAuth: () => {
    const token = tokenService.getAccessToken();
    if (token) {
      get().login(token);
    } else {
      set({ isAuthenticated: false, accountId: null, role: null });
    }
  },
}));