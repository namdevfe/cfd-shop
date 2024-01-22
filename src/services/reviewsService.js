import axiosInstance from "@/utils/axiosInstance";

export const reviewsService = {
  getReviewsByProductId(id = "", query = "") {
    return axiosInstance.get(`/reviews/product/${id}${query}`);
  },
  review(payload = {}) {
    return axiosInstance.post("/reviews", payload);
  },
};
