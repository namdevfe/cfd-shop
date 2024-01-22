import axiosInstance from "@/utils/axiosInstance";

export const cartService = {
  getProductsCart(query = "") {
    return axiosInstance.get(`/carts/me${query}`);
  },
  updateProductsCart(payload = {}) {
    return axiosInstance.put("/carts", payload);
  },
};
