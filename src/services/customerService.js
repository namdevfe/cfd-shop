import axiosInstance from "@/utils/axiosInstance";

export const customerService = {
  login(payload = {}) {
    return axiosInstance.post("/customer/login", payload);
  },
  register(payload = {}) {
    return axiosInstance.post("/customer/register", payload);
  },
  updateProfile(payload = {}) {
    return axiosInstance.put("/customer/profiles", payload);
  },
  getProfile() {
    return axiosInstance.get("/customer/profiles");
  },
  refreshToken(payload = {}) {
    return axiosInstance.put("/customer/refresh", payload);
  },
  addProductToWhiteList(payload = {}) {
    return axiosInstance.post("/customer/white-list", payload);
  },
  deleteProductInWhiteList(idProduct = "") {
    return axiosInstance.delete("/customer/white-list", idProduct);
  },
  getDataProvince() {
    return axiosInstance.get("/provinces");
  },
  getDataProvinceById(id) {
    return axiosInstance.get(`/provinces/${id}`);
  },
  getDataDistrict(id) {
    return axiosInstance.get(`/districts?province=${id}`);
  },
  getDataDistrictById(id) {
    return axiosInstance.get(`/districts/${id}`);
  },
  getDataWard(id) {
    return axiosInstance.get(`/wards?district=${id}`);
  },
  getDataWardById(id) {
    return axiosInstance.get(`/wards/${id}`);
  },
};
