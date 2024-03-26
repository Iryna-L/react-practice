import { Api } from './axios';
import { User } from '@/types';

export type LoginRequest = {
  user: {
    email: string;
    password: string;
  };
};

export type RegisterRequest = {
  user: {
    email: string;
    password: string;
    username: string;
  };
};

export type UpdateUserRequest = {
  user: {
    email?: string;
    password?: string;
    username?: string;
    bio?: string;
    image?: string;
  };
};

export type UserResponse = {
  user: User;
};

export const loginApi = (data: LoginRequest) => Api.post<UserResponse>('/users/login', data);
export const registerApi = (data: RegisterRequest) => Api.post<UserResponse>('/users', data);
export const getUserApi = () => Api.get<UserResponse>('/user');
export const updateUserApi = (data: UpdateUserRequest) => Api.put<UserResponse>('/user', data);
