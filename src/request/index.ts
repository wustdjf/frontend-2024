import Request from "./axios-request";
import { AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import type { RequestConfig } from "./tools";
import { refreshToken } from "@/queries";
import { message } from "antd";

export interface IResponse<T> {
  statusCode: number;
  desc: string;
  result: T;
}

// 重写返回类型
interface IRequestConfig<T, R> extends RequestConfig<IResponse<R>> {
  data?: T;
}

interface PendingTask {
  config: InternalAxiosRequestConfig;
  resolve: (value: unknown) => void;
}
let refreshing = false;
const queue: PendingTask[] = [];

const request = new Request({
  baseURL: "http://localhost:3000",
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求成功拦截器
    requestInterceptors: (config) => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers.authorization = "Bearer " + accessToken;
      }
      return config;
    },
    // 请求失败拦截器
    requestInterceptorsCatch: () => {},
    // 响应成功拦截器
    responseInterceptors: (res: AxiosResponse) => {
      return res;
    },
    // 响应失败拦截器
    responseInterceptorsCatch: async (error) => {
      const { data, config } = error.response;

      if (refreshing) {
        return new Promise((resolve) => {
          queue.push({ config, resolve });
        });
      }

      if (data.statusCode === 401 && !config.url.includes("/refresh")) {
        refreshing = true;
        const res = await refreshToken({
          token: localStorage.getItem("refresh_token") as string,
        });
        refreshing = false;

        if (res.statusCode === 200) {
          const { accessToken, refreshToken } = res.result || {};
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);

          queue.forEach(({ config, resolve }) => {
            resolve(FuncRequest(config));
          });

          return FuncRequest(config);
        } else {
          message.error("登录过期，请重新登录");
          window.location.replace("/login");
        }
      } else {
        return error.response;
      }
    },
  },
});

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {IRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
export const FuncRequest = <D = any, T = any>(config: IRequestConfig<D, T>) => {
  const { method = "GET" } = config;
  if (method === "get" || method === "GET") {
    config.params = config.data;
  }
  return request.request<IResponse<T>>(config);
};

// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};

// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default FuncRequest;
