export interface User{
  userId: string;
  email: string;
  username: string;
  isActive: boolean;
  isAdmin: boolean;
  roles: string[];
}