import { api } from "./ApiAuth";

export async function ApiOrders(data: any) {
  const res = await api.post("/orders", data);

  return res;
}
