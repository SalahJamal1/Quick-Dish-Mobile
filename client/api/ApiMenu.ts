import axios from "axios";
import { api } from "./ApiAuth";

export async function ApiMenu() {
  const res = await api.get("/items");
  return res;
}
export async function ApiItem(id: string) {
  const res = await api.get(`/items/${id}`);
  return res;
}
