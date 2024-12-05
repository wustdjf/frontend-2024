import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

export interface RequestInterceptors<T, D> {
  // 请求拦截
  requestInterceptors?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (config: T) => D;
  responseInterceptorsCatch?: (err: any) => any;
}
// 自定义传入的参数
export interface CreateRequestConfig<
  T = AxiosResponse & { url?: string },
  D = any
> extends CreateAxiosDefaults {
  interceptors?: RequestInterceptors<T, D>;
}
export interface RequestConfig<T = AxiosResponse & { url?: string }, D = any>
  extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T, D>;
}
export interface CancelRequestSource {
  [index: string]: () => void;
}
