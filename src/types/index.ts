export interface IErrorParams {
  error?: string;
  message?: string;
}

export interface ILoginParams {
  username: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResp {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    username: string;
    email: string;
  };
}

export type SortOrder = "descend" | "ascend" | null;

export type ValueOf<T> = T[keyof T];
