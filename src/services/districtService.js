import axiosInstance from "@/utils/axiosInstance";

export const districtService = {
  getDistricts(query = "") {
    return axiosInstance.get(`/districts/${query}`);
  },
  getDistrictById(id = "") {
    return axiosInstance.get(`/districts/${id}`);
  },
};
