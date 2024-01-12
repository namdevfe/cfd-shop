import axiosInstance from "@/utils/axiosInstance";

export const pageService = {
  getPages(query = "") {
    return axiosInstance.get(`/pages/${query}`);
  },
  searchByPage(page = "") {
    return axiosInstance.get(`/pages/${page}`);
  },
};
