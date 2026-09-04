export type Roles = 'Patient' | 'Doctor' | 'Administrator' | number;

export interface LogInUserRequest {
  username: string;
  password: string;
}

export interface LogOutUserRequest {
  code: string;
}

export interface RegisterUserRequest {
  username: string;
  password: string;
  email: string;
  role: Roles;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

export interface AdminTokenResponse {
  adminToken: string;
}