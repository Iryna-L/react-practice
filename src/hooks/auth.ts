import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  loginApi,
  LoginRequest,
  RegisterRequest,
  registerApi,
  getUserApi,
  updateUserApi,
  UserResponse,
  UpdateUserRequest,
} from '@/api/auth';
import { ResponseErrors } from '@/types';
import { RouterConfig } from '@/constants/routes';

export function useLoginMutation() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  return useMutation<AxiosResponse<UserResponse>, AxiosError<ResponseErrors, null>, LoginRequest>({
    mutationFn: loginApi,
    onSuccess: (res) => {
      localStorage.setItem('token', res.data.user.token);
      qc.setQueryData(['user'], res);
      navigate(RouterConfig.Home);
    },
  });
}

export function useRegisterMutation() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  return useMutation<
    AxiosResponse<UserResponse>,
    AxiosError<ResponseErrors, null>,
    RegisterRequest
  >({
    mutationFn: registerApi,
    onSuccess: (res) => {
      localStorage.setItem('token', res.data.user.token);
      qc.setQueryData(['user'], res);
      navigate(RouterConfig.Home);
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return () => {
    localStorage.removeItem('token');
    qc.setQueryData(['user'], null);
  };
}

export function useGetUserQuery() {
  const query = useQuery({
    queryFn: getUserApi,
    queryKey: ['user'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: Infinity,
  });

  return {
    ...query,
    isAuthenticated: !!query.data?.data.user,
  };
}

export function useUpdateUserMutation() {
  const qc = useQueryClient();
  return useMutation<
    AxiosResponse<UserResponse>,
    AxiosError<ResponseErrors, null>,
    UpdateUserRequest
  >({
    mutationFn: updateUserApi,
    onSuccess: (res) => {
      qc.setQueryData(['user'], res);
    },
  });
}
