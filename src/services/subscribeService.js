import axiosInstance from "@/utils/axiosInstance";

export const subscribeService = {
  subscribes(payload = {}) {
    return axiosInstance.post("/subscribes", payload);
  },
  deals(payload = {}) {
    return axiosInstance.post("/subscribes/deals", payload);
  },
};
