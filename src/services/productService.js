import axiosInstance from "@/utils/axiosInstance";

export const productService = {
  getProducts(query = "") {
    return axiosInstance.get(`/products/${query}`);
  },
  getProductBySlug(slug = "") {
    return axiosInstance.get(`/products/${slug}`);
  },
  getCategories(query = "") {
    return axiosInstance.get(`/product-categories/${query}`);
  },
  getCategoriesBySlug(slug = "") {
    return axiosInstance.get(`/product-categories/${slug}`);
  },
};
