import request from "@/request";
import type { IResponse } from "@/request";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  QueryClient,
} from "@tanstack/react-query";
import { ILoginParams, IErrorParams, ILoginResp, IToken } from "@/types";

//登录
const loginApi = `/login`;
export const login = (params: ILoginParams): Promise<IResponse<ILoginResp>> => {
  return request<ILoginParams, ILoginResp>({
    url: loginApi,
    method: "POST",
    data: params,
  });
};

export const useMutationLogin = (
  options?: Omit<
    UseMutationOptions<IResponse<ILoginResp>, IErrorParams, ILoginParams>,
    "mutationFn"
  >,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...options,
      mutationFn: (params: ILoginParams) => {
        return login(params);
      },
    },
    queryClient
  );
};

export const useQueryLogin = (
  params: ILoginParams,
  options?: Omit<
    UseQueryOptions<IResponse<ILoginResp>, IErrorParams>,
    "queryKey" | "queryFn"
  >,
  queryClient?: QueryClient
) => {
  return useQuery(
    {
      ...options,
      queryKey: ["todos", loginApi],
      queryFn: () => {
        return login(params);
      },
    },
    queryClient
  );
};

//是否已经登录
const isLoginApi = `/isLogin`;
export const isLogin = (): Promise<IResponse<boolean>> => {
  return request<{}, boolean>({
    url: isLoginApi,
    method: "GET",
  });
};

export const useMutationisLogin = (
  options?: Omit<
    UseMutationOptions<IResponse<boolean>, IErrorParams>,
    "mutationFn"
  >,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...options,
      mutationFn: () => {
        return isLogin();
      },
    },
    queryClient
  );
};

export const useQueryisLogin = (
  options?: Omit<
    UseQueryOptions<IResponse<boolean>, IErrorParams>,
    "queryKey" | "queryFn"
  >,
  queryClient?: QueryClient
) => {
  return useQuery(
    {
      ...options,
      queryKey: ["todos", isLoginApi],
      queryFn: () => {
        return isLogin();
      },
    },
    queryClient
  );
};

//刷新Token
const refreshApi = `/refresh`;
export const refreshToken = (params: {
  token: string;
}): Promise<IResponse<IToken>> => {
  return request<{ token: string }, IToken>({
    url: refreshApi,
    method: "GET",
    data: params,
  });
};
