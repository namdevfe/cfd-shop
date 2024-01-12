import axiosInstance from "@/utils/axiosInstance";

export const wardService = {
  getWards(query = "") {
    return axiosInstance.get(`/wards/${query}`);
  },
  getWardById(id = "") {
    return axiosInstance.get(`/wards/${id}`);
  },
};
