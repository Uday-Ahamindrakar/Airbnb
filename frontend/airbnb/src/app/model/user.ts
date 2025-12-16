import { Role } from './role';
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  created_at: string; // ISO date string from backend
  roles: Role[];
}
