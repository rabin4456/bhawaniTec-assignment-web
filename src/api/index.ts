import axios from "axios";

export const baseUrl = "https://dummyjson.com";

let headers = {
  "Content-Type": "application/json",
};

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: { ...headers },
});

export const getProducts = async () => {
  try {
    const response = await apiClient.get(`/products`);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};
