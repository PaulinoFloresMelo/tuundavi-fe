import { User } from "./user.interface";


export interface AuthResponse{
  user: User;
  refresh: string;
  token: string;
}

export interface LoginBadRequest{
  error: string;
  status: string;
}