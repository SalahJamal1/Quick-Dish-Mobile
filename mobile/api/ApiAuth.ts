import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";
let baseURL: string = "";
if (Platform.OS === "android") {
  baseURL = "http://10.0.2.2:5288/api/";
} else {
  baseURL = "http://192.168.1.12:5288/api/";
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export async function ApiLogin(data: any) {
  const res = await api.post("auth/login", data);

  return res;
}
export async function ApiLogout() {
  const res = await api.get("auth/logout");

  return res;
}
export async function ApiUser() {
  const res = await api.get("auth/me");
  return res;
}

export async function ApiSignup(data: any) {
  const res = await api.post("auth/signup", data);

  return res;
}
