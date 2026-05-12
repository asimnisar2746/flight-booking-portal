import { refreshAccessToken } from "./auth";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../utils/token";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  let accessToken = getAccessToken();

  // first request
  let res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // token expired
  if (res.status === 401) {
    try {
      // get new access token
      const data = await refreshAccessToken();

      // save new token
      setAccessToken(data.accessToken);

      accessToken = data.accessToken;

      // retry original request
      res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      removeAccessToken();

      window.location.href = "/login";

      throw new Error("Session expired");
    }
  }

  return res;
};
