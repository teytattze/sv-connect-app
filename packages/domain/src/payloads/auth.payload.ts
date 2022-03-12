export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRefreshAccessPayload {
  accessToken?: string;
  refreshToken?: string;
}
